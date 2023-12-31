package service

import "github.com/michaelhjung/miniurl/internal/repository"

type Service struct {
	Repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Repo: repo,
	}
}
