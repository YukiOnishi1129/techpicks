package external

import (
	"context"

	bpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/bookmark"
)

type BookmarkExternal interface {
	GetBookmarkByArticleID(ctx context.Context, dto *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
}

type bookmarkExternal struct {
	bpbClient bpb.BookmarkServiceClient
}

func NewBookmarkExternal(bc bpb.BookmarkServiceClient) BookmarkExternal {
	return &bookmarkExternal{
		bpbClient: bc,
	}
}

func (be *bookmarkExternal) GetBookmarkByArticleID(ctx context.Context, dto *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	res, err := be.bpbClient.GetBookmarkByArticleID(ctx, &bpb.GetBookmarkByArticleIDRequest{
		ArticleId: dto.GetArticleId(),
		UserId:    dto.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	return res, nil
}
