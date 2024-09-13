package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type FavoriteArticleFolderUseCase interface {
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error)
}

type favoriteArticleFolderUseCase struct {
	favoriteArticleFolderPersistenceAdapter persistenceadapter.FavoriteArticleFolderPersistenceAdapter
}

func NewFavoriteArticleFolderUseCase(fafpa persistenceadapter.FavoriteArticleFolderPersistenceAdapter) FavoriteArticleFolderUseCase {
	return &favoriteArticleFolderUseCase{
		favoriteArticleFolderPersistenceAdapter: fafpa,
	}
}

func (fafu *favoriteArticleFolderUseCase) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	f, err := fafu.favoriteArticleFolderPersistenceAdapter.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}
	return &fpb.CreateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: &fpb.FavoriteArticleFolder{
			Id:          f.ID,
			UserId:      f.UserID,
			Title:       f.Title,
			Description: f.Description.String,
			CreatedAt:   timestamppb.New(f.CreatedAt),
			UpdatedAt:   timestamppb.New(f.UpdatedAt),
		},
	}, nil
}
