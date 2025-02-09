package usecase

import (
	"context"
	"errors"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
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
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	isFolderOnly := false

	if req.GetIsFolderOnly() != nil && req.GetIsFolderOnly().GetValue() {
		isFolderOnly = req.GetIsFolderOnly().GetValue()
	}

	isFaAllFetch := false
	if req.GetIsFavoriteArticleAllFetch() != nil && req.GetIsFavoriteArticleAllFetch().GetValue() {
		isFaAllFetch = req.GetIsFavoriteArticleAllFetch().GetValue()
	}

	for i, f := range fafs {
		faLimit := 1
		if req.GetFavoriteArticleLimit().GetValue() != 0 {
			faLimit = int(req.GetFavoriteArticleLimit().GetValue())
		}

		faf := fu.convertPBFavoriteArticleFolder(ctx, f, &faLimit, &isFolderOnly, &isFaAllFetch)
		resFafs[i] = &fpb.FavoriteArticleFolderEdge{
			Cursor: f.ID,
			Node:   faf,
		}
	}

	if req.GetIsAllFetch() != nil && req.GetIsAllFetch().GetValue() {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: resFafs,
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   resFafs[len(resFafs)-1].Cursor,
			},
		}, nil
	}

	return &fpb.GetFavoriteArticleFoldersResponse{
		FavoriteArticleFoldersEdge: resFafs,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(resFafs) == int(req.GetLimit().GetValue()),
			EndCursor:   resFafs[len(resFafs)-1].Cursor,
		},
	}, nil
}

func (fu *favoriteUseCase) GetFavoriteArticleFoldersByArticleId(ctx context.Context, req *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	fa, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticlesByArticleID(ctx, req.GetArticleId(), req.GetUserId())
	if err != nil {
		return &fpb.GetFavoriteArticleFoldersResponse{}, err
	}

	if len(fa) == 0 {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: make([]*fpb.FavoriteArticleFolderEdge, 0),
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	ids := make([]string, len(fa))
	for i, f := range fa {
		ids[i] = f.FavoriteArticleFolderID
	}

	fafs, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFoldersByIds(ctx, ids)
	if err != nil {
		return &fpb.GetFavoriteArticleFoldersResponse{}, err
	}

	if len(fafs) == 0 {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: make([]*fpb.FavoriteArticleFolderEdge, 0),
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	resFavFolders := make([]*fpb.FavoriteArticleFolderEdge, len(fafs))
	for i, f := range fafs {
		isFolderOnly := false
		faf := fu.convertPBFavoriteArticleFolder(ctx, f, nil, &isFolderOnly, nil)
		resFavFolders[i] = &fpb.FavoriteArticleFolderEdge{
			Cursor: f.ID,
			Node:   faf,
		}
	}

	return &fpb.GetFavoriteArticleFoldersResponse{
		FavoriteArticleFoldersEdge: resFavFolders,
		PageInfo: &copb.PageInfo{
			HasNextPage: false,
			EndCursor:   "",
		},
	}, nil
}

func (fu *favoriteUseCase) GetFavoriteArticleFolderByID(ctx context.Context, req *fpb.GetFavoriteArticleFolderByIdRequest) (*fpb.GetFavoriteArticleFolderResponse, error) {
	isFolderOnly := false
	if req.GetIsFolderOnly() != nil {
		isFolderOnly = req.GetIsFolderOnly().GetValue()
	}
	f, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolderByID(ctx, req.GetId(), req.GetUserId(), &isFolderOnly)
	if err != nil {
		return &fpb.GetFavoriteArticleFolderResponse{}, err
	}
	if f.ID == "" {
		return &fpb.GetFavoriteArticleFolderResponse{}, errors.New("favorite article folder not found")
	}

	return &fpb.GetFavoriteArticleFolderResponse{
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &f, nil, &isFolderOnly, nil),
	}, nil
}

func (fu *favoriteUseCase) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	f, err := fu.favoriteArticleFolderPersistenceAdapter.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}

	isFolderOnly := true
	faf, err := fu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolderByID(ctx, f.ID, req.GetUserId(), nil)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}

	return &fpb.CreateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &faf, nil, &isFolderOnly, nil),
	}, nil
}

func (fu *favoriteUseCase) convertPBFavoriteArticleFolder(ctx context.Context, f *entity.FavoriteArticleFolder, faLimit *int, isFolderOnly *bool, isFavoriteArticleAllFetch *bool) *fpb.FavoriteArticleFolder {
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

	fas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticlesByFavoriteArticleFolderID(ctx, f.ID, f.UserID, faLimit, isFavoriteArticleAllFetch)
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
		FavoriteArticleFolder: fu.convertPBFavoriteArticleFolder(ctx, &f, nil, &isFolderOnly, nil),
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
