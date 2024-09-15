package persistenceadapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticlePersistenceAdapter interface {
	GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int) (entity.FavoriteArticleSlice, error)
}

type favoriteArticlePersistenceAdapter struct {
	favoriteArticleFolderRepository repository.FavoriteArticleRepository
}

func NewFavoriteArticlePersistenceAdapter(favoriteArticleFolderRepository repository.FavoriteArticleRepository) FavoriteArticlePersistenceAdapter {
	return &favoriteArticlePersistenceAdapter{
		favoriteArticleFolderRepository: favoriteArticleFolderRepository,
	}
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int) (entity.FavoriteArticleSlice, error) {
	paramLimit := 1
	if limit != nil {
		paramLimit = int(*limit)
	}

	q := []qm.QueryMod{
		qm.Where("favorite_article_folder_id = ?", fafID),
		qm.Where("user_id = ?", userID),
		qm.OrderBy("created_at DESC"),
		qm.Limit(paramLimit),
	}

	favoriteArticles, err := fapa.favoriteArticleFolderRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		return nil, err
	}
	return favoriteArticles, nil
}
