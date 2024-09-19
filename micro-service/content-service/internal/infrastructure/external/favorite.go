package external

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/favorite"
)

type FavoriteExternal interface {
	GetFavoriteArticleFolders(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	GetFavoriteArticleFoldersByArticleId(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
}

type favoriteExternal struct {
	fpbClient fpb.FavoriteServiceClient
}

func NewFavoriteExternal(fc fpb.FavoriteServiceClient) FavoriteExternal {
	return &favoriteExternal{
		fpbClient: fc,
	}
}

func (fe *favoriteExternal) GetFavoriteArticleFolders(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fe.fpbClient.GetFavoriteArticleFolders(ctx, &fpb.GetFavoriteArticleFoldersRequest{
		Cursor:               dto.GetCursor(),
		Limit:                dto.GetLimit(),
		UserId:               dto.GetUserId(),
		Keyword:              dto.GetKeyword(),
		IsFolderOnly:         dto.GetIsFolderOnly(),
		IsAllFetch:           dto.GetIsAllFetch(),
		FavoriteArticleLimit: dto.GetFavoriteArticleLimit(),
	})
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fe *favoriteExternal) GetFavoriteArticleFoldersByArticleId(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fe.fpbClient.GetFavoriteArticleFoldersByArticleId(ctx, &fpb.GetFavoriteArticleFoldersByArticleIdRequest{
		ArticleId: dto.GetArticleId(),
		UserId:    dto.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	return res, nil
}
