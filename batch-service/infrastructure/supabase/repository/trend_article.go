package repository

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
)

type TrendArticleRepository struct {
	db *sql.DB
}

func NewATrendArticleRepository(db *sql.DB) *TrendArticleRepository {
	return &TrendArticleRepository{
		db: db,
	}
}

func (tar *TrendArticleRepository) GetTrendArticles(ctx context.Context) ([]entity.TrendArticle, error) {
	taRow, err := entity.TrendArticles().All(ctx, tar.db)
	if err != nil {
		return nil, err
	}

	trendArticles := make([]entity.TrendArticle, len(taRow))
	for i, ta := range taRow {
		trendArticles[i] = *ta
	}

	return trendArticles, nil
}
