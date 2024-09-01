package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/repository"
	_ "github.com/lib/pq"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type articlePersistence struct {
	db *sql.DB
}

func NewArticlePersistence(db *sql.DB) repository.ArticleRepository {
	return &articlePersistence{
		db: db,
	}
}

func (ap *articlePersistence) GetArticles(ctx context.Context, q []qm.QueryMod) (entity.ArticleSlice, error) {
	articles, err := entity.Articles(q...).All(ctx, ap.db)
	if err != nil {
		return nil, err
	}
	return articles, nil
}
