package persistenceadapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
)

type FavoriteArticleFolderPersistenceAdapter interface {
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error)
}

type favoriteArticleFolderPersistenceAdapter struct {
	favoriteArticleFolderRepository repository.FavoriteArticleFolderRepository
}

func NewFavoriteArticleFolderPersistenceAdapter(fr repository.FavoriteArticleFolderRepository) FavoriteArticleFolderPersistenceAdapter {
	return &favoriteArticleFolderPersistenceAdapter{
		favoriteArticleFolderRepository: fr,
	}
}

func (fafa *favoriteArticleFolderPersistenceAdapter) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error) {
	favoriteFolderID, _ := uuid.NewUUID()
	faf := entity.FavoriteArticleFolder{
		ID:     favoriteFolderID.String(),
		UserID: req.GetUserId(),
		Title:  req.GetTitle(),
		Description: null.String{
			Valid:  true,
			String: req.GetDescription(),
		},
	}

	err := fafa.favoriteArticleFolderRepository.CreateFavoriteArticleFolder(ctx, faf)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	f, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolderByID(ctx, favoriteFolderID.String(), nil)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	return f, nil
}
