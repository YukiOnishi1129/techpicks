package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

func (ch *contentHandler) GetArticleOGP(ctx context.Context, req *cpb.GetArticleOGPRequest) (*cpb.GetArticleOGPResponse, error) {
	res, err := ch.contentUseCase.GetArticleOGP(ctx, req.ArticleUrl)
	if err != nil {
		return nil, err
	}
	return res, nil
}
