package api

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitURLRoutes(urls fiber.Router) {
	urls.Get("/", a.getAllURLs)
	urls.Get("/users/:userID", a.getAllUsersURLs)
	urls.Get("/:id", a.getURLByID)
	urls.Post("/", a.createURL)
	urls.Put("/:id", a.updateURL)
	urls.Delete("/:id", a.deleteURL)
}

func (a *API) getAllURLs(c *fiber.Ctx) error {
	urls, err := a.Service.GetAllURLs()
	if err != nil {
		return res.InternalServerError(c, "Failed to retrieve URLs")
	}

	return c.JSON(urls)
}

func (a *API) getAllUsersURLs(c *fiber.Ctx) error {
	userID, err := util.GetIDFromParams(c, "userID")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid user ID param: %s", c.Params("userID")))
	}

	urls, err := a.Service.GetUsersURLs(userID)
	if err != nil {
		return res.InternalServerError(c, "Failed to retrieve URLs by user ID")
	}

	return c.JSON(urls)
}

func (a *API) getURLByID(c *fiber.Ctx) error {
	urlID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid URL ID param: %s", c.Params("id")))
	}

	url, err := a.Service.GetURLByID(urlID)
	if err != nil {
		return res.NotFoundError(c, fmt.Sprintf("URL with id: %d not found", urlID))
	}

	return c.JSON(url)
}

func (a *API) createURL(c *fiber.Ctx) error {
	var urlInput service.CreateURLRequest
	if err := c.BodyParser(&urlInput); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	url, err := a.Service.CreateURL(&urlInput)
	if err != nil {
		if _, ok := err.(validator.ValidationErrors); ok {
			return res.BadRequestError(c, fmt.Sprintf("Validation error: %s", err.Error()))
		}
		return res.InternalServerError(c, "Failed to create URL")
	}

	return c.JSON(url)
}

func (a *API) updateURL(c *fiber.Ctx) error {
	urlID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid URL ID param: %s", c.Params("id")))
	}

	var urlInput service.UpdateURLRequest
	if err := c.BodyParser(&urlInput); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	updatedURL, err := a.Service.UpdateURL(urlID, &urlInput)
	if err != nil {
		return res.NotFoundError(c, err.Error())
	}

	return c.JSON(updatedURL)
}

func (a *API) deleteURL(c *fiber.Ctx) error {
	urlID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid URL ID param: %s", c.Params("id")))
	}

	if err := a.Service.DeleteURL(urlID); err != nil {
		return res.NotFoundError(c, err.Error())
	}

	return c.SendString("Successfully deleted URL")
}
