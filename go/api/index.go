package api

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"github.com/michaelhjung/miniurl/internal/middleware"
	"github.com/michaelhjung/miniurl/internal/repository"
	"github.com/michaelhjung/miniurl/internal/service"
)

type API struct {
	Service *service.Service
}

func NewAPI(svc *service.Service) *API {
	return &API{
		Service: svc,
	}
}

func SetupAPI(db *gorm.DB, app *fiber.App) {
	middleware.SetupBaseMiddleware(app)

	repo := repository.NewRepository(db)
	svc := service.NewService(repo)
	apiInstance := NewAPI(svc)
	apiInstance.InitRoutes(app)
}

func (a *API) InitRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to the Miniurl api!")
	})

	api := app.Group("/api")

	csrf := api.Group("/csrf")
	session := api.Group("/session")
	users := api.Group("/users")

	a.InitCSRFRoutes(csrf)
	a.InitSessionRoutes(session)
	a.InitUserRoutes(users)
}
