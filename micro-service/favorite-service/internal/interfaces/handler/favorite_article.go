package handler

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (fh *favoriteHandler) GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest) (*fpb.GetFavoriteArticlesResponse, error) {
	res, err := fh.favoriteUseCase.GetFavoriteArticles(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
	res, err := fh.favoriteUseCase.CreateFavoriteArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) CreateFavoriteArticleForUploadArticle(ctx context.Context, req *fpb.CreateFavoriteArticleForUploadArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
	res, err := fh.favoriteUseCase.CreateFavoriteArticleForUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) DeleteFavoriteArticle(ctx context.Context, req *fpb.DeleteFavoriteArticleRequest) (*emptypb.Empty, error) {
	res, err := fh.favoriteUseCase.DeleteFavoriteArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fh *favoriteHandler) DeleteFavoriteArticlesByArticleId(ctx context.Context, req *fpb.DeleteFavoriteArticleByArticleIdRequest) (*emptypb.Empty, error) {
	res, err := fh.favoriteUseCase.DeleteFavoriteArticlesByArticleID(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
