package repository

import "github.com/michaelhjung/miniurl/internal/database/models"

func (r *Repository) GetAllUsers() ([]models.User, error) {
	var users []models.User
	if err := r.DB.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (r *Repository) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	if err := r.DB.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) GetUserByEmailOrUsername(emailOrUsername string) (*models.User, error) {
	var user models.User
	if err := r.DB.Where("email = ? OR username = ?", emailOrUsername, emailOrUsername).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) CreateUser(user *models.User) (*models.User, error) {
	if err := r.DB.Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (r *Repository) UpdateUser(user *models.User) (*models.User, error) {
	if err := r.DB.Save(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (r *Repository) DeleteUser(id uint) error {
	return r.DB.Delete(&models.User{}, id).Error
}
