package usecase

import (
	"database/sql"
	rssRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
)

type Usecase struct {
	db *sql.DB
	rr *rssRepository.Repository
}

type Param struct {
	DB *sql.DB
	Rr *rssRepository.Repository
}

func NewUsecase(p *Param) *Usecase {
	return &Usecase{
		db: p.DB,
		rr: p.Rr,
	}
}
