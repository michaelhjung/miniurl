package util

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func StringToUint(s string) (uint, error) {
	i, err := strconv.ParseUint(s, 10, 0) // Use 0 for bit size to adapt to system's architecture
	if err != nil {
		return 0, fmt.Errorf("Failed to convert '%s' to uint: %w", s, err)
	}
	return uint(i), nil
}

func GetIDFromParams(c *fiber.Ctx, paramName string) (uint, error) {
	idStr := c.Params(paramName)
	id, err := StringToUint(idStr)
	if err != nil {
		return 0, fmt.Errorf("Failed to get ID from param '%s': %w", paramName, err)
	}
	return id, nil
}
