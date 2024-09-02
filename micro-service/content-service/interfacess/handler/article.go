package handler

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/application/usecase"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
)

type articleHandler struct {
	articleUseCase usecase.ArticleUseCase
}

func NewArticleHandler(au usecase.ArticleUseCase) cpb.ArticleServiceServer {
	return &articleHandler{
		articleUseCase: au,
	}
}

func (ah *articleHandler) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	res, err := ah.articleUseCase.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
