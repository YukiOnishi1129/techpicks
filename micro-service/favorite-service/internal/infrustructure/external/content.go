package external

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

type ContentExternal interface {
	ListArticleByArticleURL(ctx context.Context, dto *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error)
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

func (ce *contentExternal) ListArticleByArticleURL(ctx context.Context, dto *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error) {
	res, err := ce.cpbClient.ListArticleByArticleURL(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ce *contentExternal) CreateUploadArticle(ctx context.Context, dto *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := ce.cpbClient.CreateUploadArticle(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}
