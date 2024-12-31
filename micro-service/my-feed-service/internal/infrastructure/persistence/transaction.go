package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
)

type transactionPersistence struct {
	db *sql.DB
}

func NewTransactionPersistence(db *sql.DB) repository.TransactionRepository {
	return &transactionPersistence{
		db: db,
	}
}

func (tp *transactionPersistence) RunInTx(ctx context.Context, fn func(context.Context) error) error {
	tx, err := tp.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if err := fn(ctx); err != nil {
		return err
	}

	return tx.Commit()
}
