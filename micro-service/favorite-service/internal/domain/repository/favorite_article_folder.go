package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticleFolderRepository interface {
	GetFavoriteArticleFolderByID(ctx context.Context, id string, q []qm.QueryMod) (entity.FavoriteArticleFolder, error)
	CreateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error
}