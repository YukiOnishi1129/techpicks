package persistenceadapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
)

type FavoriteArticleFolderPersistenceAdapter interface {
	CreateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) (entity.FavoriteArticleFolder, error)
}

type favoriteArticleFolderPersistenceAdapter struct {
	favoriteArticleFolderRepository repository.FavoriteArticleFolderRepository
}

func NewFavoriteArticleFolderPersistenceAdapter(fr repository.FavoriteArticleFolderRepository) FavoriteArticleFolderPersistenceAdapter {
	return &favoriteArticleFolderPersistenceAdapter{
		favoriteArticleFolderRepository: fr,
	}
}

func (fafa *favoriteArticleFolderPersistenceAdapter) CreateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) (entity.FavoriteArticleFolder, error) {
	err := fafa.favoriteArticleFolderRepository.CreateFavoriteArticleFolder(ctx, f)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}
	return f, nil
}
