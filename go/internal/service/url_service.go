package service

import (
	"errors"
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/michaelhjung/miniurl/internal/database/models"
	"github.com/michaelhjung/miniurl/internal/repository"
	"github.com/michaelhjung/miniurl/internal/util"
)

type CreateURLRequest struct {
	UserID      uint   `json:"userId" validate:"required"`
	OriginalURL string `json:"originalUrl" validate:"required"`
}

type UpdateURLRequest struct {
	OriginalURL *string `json:"originalUrl,omitempty"`
	ShortURL    *string `json:"shortUrl,omitempty"`
}

func (s *Service) GetAllURLs() ([]models.Url, error) {
	urls, err := s.Repo.GetAllURLs()
	if err != nil {
		return nil, err
	}

	return urls, nil
}

func (s *Service) GetUsersURLs(userID uint) ([]models.Url, error) {
	urls, err := s.Repo.GetURLsByUserID(userID)
	if err != nil {
		return nil, err
	}

	return urls, nil
}

func (s *Service) GetURLByID(urlID uint) (*models.Url, error) {
	url, err := s.Repo.GetURLByID(urlID)
	if err != nil {
		return nil, err
	}

	return url, nil
}

func (s *Service) CreateURL(urlInput *CreateURLRequest) (*models.Url, error) {
	if err := ValidateStruct(urlInput); err != nil {
		return nil, err
	}

	const maxAttempts = 10 // Maximum attempts to generate a unique token

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		token, err := util.GenerateRandomToken(8)
		if err != nil {
			return nil, fmt.Errorf("Failed to generate random token: %w", err)
		}

		// Check if the generated token is already in use
		existingURL, err := s.Repo.GetURLByShortURLToken(token)
		if err != nil && !errors.Is(err, repository.ErrURLNotFound) {
			return nil, fmt.Errorf("Failed to check existing URL: %w", err)
		}

		// If the token is not in use, use it for the new URL
		if existingURL == nil {
			newURL := &models.Url{
				UserID:      urlInput.UserID,
				OriginalURL: urlInput.OriginalURL,
				ShortURL:    token,
			}

			createdURL, err := s.Repo.CreateURL(newURL)
			if err != nil {
				if _, ok := err.(validator.ValidationErrors); ok {
					return nil, fmt.Errorf("Validation error: %s", err.Error())
				}
				return nil, err
			}

			return createdURL, nil
		}

		// If the token is in use, try generating a new one
	}

	return nil, fmt.Errorf("Failed to generate a unique random token after %d attempts", maxAttempts)
}

func (s *Service) UpdateURL(urlID uint, updateURL *UpdateURLRequest) (*models.Url, error) {
	currentURL, err := s.Repo.GetURLByID(urlID)
	if err != nil {
		return nil, fmt.Errorf("Failed to fetch URL data: %w", err)
	}

	if updateURL.OriginalURL != nil {
		currentURL.OriginalURL = *updateURL.OriginalURL
	}
	if updateURL.ShortURL != nil {
		currentURL.ShortURL = *updateURL.ShortURL
	}

	updatedURL, err := s.Repo.UpdateURL(currentURL)
	if err != nil {
		return nil, fmt.Errorf("Failed to update URL data: %w", err)
	}

	return updatedURL, nil
}

func (s *Service) UpdateURLHitsCount(urlID uint) (*models.Url, error) {
	currentURL, err := s.Repo.GetURLByID(urlID)
	if err != nil {
		return nil, fmt.Errorf("Failed to fetch URL data: %w", err)
	}

	currentURL.Hits++

	updatedURL, err := s.Repo.UpdateURL(currentURL)
	if err != nil {
		return nil, fmt.Errorf("Failed to update URL data: %w", err)
	}

	return updatedURL, nil
}

func (s *Service) DeleteURL(urlID uint) error {
	_, err := s.Repo.GetURLByID(urlID)
	if err != nil {
		return fmt.Errorf("Failed to fetch URL data: %w", err)
	}
	return s.Repo.DeleteURL(urlID)
}
