package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"

	"github.com/michaelhjung/miniurl/internal/global"
)

const (
	JWTCookieName    = "auth_token"
	JWTTokenDuration = 2 * time.Hour
)

func GenerateJWTToken(userID uint) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["userID"] = userID
	claims["exp"] = time.Now().Add(JWTTokenDuration).Unix()
	t, err := token.SignedString([]byte(global.Env.JWTSecretKey))
	if err != nil {
		return "", err
	}
	return t, nil
}

func SetJWTTokenCookie(c *fiber.Ctx, token string) {
	c.Cookie(&fiber.Cookie{
		Name:     JWTCookieName,
		Value:    token,
		Expires:  time.Now().Add(JWTTokenDuration),
		HTTPOnly: true,
		Secure:   false, // set to false if you're testing locally without HTTPS
		SameSite: "Lax", // or "Strict" depending on your needs
	})
}

func ExpireJWTTokenCookie(c *fiber.Ctx) {
	c.Cookie(&fiber.Cookie{
		Name:     JWTCookieName,
		Value:    "",
		Expires:  time.Now().Add(-24 * time.Hour),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "Lax",
	})
}

func GenerateAndSetJWTTokenCookie(c *fiber.Ctx, userID uint) error {
	token, err := GenerateJWTToken(userID)
	if err != nil {
		return err
	}

	SetJWTTokenCookie(c, token)

	return nil
}

func GetUserIDFromJWT(c *fiber.Ctx) (uint, error) {
	tokenString := c.Cookies(JWTCookieName)
	if tokenString == "" {
		return 0, errors.New("No JWT token in cookie")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(global.Env.JWTSecretKey), nil
	})

	if err != nil {
		return 0, fmt.Errorf("Error parsing JWT: %w", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, errors.New("Invalid token")
	}

	userIDFloat, ok := claims["userID"].(float64) // JWT library treats integers as float64 by default
	if !ok {
		return 0, errors.New("userID not found or of wrong type in JWT claims")
	}

	return uint(userIDFloat), nil
}
