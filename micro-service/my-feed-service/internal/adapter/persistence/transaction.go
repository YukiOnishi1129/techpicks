package persistence

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
)

type TransactionPersistenceAdapter interface {
	RunInTx(ctx context.Context, fn func(context.Context) error) error
}

type transactionPersistence struct {
	transactionRepository repository.TransactionRepository
}

func NewTransactionPersistenceAdapter(transactionRepository repository.TransactionRepository) TransactionPersistenceAdapter {
	return &transactionPersistence{
		transactionRepository: transactionRepository,
	}
}

func (tp *transactionPersistence) RunInTx(ctx context.Context, fn func(context.Context) error) error {
	return tp.transactionRepository.RunInTx(ctx, fn)
}
