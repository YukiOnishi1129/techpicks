package externaladapter

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/external"
)

type ContentExternalAdapter interface {
	GetUserSavedArticle(ctx context.Context, dto GetUserSavedArticleInputDTO) (*cpb.GetUserSavedArticleResponse, error)
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

func (cea *contentExternalAdapter) GetUserSavedArticle(ctx context.Context, dto GetUserSavedArticleInputDTO) (*cpb.GetUserSavedArticleResponse, error) {
	req := &cpb.GetUserSavedArticleRequest{
		ArticleId: dto.ArticleID,
		UserId:    dto.UserID,
	}
	res, err := cea.contentExternal.GetUserSavedArticle(ctx, req)
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
