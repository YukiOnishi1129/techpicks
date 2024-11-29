package external

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/content"
)

type ContentExternal interface {
	CreateUploadArticle(ctx context.Context, dto *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error)
}

type contentExternal struct {
	cpbClient cpb.ContentServiceClient
}

func NewContentExternal(cc cpb.ContentServiceClient) ContentExternal {
	return &contentExternal{
		cpbClient: cc,
	}
}

func (ce *contentExternal) CreateUploadArticle(ctx context.Context, dto *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := ce.cpbClient.CreateUploadArticle(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}
