package api

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/internal/service"
	"github.com/michaelhjung/miniurl/internal/util"
	"github.com/michaelhjung/miniurl/internal/util/res"
)

func (a *API) InitUserRoutes(users fiber.Router) {
	users.Get("/", a.getAllUsers)
	users.Get("/:id", a.getUserByID)
	users.Post("/", a.createUser)
	users.Put("/:id/password", a.updateUserPassword)
	users.Put("/:id", a.updateUser)
	users.Delete("/:id", a.deleteUser)
}

func (a *API) getAllUsers(c *fiber.Ctx) error {
	users, err := a.Service.GetAllUsers()
	if err != nil {
		return res.InternalServerError(c, "Failed to retrieve users")
	}

	return c.JSON(users)
}

func (a *API) getUserByID(c *fiber.Ctx) error {
	userID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid user ID param: %s", c.Params("id")))
	}

	user, err := a.Service.GetUserByID(userID)
	if err != nil {
		return res.NotFoundError(c, fmt.Sprintf("User with id: %d not found", userID))
	}

	return c.JSON(user)
}

func (a *API) createUser(c *fiber.Ctx) error {
	var userInput service.CreateUserRequest
	if err := c.BodyParser(&userInput); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	user, err := a.Service.CreateUser(&userInput)
	if err != nil {
		if _, ok := err.(validator.ValidationErrors); ok {
			return res.BadRequestError(c, fmt.Sprintf("Validation error: %s", err.Error()))
		}
		return res.InternalServerError(c, "Failed to create user")
	}

	return c.JSON(user)
}

func (a *API) updateUser(c *fiber.Ctx) error {
	userID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid user ID param: %s", c.Params("id")))
	}

	var userInput service.UpdateUserRequest
	if err := c.BodyParser(&userInput); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	updatedUser, err := a.Service.UpdateUser(userID, &userInput)
	if err != nil {
		return res.NotFoundError(c, err.Error())
	}

	return c.JSON(updatedUser)
}

func (a *API) updateUserPassword(c *fiber.Ctx) error {
	userID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid user ID param: %s", c.Params("id")))
	}

	var updatePasswordReq service.UpdatePasswordRequest
	if err := c.BodyParser(&updatePasswordReq); err != nil {
		return res.BadRequestError(c, "Invalid request format")
	}

	err = a.Service.UpdateUserPassword(userID, &updatePasswordReq)
	if err != nil {
		if _, ok := err.(validator.ValidationErrors); ok {
			return res.BadRequestError(c, fmt.Sprintf("Validation error: %s", err.Error()))
		}
		return res.InternalServerError(c, err.Error())
	}

	return c.SendString("Successfully updated password")
}

func (a *API) deleteUser(c *fiber.Ctx) error {
	userID, err := util.GetIDFromParams(c, "id")
	if err != nil {
		return res.BadRequestError(c, fmt.Sprintf("Invalid user ID param: %s", c.Params("id")))
	}

	if err := a.Service.DeleteUser(userID); err != nil {
		return res.NotFoundError(c, err.Error())
	}

	return c.SendString("Successfully deleted user")
}
