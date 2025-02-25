package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

func (ch *contentHandler) ListArticle(ctx context.Context, req *cpb.ListArticleRequest) (*cpb.ListArticleResponse, error) {
	res, err := ch.contentUseCase.ListArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) ListArticleByArticleURL(ctx context.Context, req *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error) {
	res, err := ch.contentUseCase.ListArticleByArticleURL(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) GetArticle(ctx context.Context, req *cpb.GetArticleRequest) (*cpb.GetArticleResponse, error) {
	// res, err := ch.contentUseCase.GetArticle(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return &cpb.GetArticleResponse{}, nil
}

func (ch *contentHandler) GetUserSavedArticle(ctx context.Context, req *cpb.GetUserSavedArticleRequest) (*cpb.GetUserSavedArticleResponse, error) {
	// res, err := ch.contentUseCase.GetUserSavedArticle(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}

func (ch *contentHandler) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := ch.contentUseCase.CreateUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
