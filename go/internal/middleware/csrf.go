package middleware

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/csrf"

	"github.com/michaelhjung/miniurl/internal/global"
)

const (
	CSRFHeaderName = "X-Csrf-Token"
)

var csrfConfig = csrf.Config{
	KeyLookup:      "header:" + CSRFHeaderName,
	CookieName:     "csrf_",
	CookieSameSite: "Strict",
	CookiePath:     "/",
	CookieSecure:   global.IsProductionEnv(), // Default false. Set to true if you're using HTTPS
	CookieHTTPOnly: global.IsProductionEnv(), // Default false. Set to true to make cookie not accessible via client-side scripts (like JavaScript)
	Expiration:     1 * time.Hour,
	ContextKey:     "csrf_token",
}

func SetupCSRF() func(*fiber.Ctx) error {
	return csrf.New(csrfConfig)
}
