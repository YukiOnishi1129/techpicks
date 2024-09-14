package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (fu *favoriteUseCase) GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	fafs, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolders(ctx, req)
	if err != nil {
		return &fpb.GetFavoriteArticleFoldersResponse{}, err
	}

	resFafs := make([]*fpb.FavoriteArticleFolderEdge, len(fafs))
	if len(fafs) == 0 {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: resFafs,
			PageInfo: &fpb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	for i, f := range fafs {
		faf := fu.convertPBFavoriteArticleFolder(f)
		resFafs[i] = &fpb.FavoriteArticleFolderEdge{
			Cursor: f.ID,
			Node:   faf,
		}
	}

	return &fpb.GetFavoriteArticleFoldersResponse{
		FavoriteArticleFoldersEdge: resFafs,
		PageInfo: &fpb.PageInfo{
			HasNextPage: len(resFafs) == int(req.GetLimit().GetValue()),
			EndCursor:   resFafs[len(resFafs)-1].Cursor,
		},
	}, nil
}

func (fu *favoriteUseCase) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	f, err := fu.favoriteArticleFolderPersistenceAdapter.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}
	return &fpb.CreateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(&f),
	}, nil
}

func (fu *favoriteUseCase) convertPBFavoriteArticleFolder(f *entity.FavoriteArticleFolder) *fpb.FavoriteArticleFolder {
	faf := &fpb.FavoriteArticleFolder{
		Id:               f.ID,
		UserId:           f.UserID,
		Title:            f.Title,
		Description:      f.Description.String,
		CreatedAt:        timestamppb.New(f.CreatedAt),
		UpdatedAt:        timestamppb.New(f.UpdatedAt),
		FavoriteArticles: make([]*fpb.FavoriteArticle, 0),
	}

	if f.R != nil && f.R.FavoriteArticles != nil {
		resFas := make([]*fpb.FavoriteArticle, len(f.R.FavoriteArticles))
		if len(f.R.FavoriteArticles) != 0 {
			for i, fa := range f.R.FavoriteArticles {
				resFa := fu.convertPBFavoriteArticle(fa)
				resFas[i] = resFa
			}
		}
		faf.FavoriteArticles = resFas
	}

	return faf
}
