package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/michaelhjung/miniurl/api"
	"github.com/michaelhjung/miniurl/internal/config"
	"github.com/michaelhjung/miniurl/internal/database"
	"github.com/michaelhjung/miniurl/internal/global"
	"github.com/michaelhjung/miniurl/internal/util"
)

// TODO: Set up SSL and HTTPS for prod domain

func main() {
	cfg, err := config.Load()
	util.FatalOnError("Failed to load configuration", err)
	global.Env = *cfg

	// ---------- DATABASE ---------- //
	db, err := database.InitDB(cfg)
	util.FatalOnError("Failed to initialize database", err)
	sqlDB, err := db.DB()
	util.FatalOnError("Failed to obtain PostgreSQL DB", err)
	defer sqlDB.Close()

	err = database.MigrateDatabase(db)
	util.FatalOnError("Failed to migrate the database", err)

	if cfg.SeedDB == "true" {
		database.SeedDatabase(db)
	} else {
		log.Println("Database not seeded - SEED_DB env is not set to true.")
	}

	// ---------- SERVER ---------- //
	app := fiber.New()

	api.SetupAPI(db, app)

	log.Fatal(app.Listen(":" + cfg.ServerPort))
}
