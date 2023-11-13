package service

import (
	"fmt"
	"time"

	"github.com/michaelhjung/miniurl/internal/database/models"
	"github.com/michaelhjung/miniurl/internal/util"
)

type UserResponse struct {
	ID        uint            `json:"id"`
	Email     string          `json:"email"`
	Username  string          `json:"username"`
	FirstName string          `json:"firstName"`
	LastName  string          `json:"lastName"`
	Role      models.UserRole `json:"role" gorm:"type:user_role;not null;default:member"`
	Verified  bool            `json:"verified"`
	Banned    bool            `json:"banned"`
	LastLogin *time.Time      `json:"lastLogin"`
	CreatedAt time.Time       `json:"createdAt"`
	UpdatedAt time.Time       `json:"updatedAt"`
}

func ToUserResponse(user *models.User) *UserResponse {
	return &UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
		Verified:  user.Verified,
		Banned:    user.Banned,
		LastLogin: user.LastLogin,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}

type CreateUserRequest struct {
	Email     string `json:"email" validate:"required,email"`
	Username  string `json:"username" validate:"required" validate:"required,gte=4,lte=20"`
	Password  string `json:"password" validate:"required,gte=6"` // Ensure password is at least 6 characters
	FirstName string `json:"firstName" validate:"required,gte=2,lte=14"`
	LastName  string `json:"lastName" validate:"required,gte=2,lte=14"`
}

type UpdateUserRequest struct {
	FirstName *string `json:"firstName,omitempty"`
	LastName  *string `json:"lastName,omitempty"`
	Verified  *bool   `json:"verified,omitempty"`
	Banned    *bool   `json:"banned,omitempty"`
}

type UpdatePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" validate:"required"`
	NewPassword     string `json:"newPassword" validate:"required,gte=6"`
}

func (s *Service) GetAllUsers() ([]UserResponse, error) {
	users, err := s.Repo.GetAllUsers()
	if err != nil {
		return nil, err
	}

	var userResponses []UserResponse
	for _, user := range users {
		userResponses = append(userResponses, *ToUserResponse(&user))
	}

	return userResponses, nil
}

func (s *Service) GetUserByID(userID uint) (*UserResponse, error) {
	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return nil, err
	}

	return ToUserResponse(user), nil
}

func (s *Service) CreateUser(userInput *CreateUserRequest) (*UserResponse, error) {
	if err := ValidateStruct(userInput); err != nil {
		return nil, err
	}

	hashedPassword, err := util.HashPassword(userInput.Password)
	if err != nil {
		return nil, err
	}

	newUser := &models.User{
		Email:          userInput.Email,
		Username:       userInput.Username,
		HashedPassword: hashedPassword,
		FirstName:      userInput.FirstName,
		LastName:       userInput.LastName,
	}

	user, err := s.Repo.CreateUser(newUser)
	if err != nil {
		return nil, err
	}

	return ToUserResponse(user), nil
}

func (s *Service) UpdateUser(userID uint, updateUser *UpdateUserRequest) (*UserResponse, error) {
	currentUser, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return nil, fmt.Errorf("Failed to fetch user data: %w", err)
	}

	if updateUser.FirstName != nil {
		currentUser.FirstName = *updateUser.FirstName
	}
	if updateUser.LastName != nil {
		currentUser.LastName = *updateUser.LastName
	}
	if updateUser.Verified != nil {
		currentUser.Verified = *updateUser.Verified
	}
	if updateUser.Banned != nil {
		currentUser.Banned = *updateUser.Banned
	}

	updatedUser, err := s.Repo.UpdateUser(currentUser)
	if err != nil {
		return nil, fmt.Errorf("Failed to update user data: %w", err)
	}

	return ToUserResponse(updatedUser), nil
}

func (s *Service) UpdateUserPassword(userID uint, updatePasswordReq *UpdatePasswordRequest) error {
	if err := ValidateStruct(updatePasswordReq); err != nil {
		return err
	}

	currentUser, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return fmt.Errorf("Failed to fetch user data: %w", err)
	}

	isValidPassword := util.CheckPasswordHash(updatePasswordReq.CurrentPassword, currentUser.HashedPassword)
	if !isValidPassword {
		return fmt.Errorf("Invalid credentials")
	}

	hashedNewPassword, err := util.HashPassword(updatePasswordReq.NewPassword)
	if err != nil {
		return fmt.Errorf("Failed to hash the new password: %w", err)
	}

	currentUser.HashedPassword = hashedNewPassword

	_, err = s.Repo.UpdateUser(currentUser)
	if err != nil {
		return fmt.Errorf("Failed to update password: %w", err)
	}

	return nil
}

func (s *Service) DeleteUser(userID uint) error {
	_, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return fmt.Errorf("Failed to fetch user data: %w", err)
	}
	return s.Repo.DeleteUser(userID)
}
