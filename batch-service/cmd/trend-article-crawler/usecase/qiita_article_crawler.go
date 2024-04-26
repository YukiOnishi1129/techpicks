package usecase

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
)

type qiitaArticleCrawlerArg struct {
	f func(id string) (repository.QiitaItem, error)
}

func qiitaArticleCrawler(ctx context.Context, db *sql.DB, arg qiitaArticleCrawlerArg) error {

	return nil
}
