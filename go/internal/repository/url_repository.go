package repository

import (
	"errors"

	"gorm.io/gorm"

	"github.com/michaelhjung/miniurl/internal/database/models"
)

var ErrURLNotFound = errors.New("URL not found")

func (r *Repository) GetAllURLs() ([]models.Url, error) {
	var urls []models.Url
	if err := r.DB.Find(&urls).Error; err != nil {
		return nil, err
	}
	return urls, nil
}

func (r *Repository) GetURLsByUserID(userID uint) ([]models.Url, error) {
	var urls []models.Url

	if err := r.DB.Preload("UrlAnalytics").Where("user_id = ?", userID).Find(&urls).Error; err != nil {
		return nil, err
	}

	return urls, nil
}

func (r *Repository) GetURLByShortURLToken(token string) (*models.Url, error) {
	var url models.Url
	err := r.DB.Where("short_url = ?", token).First(&url).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, ErrURLNotFound
		}
		return nil, err
	}
	return &url, nil
}

func (r *Repository) GetURLByID(id uint) (*models.Url, error) {
	var url models.Url
	if err := r.DB.First(&url, id).Error; err != nil {
		return nil, err
	}
	return &url, nil
}

func (r *Repository) CreateURL(url *models.Url) (*models.Url, error) {
	if err := r.DB.Create(url).Error; err != nil {
		return nil, err
	}
	return url, nil
}

func (r *Repository) UpdateURL(url *models.Url) (*models.Url, error) {
	if err := r.DB.Save(url).Error; err != nil {
		return nil, err
	}
	return url, nil
}

func (r *Repository) DeleteURL(id uint) error {
	return r.DB.Delete(&models.Url{}, id).Error
}
