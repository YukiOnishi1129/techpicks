package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

func (ch *contentHandler) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	res, err := ch.contentUseCase.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := ch.contentUseCase.CreateUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
