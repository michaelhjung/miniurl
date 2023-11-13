package models

import (
	"time"
)

type Url struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"userId"`
	OriginalURL string    `json:"originalUrl" gorm:"not null" validate:"required"`
	ShortURL    string    `json:"shortUrl" gorm:"unique;not null" validate:"required"`
	Hits        int       `json:"hits" gorm:"not null;default:0"`
	CreatedAt   time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updatedAt" gorm:"autoUpdateTime"`

	User User `gorm:"foreignKey:UserID"`
}
