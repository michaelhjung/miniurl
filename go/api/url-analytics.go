package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitUrlAnalyticsRoutes(urlAnalytics fiber.Router) {
	urlAnalytics.Get("/urls/:urlID", a.getUrlAnalyticsByURLID)
	urlAnalytics.Post("/", a.createUrlAnalytics)
}

func (a *API) getUrlAnalyticsByURLID(c *fiber.Ctx) error {
	urlID, err := util.GetIDFromParams(c, "urlID")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid URL ID param: %s", c.Params("urlID")))
	}

	urlAnalytics, err := a.Service.GetUrlAnalyticsByURLID(urlID)
	if err != nil {
		return res.InternalServerError(c, "Failed to retrieve URL analytics by URL ID")
	}

	return c.JSON(urlAnalytics)
}

func (a *API) createUrlAnalytics(c *fiber.Ctx) error {
	var urlAnalyticsInput service.CreateUrlAnalyticsRequest
	if err := c.BodyParser(&urlAnalyticsInput); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	urlAnalytics, err := a.Service.CreateUrlAnalytics(&urlAnalyticsInput)
	if err != nil {
		return res.InternalServerError(c, "Failed to create URL analytics")
	}

	return c.JSON(urlAnalytics)
}
