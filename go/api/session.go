package api

import (
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitSessionRoutes(session fiber.Router) {
	session.Get("/current", a.getCurrentUser)
	session.Post("/login", a.loginUser)
	session.Post("/logout", a.logoutUser)
}

func (a *API) getCurrentUser(c *fiber.Ctx) error {
	user, err := a.Service.GetCurrentUserFromJWT(c)
	if err != nil {
		return res.UnauthorizedError(c, "No current user")
	}
	return c.Status(fiber.StatusOK).JSON(user)
}

func (a *API) loginUser(c *fiber.Ctx) error {
	var input struct {
		EmailOrUsername string `json:"emailOrUsername"`
		Password        string `json:"password"`
	}
	if err := c.BodyParser(&input); err != nil {
		return res.BadRequestError(c, err.Error())
	}

	user, err := a.Service.LoginUser(c, input.EmailOrUsername, input.Password)
	if err != nil {
		return res.UnauthorizedError(c, err.Error())
	}

	return c.JSON(user)
}

func (a *API) logoutUser(c *fiber.Ctx) error {
	service.ExpireJWTTokenCookie(c)
	return c.Status(fiber.StatusOK).SendString("Successfully logged out")
}
