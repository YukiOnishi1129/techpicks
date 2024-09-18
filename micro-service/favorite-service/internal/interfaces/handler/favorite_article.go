package handler

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
)

func (fh *favoriteHandler) CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
	res, err := fh.favoriteUseCase.CreateFavoriteArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
