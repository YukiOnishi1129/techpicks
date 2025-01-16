package persistence

import (
	"context"
	"database/sql"

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

func (ap *articlePersistence) ListArticle(ctx context.Context, q []qm.QueryMod) (entity.ArticleSlice, error) {
	// boil.DebugMode = true
	articles, err := entity.Articles(q...).All(ctx, ap.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	// boil.DebugMode = false
	return articles, nil
}

func (ap *articlePersistence) GetArticleByID(ctx context.Context, id string, q []qm.QueryMod) (entity.Article, error) {
	article, err := entity.FindArticle(ctx, ap.db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.Article{}, nil
		}
		return entity.Article{}, err
	}
	return *article, nil
}

func (ap *articlePersistence) CreateArticle(ctx context.Context, a entity.Article) error {
	if err := a.Insert(ctx, ap.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}
