package repository

import (
	"github.com/michaelhjung/miniurl/internal/database/models"
)

func (r *Repository) CreateUrlAnalytics(urlAnalytics *models.UrlAnalytics) (*models.UrlAnalytics, error) {
	if err := r.DB.Create(urlAnalytics).Error; err != nil {
		return nil, err
	}
	return urlAnalytics, nil
}

func (r *Repository) GetUrlAnalyticsByURLID(urlID uint) ([]models.UrlAnalytics, error) {
	var urlAnalytics []models.UrlAnalytics
	if err := r.DB.Where("url_id = ?", urlID).Find(&urlAnalytics).Error; err != nil {
		return nil, err
	}
	return urlAnalytics, nil
}
