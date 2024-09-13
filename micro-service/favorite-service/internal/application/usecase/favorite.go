package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
)

type FavoriteUseCase interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error)
}

type favoriteUseCase struct {
	favoriteArticleFolderPersistenceAdapter persistenceadapter.FavoriteArticleFolderPersistenceAdapter
}

func NewFavoriteUseCase(fafpa persistenceadapter.FavoriteArticleFolderPersistenceAdapter) FavoriteUseCase {
	return &favoriteUseCase{
		favoriteArticleFolderPersistenceAdapter: fafpa,
	}
}
