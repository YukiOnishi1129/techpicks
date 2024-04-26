package usecase

import "database/sql"

type Usecase struct {
	db *sql.DB
}

func NewUsecase(db *sql.DB) *Usecase {
	return &Usecase{
		db: db,
	}
}
