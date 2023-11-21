package api

import (
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitRedirects(redirects fiber.Router) {
	redirects.Get("/:token", a.redirect)
}

func (a *API) redirect(c *fiber.Ctx) error {
	token := c.Params("token")

	url, err := a.Service.Repo.GetURLByShortURLToken(token)
	if err != nil {
		res.NotFoundError(c, "URL not found")
	}

	_, err = a.Service.UpdateURLHitsCount(url.ID)
	if err != nil {
		res.InternalServerError(c)
	}

	return c.JSON(url)
}
