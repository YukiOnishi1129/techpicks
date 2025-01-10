package externaladapter

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/infrustructure/external"
)

type ContentExternalAdapter interface {
	ListArticleByArticleURL(ctx context.Context, dto *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error)
	CreateUploadArticle(ctx context.Context, dto *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error)
}

type contentExternalAdapter struct {
	contentExternal external.ContentExternal
}

func NewContentExternalAdapter(ce external.ContentExternal) ContentExternalAdapter {
	return &contentExternalAdapter{
		contentExternal: ce,
	}
}

func (cea *contentExternalAdapter) ListArticleByArticleURL(ctx context.Context, dto *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error) {
	res, err := cea.contentExternal.ListArticleByArticleURL(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (cea *contentExternalAdapter) CreateUploadArticle(ctx context.Context, dto *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	res, err := cea.contentExternal.CreateUploadArticle(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}
