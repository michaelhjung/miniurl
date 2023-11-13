package seeds

import "gorm.io/gorm"

type Seeder interface {
	Seed(db *gorm.DB) (seeded bool, errs []error)
}
