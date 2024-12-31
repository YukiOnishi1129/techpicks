package repository

import "context"

type TransactionRepository interface {
	RunInTx(ctx context.Context, fn func(context.Context) error) error
}
