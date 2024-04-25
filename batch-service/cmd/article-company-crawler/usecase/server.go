package usecase

import (
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
)

type Usecase struct {
	db *sql.DB
	rr *repository.RSSRepository
}

type Param struct {
	Db *sql.DB
	Rr *repository.RSSRepository
}

func NewUsecase(p *Param) *Usecase {
	return &Usecase{
		db: p.Db,
		rr: p.Rr,
	}
}
