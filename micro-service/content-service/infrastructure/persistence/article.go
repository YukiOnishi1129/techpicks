package persistence

import (
	"context"
	"database/sql"
	"fmt"

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
	// boil.DebugMode = true
	articles, err := entity.Articles(q...).All(ctx, ap.db)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	// boil.DebugMode = false
	return articles, nil
}
