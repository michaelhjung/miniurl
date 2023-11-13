package config

import (
	"errors"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/michaelhjung/miniurl/internal/util"
)

type Config struct {
	DBHost       string
	DBPort       string
	DBName       string
	DBUser       string
	DBPassword   string
	DBSSLMode    string
	DBTimeZone   string
	ServerPort   string
	Environment  string
	JWTSecretKey string
	SeedDB       string
	DemoUserPW   string
}

// Load will populate the Config struct from environment variables
func Load() (*Config, error) {
	err := godotenv.Load("../../.env")
	util.FatalOnError("Error loading .env file", err)

	var errs []error

	config := &Config{
		DBHost:       getEnv("DB_HOST", "localhost"),
		DBPort:       getEnv("DB_PORT", "5432"),
		DBName:       getEnv("DB_NAME", "miniurl_db"),
		DBUser:       getEnv("DB_USER", "user"),
		DBPassword:   getEnv("DB_PASSWORD", ""),
		DBSSLMode:    getEnv("DB_SSLMODE", "disable"),
		DBTimeZone:   getEnv("DB_TIMEZONE", "UTC"),
		ServerPort:   getEnv("SERVER_PORT", "8080"),
		Environment:  getEnv("ENV", "development"),
		JWTSecretKey: getEnv("JWT_SECRET_KEY", ""),
		SeedDB:       getEnv("SEED_DB", "false"),
	}

	if config.JWTSecretKey == "" {
		errs = append(errs, errors.New("JWT_SECRET_KEY environment variable not set"))
	}

	if len(errs) > 0 {
		return nil, fmt.Errorf("Config errors: %v", errs)
	}

	return config, nil
}

// Helper function to read an environment or return a default value
func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return defaultVal
}
