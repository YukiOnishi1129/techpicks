package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
)

type FavoriteArticleFolderRepository interface {
	CreateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error
}
