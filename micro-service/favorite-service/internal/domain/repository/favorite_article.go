package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticleRepository interface {
	GetFavoriteArticles(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticleSlice, error)
	CreateFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) (entity.FavoriteArticle, error)
	MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error
}
