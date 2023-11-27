package util

import (
	"fmt"
	"strconv"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"

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

// ----- STRINGS ----- //

func TitleCase(s string) string {
	titleCaseConverter := cases.Title(language.English)

	words := strings.Fields(s)

	for i, word := range words {
		words[i] = titleCaseConverter.String(word)
	}

	result := strings.Join(words, " ")

	return result
}

func ToLowerCase(s string) string {
	return strings.ToLower(s)
}
