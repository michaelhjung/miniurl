package seeds

import (
	"fmt"

	"gorm.io/gorm"

	"github.com/michaelhjung/miniurl/internal/database/models"
	"github.com/michaelhjung/miniurl/internal/util"
)

var Users = []models.User{
	{
		Email:          "demouser@miniurl.io",
		Username:       "demouser",
		HashedPassword: "hiremichaeljung", // will actually be hashed in the seed function
		FirstName:      "Demo",
		LastName:       "User",
	},
}

type UserSeeder struct{}

func (u *UserSeeder) Seed(db *gorm.DB) (bool, []error) {
	var seeded bool
	var errs []error

	for _, user := range Users {
		var count int64
		db.Model(&user).Where("email = ? OR username = ?", user.Email, user.Username).Count(&count)
		if count > 0 {
			continue
		}

		hashedPassword, err := util.HashPassword(user.HashedPassword)
		if err != nil {
			errs = append(errs, fmt.Errorf("Failed to hash password for seed user: %w", err))
			continue
		}
		user.HashedPassword = hashedPassword

		if err := db.Create(&user).Error; err != nil {
			errs = append(errs, fmt.Errorf("Failed to seed user: %w", err))
			continue
		}
		seeded = true
	}
	return seeded, errs
}
