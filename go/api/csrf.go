package api

import (
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitCSRFRoutes(csrf fiber.Router) {
	csrf.Get("/token", func(c *fiber.Ctx) error {
		csrfToken := service.GetCSRFToken(c)
		if csrfToken == "" {
			return res.NotFoundError(c, "CSRF token not found")
		}
		return c.JSON(fiber.Map{"csrfToken": csrfToken})
	})
}
