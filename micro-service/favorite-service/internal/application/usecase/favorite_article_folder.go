package usecase

import (
	"context"
	"errors"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
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

	isFolderOnly := false

	if req.GetIsFolderOnly() != nil && req.GetIsFolderOnly().GetValue() {
		isFolderOnly = req.GetIsFolderOnly().GetValue()
	}

	for i, f := range fafs {
		faLimit := 1
		if req.GetFavoriteArticleLimit().GetValue() != 0 {
			faLimit = int(req.GetFavoriteArticleLimit().GetValue())
		}

		faf := fu.convertPBFavoriteArticleFolder(ctx, f, &faLimit, &isFolderOnly)
		resFafs[i] = &fpb.FavoriteArticleFolderEdge{
			Cursor: f.ID,
			Node:   faf,
		}
	}

	if req.GetIsAllFetch() != nil && req.GetIsAllFetch().GetValue() {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: resFafs,
			PageInfo: &fpb.PageInfo{
				HasNextPage: false,
				EndCursor:   resFafs[len(resFafs)-1].Cursor,
			},
		}, nil
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
	isFolderOnly := true
	f, err := fu.favoriteArticleFolderPersistenceAdapter.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}
	return &fpb.CreateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &f, nil, &isFolderOnly),
	}, nil
}

func (fu *favoriteUseCase) convertPBFavoriteArticleFolder(ctx context.Context, f *entity.FavoriteArticleFolder, faLimit *int, isFolderOnly *bool) *fpb.FavoriteArticleFolder {
	faf := &fpb.FavoriteArticleFolder{
		Id:               f.ID,
		UserId:           f.UserID,
		Title:            f.Title,
		Description:      f.Description.String,
		CreatedAt:        timestamppb.New(f.CreatedAt),
		UpdatedAt:        timestamppb.New(f.UpdatedAt),
		FavoriteArticles: make([]*fpb.FavoriteArticle, 0),
	}

	if isFolderOnly != nil && *isFolderOnly {
		return faf
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

func (fu *favoriteUseCase) UpdateFavoriteArticleFolder(ctx context.Context, req *fpb.UpdateFavoriteArticleFolderRequest) (*fpb.UpdateFavoriteArticleFolderResponse, error) {
	isFolderOnly := true
	tf, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolderByID(ctx, req.GetId(), req.GetUserId(), nil)
	if err != nil {
		return &fpb.UpdateFavoriteArticleFolderResponse{}, err
	}
	if tf.ID == "" {
		return &fpb.UpdateFavoriteArticleFolderResponse{}, errors.New("favorite article folder not found")
	}

	f, err := fu.favoriteArticleFolderPersistenceAdapter.UpdateFavoriteArticleFolder(ctx, tf, req)
	if err != nil {
		return &fpb.UpdateFavoriteArticleFolderResponse{}, err
	}
	return &fpb.UpdateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &f, nil, &isFolderOnly),
	}, nil
}

func (fu *favoriteUseCase) DeleteFavoriteArticleFolder(ctx context.Context, req *fpb.DeleteFavoriteArticleFolderRequest) (*emptypb.Empty, error) {
	f, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolderByID(ctx, req.GetId(), req.GetUserId(), nil)
	if err != nil {
		return &emptypb.Empty{}, err
	}
	if f.ID == "" {
		return &emptypb.Empty{}, errors.New("favorite article folder not found")
	}

	if f.R != nil && len(f.R.FavoriteArticles) > 0 {
		err := fu.favoriteArticlePersistenceAdapter.MultiDeleteFavoriteArticles(ctx, f.R.FavoriteArticles)
		if err != nil {
			return &emptypb.Empty{}, err
		}
	}

	err = fu.favoriteArticleFolderPersistenceAdapter.DeleteFavoriteArticleFolder(ctx, f)
	if err != nil {
		return &emptypb.Empty{}, err
	}
	return &emptypb.Empty{}, nil
}
