package global

import "github.com/michaelhjung/miniurl/internal/config"

var Env config.Config

func IsProductionEnv() bool {
	return Env.Environment == "production"
}
