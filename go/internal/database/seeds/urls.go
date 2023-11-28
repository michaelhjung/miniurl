package seeds

import (
	"fmt"

	"gorm.io/gorm"

	"github.com/michaelhjung/miniurl/internal/database/models"
	"github.com/michaelhjung/miniurl/internal/util"
)

var DemouserUrls = []models.Url{
	{
		UserID:      1, // Assuming the demouser has ID 1
		OriginalURL: "https://www.linkedin.com/in/michael-h-jung/",
	},
	{
		UserID:      1,
		OriginalURL: "https://www.michaelhjung.com/",
	},
}

type UrlSeeder struct{}

func (u *UrlSeeder) Seed(db *gorm.DB) (bool, []error) {
	var seeded bool
	var errs []error

	for _, url := range DemouserUrls {
		var count int64
		db.Model(&url).Where("original_url = ?", url.OriginalURL).Count(&count)
		if count > 0 {
			continue
		}

		token, err := util.GenerateRandomToken(8)
		if err != nil {
			errs = append(errs, fmt.Errorf("Failed to generate random token: %w", err))
			continue
		}
		url.ShortURL = token

		if err := db.Create(&url).Error; err != nil {
			errs = append(errs, fmt.Errorf("Failed to seed URL: %w", err))
			continue
		}
		seeded = true
	}

	return seeded, errs
}
