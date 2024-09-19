package externaladapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/external"
)

type FavoriteExternalAdapter interface {
	GetFavoriteArticleFolders(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	GetFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
}

type favoriteExternalAdapter struct {
	favoriteExternal external.FavoriteExternal
}

func NewFavoriteExternalAdapter(fe external.FavoriteExternal) FavoriteExternalAdapter {
	return &favoriteExternalAdapter{
		favoriteExternal: fe,
	}
}

func (fea *favoriteExternalAdapter) GetFavoriteArticleFolders(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fea.favoriteExternal.GetFavoriteArticleFolders(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (fea *favoriteExternalAdapter) GetFavoriteArticleFoldersByArticleID(ctx context.Context, dto *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	res, err := fea.favoriteExternal.GetFavoriteArticleFoldersByArticleID(ctx, dto)
	if err != nil {
		return nil, err
	}
	return res, nil
}
