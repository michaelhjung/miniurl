package middleware

import (
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/michaelhjung/miniurl/internal/global"
)

const (
	AllowedOriginsDev  = "http://localhost:3000, https://localhost:3000"
	AllowedOriginsProd = "https://miniurl.page, https://www.miniurl.page"
	AllowedHeaders     = "Origin, Content-Type, Accept, Authorization, X-Requested-With, X-Csrf-Token"
	CORSMaxAge         = int(12 * time.Hour / time.Second) // needs to be in seconds
)

var corsConfig = createCorsConfig()

func createCorsConfig() cors.Config {
	return cors.Config{
		AllowOrigins: getAllowedOrigins(),
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodPut,
			fiber.MethodDelete,
		}, ","),
		AllowHeaders:     AllowedHeaders,
		ExposeHeaders:    "",
		AllowCredentials: true, // set to true if using cookies for authentication
		MaxAge:           CORSMaxAge,
	}
}

func getAllowedOrigins() string {
	if global.IsProductionEnv() {
		return AllowedOriginsProd
	}
	return AllowedOriginsDev
}

func SetupCORS() func(*fiber.Ctx) error {
	return cors.New(corsConfig)
}
