package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/util"
)

type LoginRequest struct {
	EmailOrUsername string `json:"emailOrUsername"`
	Password        string `json:"password"`
}

func (s *Service) GetCurrentUserFromJWT(c *fiber.Ctx) (*UserResponse, error) {
	userID, err := GetUserIDFromJWT(c)
	if err != nil {
		return nil, err
	}

	user, err := s.GetUserByID(userID) // user hashed_password already filtered out here
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Service) LoginUser(c *fiber.Ctx, emailOrUsername, password string) (*UserResponse, error) {
	user, err := s.Repo.GetUserByEmailOrUsername(emailOrUsername)
	if err != nil {
		return nil, err
	}

	if !util.CheckPasswordHash(password, user.HashedPassword) {
		return nil, errors.New("Invalid credentials")
	}

	now := time.Now()
	user.LastLogin = &now

	if _, err := s.Repo.UpdateUser(user); err != nil {
		return nil, fmt.Errorf("Failed to update last login: %w", err)
	}

	if err := GenerateAndSetJWTTokenCookie(c, user.ID); err != nil {
		return nil, err
	}

	return ToUserResponse(user), nil
}
