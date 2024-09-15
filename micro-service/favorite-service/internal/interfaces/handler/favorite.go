package handler

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/application/usecase"
)

type favoriteHandler struct {
	favoriteUseCase usecase.FavoriteUseCase
}

func NewFavoriteHandler(fafu usecase.FavoriteUseCase) fpb.FavoriteServiceServer {
	return &favoriteHandler{
		favoriteUseCase: fafu,
	}
}

func (fh *favoriteHandler) GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fh.favoriteUseCase.GetFavoriteArticleFolders(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) GetFavoriteArticleFolderByArticleId(ctx context.Context, req *fpb.GetFavoriteArticleFolderByArticleIdRequest) (*fpb.GetFavoriteArticleFolderResponse, error) {
	return &fpb.GetFavoriteArticleFolderResponse{}, nil
}

func (fh *favoriteHandler) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	res, err := fh.favoriteUseCase.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
