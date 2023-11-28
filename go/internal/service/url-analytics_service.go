package service

import (
	"fmt"

	"github.com/michaelhjung/miniurl/internal/database/models"
)

type CreateUrlAnalyticsRequest struct {
	UrlID     uint   `json:"urlId" validate:"required"`
	IpAddress string `json:"ipAddress" validate:"required"`
	UserAgent string `json:"userAgent" validate:"required"`
	Referer   string `json:"referer"`
}

func (s *Service) CreateUrlAnalytics(urlAnalyticsInput *CreateUrlAnalyticsRequest) (*models.UrlAnalytics, error) {
	if err := ValidateStruct(urlAnalyticsInput); err != nil {
		return nil, err
	}

	urlAnalytics := &models.UrlAnalytics{
		UrlID:     urlAnalyticsInput.UrlID,
		IpAddress: urlAnalyticsInput.IpAddress,
		UserAgent: urlAnalyticsInput.UserAgent,
		Referer:   urlAnalyticsInput.Referer,
	}

	createdUrlAnalytics, err := s.Repo.CreateUrlAnalytics(urlAnalytics)
	if err != nil {
		return nil, fmt.Errorf("Failed to create URL analytics: %w", err)
	}

	return createdUrlAnalytics, nil
}

func (s *Service) GetUrlAnalyticsByURLID(urlID uint) ([]models.UrlAnalytics, error) {
	urlAnalytics, err := s.Repo.GetUrlAnalyticsByURLID(urlID)
	if err != nil {
		return nil, fmt.Errorf("Failed to retrieve URL analytics by URL ID: %w", err)
	}

	return urlAnalytics, nil
}
