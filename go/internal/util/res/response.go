package res

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

type ErrorResponse struct {
	Status int    `json:"status"`
	Error  string `json:"error"`
}

var errorStatusMessagesMap = map[int]string{
	fiber.StatusBadRequest:          "Bad request",           // 400
	fiber.StatusUnauthorized:        "Unauthorized",          // 401
	fiber.StatusForbidden:           "Forbidden",             // 403
	fiber.StatusNotFound:            "Not found",             // 404
	fiber.StatusInternalServerError: "Internal server error", // 500
}

func createErrorResponse(c *fiber.Ctx, statusCode int, customErrorMsg ...string) error {
	errorMsg, exists := errorStatusMessagesMap[statusCode]
	if !exists {
		errorMsg = "Unknown error"
	}
	if len(customErrorMsg) > 0 && strings.TrimSpace(customErrorMsg[0]) != "" {
		errorMsg = customErrorMsg[0]
	}
	return c.Status(statusCode).JSON(ErrorResponse{Status: statusCode, Error: errorMsg})
}

func BadRequestError(c *fiber.Ctx, customErrorMsg ...string) error {
	return createErrorResponse(c, fiber.StatusBadRequest, customErrorMsg...)
}

func UnauthorizedError(c *fiber.Ctx, customErrorMsg ...string) error {
	return createErrorResponse(c, fiber.StatusUnauthorized, customErrorMsg...)
}

func ForbiddenError(c *fiber.Ctx, customErrorMsg ...string) error {
	return createErrorResponse(c, fiber.StatusForbidden, customErrorMsg...)
}

func NotFoundError(c *fiber.Ctx, customErrorMsg ...string) error {
	return createErrorResponse(c, fiber.StatusNotFound, customErrorMsg...)
}

func InternalServerError(c *fiber.Ctx, customErrorMsg ...string) error {
	return createErrorResponse(c, fiber.StatusInternalServerError, customErrorMsg...)
}
