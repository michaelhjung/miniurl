package models

import (
	"time"
)

type UserRole string

const (
	RoleAdmin  UserRole = "admin"
	RoleMod    UserRole = "mod"
	RoleMember UserRole = "member"
)

type User struct {
	ID             uint       `json:"id" gorm:"primaryKey"`
	Email          string     `json:"email" gorm:"unique;not null" validate:"required,email"`
	Username       string     `json:"username" gorm:"unique;not null" validate:"required,gte=4,lte=20"`
	HashedPassword string     `json:"-" gorm:"not null"`
	FirstName      string     `json:"firstName" gorm:"not null" validate:"required,gte=2,lte=14"`
	LastName       string     `json:"lastName" gorm:"not null" validate:"required,gte=2,lte=14"`
	Role           UserRole   `json:"role" gorm:"type:user_role;not null;default:member"`
	Verified       bool       `json:"verified" gorm:"not null;default:false"`
	Banned         bool       `json:"banned" gorm:"not null;default:false"`
	LastLogin      *time.Time `json:"lastLogin"`
	CreatedAt      time.Time  `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt      time.Time  `json:"updatedAt" gorm:"autoUpdateTime"`

	Urls []Url `gorm:"foreignKey:UserID"`
}
