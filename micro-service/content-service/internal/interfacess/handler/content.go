package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/application/usecase"
)

type contentHandler struct {
	articleUseCase usecase.ArticleUseCase
}

func NewContentHandler(au usecase.ArticleUseCase) cpb.ContentServiceServer {
	return &contentHandler{
		articleUseCase: au,
	}
}

func (ch *contentHandler) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	res, err := ch.articleUseCase.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := ch.articleUseCase.CreateUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) GetArticleOGP(ctx context.Context, req *cpb.GetArticleOGPRequest) (*cpb.GetArticleOGPResponse, error) {
	res, err := ch.articleUseCase.GetArticleOGP(ctx, req.ArticleUrl)
	if err != nil {
		return nil, err
	}
	return res, nil
}
