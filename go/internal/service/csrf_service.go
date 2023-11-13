package service

import (
	"github.com/gofiber/fiber/v2"
)

func GetCSRFToken(c *fiber.Ctx) string {
	if token, ok := c.Locals("csrf_token").(string); ok {
		return token
	}
	return ""
}
