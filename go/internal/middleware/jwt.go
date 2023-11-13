package middleware

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"

	"github.com/michaelhjung/miniurl/internal/global"
	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func RequireJWT() func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		cookie := c.Cookies(service.JWTCookieName)
		if cookie == "" {
			return res.UnauthorizedError(c, "Missing token")
		}

		token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			return global.Env.JWTSecretKey, nil
		})

		if err != nil {
			return handleJWTError(c, err)
		}

		if !token.Valid {
			return res.UnauthorizedError(c, "Invalid token")
		}

		c.Locals("user", token.Claims) // If you want to pass the user claims info to the next handler

		return c.Next()
	}
}

func handleJWTError(c *fiber.Ctx, err error) error {
	if errors.Is(err, jwt.ErrTokenMalformed) {
		return c.Status(fiber.StatusUnauthorized).SendString("Malformed token")
	} else if errors.Is(err, jwt.ErrTokenSignatureInvalid) {
		return c.Status(fiber.StatusUnauthorized).SendString("Token signature is invalid")
	} else if errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet) {
		return c.Status(fiber.StatusUnauthorized).SendString("Token is expired")
	} else {
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid token: " + err.Error())
	}
}
