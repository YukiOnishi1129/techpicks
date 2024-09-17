package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
)

type FavoriteUseCase interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error)
	UpdateFavoriteArticleFolder(ctx context.Context, req *fpb.UpdateFavoriteArticleFolderRequest) (*fpb.UpdateFavoriteArticleFolderResponse, error)
}

type favoriteUseCase struct {
	favoriteArticleFolderPersistenceAdapter persistenceadapter.FavoriteArticleFolderPersistenceAdapter
	favoriteArticlePersistenceAdapter       persistenceadapter.FavoriteArticlePersistenceAdapter
}

func NewFavoriteUseCase(fafpa persistenceadapter.FavoriteArticleFolderPersistenceAdapter, fapa persistenceadapter.FavoriteArticlePersistenceAdapter) FavoriteUseCase {
	return &favoriteUseCase{
		favoriteArticleFolderPersistenceAdapter: fafpa,
		favoriteArticlePersistenceAdapter:       fapa,
	}
}
