package external

import (
	"context"

	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
)

type FavoriteExternal interface {
	ListFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
}

type favoriteExternal struct {
	fpbClient fpb.FavoriteServiceClient
}

func NewFavoriteExternal(fc fpb.FavoriteServiceClient) FavoriteExternal {
	return &favoriteExternal{
		fpbClient: fc,
	}
}

func (fe *favoriteExternal) ListFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fe.fpbClient.GetFavoriteArticleFoldersByArticleId(ctx, &fpb.GetFavoriteArticleFoldersByArticleIdRequest{
		ArticleId: dto.GetArticleId(),
		UserId:    dto.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	return res, nil
}
