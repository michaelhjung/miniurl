package database

import (
	"fmt"
	"path/filepath"
	"runtime"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"gorm.io/gorm"
)

/*
Only new migrations will be applied. Golang-migrate uses a special table named
`schema_migrations` in the database to keep track of which migrations have been
applied already.
*/
func MigrateDatabase(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return fmt.Errorf("Failed to get the underlying SQL DB from GORM: %w", err)
	}

	driver, err := postgres.WithInstance(sqlDB, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("Failed to create migrate driver instance: %w", err)
	}

	_, currentFilePath, _, _ := runtime.Caller(0)
	absolutePath := filepath.Join(filepath.Dir(currentFilePath), "migrations")

	m, err := migrate.NewWithDatabaseInstance(
		"file://"+absolutePath,
		"postgres", driver)
	if err != nil {
		return fmt.Errorf("Migration initialization error: %w", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("Migration error: %w", err)
	}

	return nil
}
