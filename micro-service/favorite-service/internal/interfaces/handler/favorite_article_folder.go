package handler

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (fh *favoriteHandler) GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fh.favoriteUseCase.GetFavoriteArticleFolders(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) GetFavoriteArticleFoldersByArticleId(ctx context.Context, req *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fh.favoriteUseCase.GetFavoriteArticleFoldersByArticleId(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) GetFavoriteArticleFolder(ctx context.Context, req *fpb.GetFavoriteArticleFolderRequest) (*fpb.GetFavoriteArticleFolderResponse, error) {
	return nil, nil
}

func (fh *favoriteHandler) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	res, err := fh.favoriteUseCase.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) UpdateFavoriteArticleFolder(ctx context.Context, req *fpb.UpdateFavoriteArticleFolderRequest) (*fpb.UpdateFavoriteArticleFolderResponse, error) {
	res, err := fh.favoriteUseCase.UpdateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) DeleteFavoriteArticleFolder(ctx context.Context, req *fpb.DeleteFavoriteArticleFolderRequest) (*emptypb.Empty, error) {
	res, err := fh.favoriteUseCase.DeleteFavoriteArticleFolder(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
