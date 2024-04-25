package usecase

import (
	"database/sql"
	apiRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
	rssRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
)

type Usecase struct {
	db  *sql.DB
	air *apiRepository.Repository
	rr  *rssRepository.Repository
}

type Param struct {
	DB  *sql.DB
	Air *apiRepository.Repository
	Rr  *rssRepository.Repository
}

func NewUsecase(p *Param) *Usecase {
	return &Usecase{
		db:  p.DB,
		air: p.Air,
		rr:  p.Rr,
	}
}
