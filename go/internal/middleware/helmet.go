package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/helmet"
)

func SetupHelmet() func(*fiber.Ctx) error {
	return helmet.New()
}
