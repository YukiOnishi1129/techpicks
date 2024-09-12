package persistence

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	_ "github.com/lib/pq"
	"github.com/volatiletech/sqlboiler/v4/boil"
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
		if err == sql.ErrNoRows {
			return nil, nil
		}
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	// boil.DebugMode = false
	return articles, nil
}

func (ap *articlePersistence) CreateArticle(ctx context.Context, a entity.Article) error {
	if err := a.Insert(ctx, ap.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}
