package external

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/favorite"
)

type FavoriteExternal interface {
	GetFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
}

type favoriteExternal struct {
	fpbClient fpb.FavoriteServiceClient
}

func NewFavoriteExternal(fc fpb.FavoriteServiceClient) FavoriteExternal {
	return &favoriteExternal{
		fpbClient: fc,
	}
}

func (fe *favoriteExternal) GetFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fe.fpbClient.GetFavoriteArticleFoldersByArticleId(ctx, &fpb.GetFavoriteArticleFoldersByArticleIdRequest{
		ArticleId: dto.GetArticleId(),
		UserId:    dto.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	return res, nil
}
