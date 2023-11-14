package repository

import "github.com/michaelhjung/miniurl/internal/database/models"

func (r *Repository) GetAllURLs() ([]models.Url, error) {
	var urls []models.Url
	if err := r.DB.Find(&urls).Error; err != nil {
		return nil, err
	}
	return urls, nil
}

func (r *Repository) GetURLByID(id uint) (*models.Url, error) {
	var url models.Url
	if err := r.DB.First(&url, id).Error; err != nil {
		return nil, err
	}
	return &url, nil
}

func (r *Repository) GetURLsByUserID(userID uint) ([]models.Url, error) {
	var urls []models.Url

	if err := r.DB.Where("user_id = ?", userID).Find(&urls).Error; err != nil {
		return nil, err
	}

	return urls, nil
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