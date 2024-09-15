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
		faLimit := 1
		if req.GetFavoriteArticleLimit().GetValue() != 0 {
			faLimit = int(req.GetFavoriteArticleLimit().GetValue())
		}
		faf := fu.convertPBFavoriteArticleFolder(ctx, f, &faLimit)
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
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &f, nil),
	}, nil
}

func (fu *favoriteUseCase) convertPBFavoriteArticleFolder(ctx context.Context, f *entity.FavoriteArticleFolder, faLimit *int) *fpb.FavoriteArticleFolder {
	faf := &fpb.FavoriteArticleFolder{
		Id:               f.ID,
		UserId:           f.UserID,
		Title:            f.Title,
		Description:      f.Description.String,
		CreatedAt:        timestamppb.New(f.CreatedAt),
		UpdatedAt:        timestamppb.New(f.UpdatedAt),
		FavoriteArticles: make([]*fpb.FavoriteArticle, 0),
	}

	fas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticlesByFavoriteArticleFolderID(ctx, f.ID, f.UserID, faLimit)
	if err != nil {
		return nil
	}

	resFas := make([]*fpb.FavoriteArticle, len(fas))
	if len(fas) != 0 {
		for i, fa := range fas {
			resFa := fu.convertPBFavoriteArticle(fa)
			resFas[i] = resFa
		}
	}
	faf.FavoriteArticles = resFas

	return faf
}
