package externaladapter

import (
	"context"

	bpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/external"
)

type BookmarkExternalAdapter interface {
	GetBookmarkByArticleID(ctx context.Context, dto *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
}

type bookmarkExternalAdapter struct {
	bookmarkExternal external.BookmarkExternal
}

func NewBookmarkExternalAdapter(be external.BookmarkExternal) BookmarkExternalAdapter {
	return &bookmarkExternalAdapter{
		bookmarkExternal: be,
	}
}

func (bea *bookmarkExternalAdapter) GetBookmarkByArticleID(ctx context.Context, dto *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	res, err := bea.bookmarkExternal.GetBookmarkByArticleID(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}
