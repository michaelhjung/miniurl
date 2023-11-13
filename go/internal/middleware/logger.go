package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupLogger() func(*fiber.Ctx) error {
	return logger.New()
}
