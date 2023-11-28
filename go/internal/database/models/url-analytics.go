package models

import (
	"time"
)

type UrlAnalytics struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UrlID     uint      `json:"urlId" gorm:"not null" validate:"required"`
	IpAddress string    `json:"ipAddress" gorm:"not null"`
	UserAgent string    `json:"userAgent" gorm:"not null"`
	Referer   string    `json:"referer"`
	CreatedAt time.Time `json:"createdAt" gorm:"autoCreateTime"`

	Url Url `gorm:"foreignKey:UrlID"`
}
