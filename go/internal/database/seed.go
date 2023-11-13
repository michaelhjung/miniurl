package database

import (
	"fmt"
	"log"

	"gorm.io/gorm"

	"github.com/michaelhjung/miniurl/internal/database/seeds"
)

var seeders = []seeds.Seeder{
	&seeds.UserSeeder{},
}

func SeedDatabase(db *gorm.DB) error {
	var seeded bool
	var allErrs []error

	for _, seeder := range seeders {
		s, errs := seeder.Seed(db)
		if s {
			seeded = true
		}
		if len(errs) > 0 {
			allErrs = append(allErrs, errs...)
		}
	}

	if len(allErrs) > 0 {
		return fmt.Errorf("Errors occurred during seeding: %v", allErrs)
	} else if seeded {
		log.Println("Database seeded!")
	} else {
		log.Println("Database not seeded - no new seed data to be added.")
	}

	return nil
}
