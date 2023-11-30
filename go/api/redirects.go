package api

import (
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
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

	// Capture URL analytics data

	urlAnalyticsInput := service.CreateUrlAnalyticsRequest{
		UrlID:     url.ID,
		IpAddress: c.IP(),
		UserAgent: c.Get("User-Agent"),
		Referer:   c.Get("Referer"),
	}

	_, err = a.Service.CreateUrlAnalytics(&urlAnalyticsInput)
	if err != nil {
		res.InternalServerError(c, "Error creating url analytics")
	}

	return c.JSON(url)
}
