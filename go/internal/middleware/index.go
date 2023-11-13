package middleware

import (
	"github.com/gofiber/fiber/v2"
)

func SetupBaseMiddleware(app *fiber.App) {
	app.Use(SetupLogger())
	app.Use(SetupRecover())
	app.Use(SetupHelmet())
	app.Use(SetupCORS())
	app.Use(SetupCSRF())
}
