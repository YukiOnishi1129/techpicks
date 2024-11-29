package repository

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticleRepository interface {
	GetFavoriteArticles(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticleSlice, error)
	GetFavoriteArticle(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticle, error)
	GetFavoriteArticleByID(ctx context.Context, id string, q []qm.QueryMod) (entity.FavoriteArticle, error)
	CreateFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) (entity.FavoriteArticle, error)
	DeleteFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) error
	MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error
	QueryRows(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error) 
}
