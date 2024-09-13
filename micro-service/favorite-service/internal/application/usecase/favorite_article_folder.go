package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type FavoriteArticleFolderUseCase interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error)
}

type favoriteArticleFolderUseCase struct {
	favoriteArticleFolderPersistenceAdapter persistenceadapter.FavoriteArticleFolderPersistenceAdapter
}

func NewFavoriteArticleFolderUseCase(fafpa persistenceadapter.FavoriteArticleFolderPersistenceAdapter) FavoriteArticleFolderUseCase {
	return &favoriteArticleFolderUseCase{
		favoriteArticleFolderPersistenceAdapter: fafpa,
	}
}

func (fafu *favoriteArticleFolderUseCase) GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error) {
	fafs, err := fafu.favoriteArticleFolderPersistenceAdapter.GetFavoriteArticleFolders(ctx, req)
	if err != nil {
		return &fpb.GetFavoriteArticleFoldersResponse{}, err
	}

	resFafs := make([]*fpb.FavoriteArticleFolderEdge, 0, len(fafs))

	for i, f := range fafs {
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
			resFas := make([]*fpb.FavoriteArticle, 0, len(f.R.FavoriteArticles))
			for j, fa := range f.R.FavoriteArticles {
				resFa := &fpb.FavoriteArticle{
					Id:                      fa.ID,
					FavoriteArticleFolderId: fa.FavoriteArticleFolderID,
					ArticleId:               fa.ArticleID,
					UserId:                  fa.UserID,
					Title:                   fa.Title,
					Description:             fa.Description,
					ThumbnailUrl:            fa.ThumbnailURL,
					ArticleUrl:              fa.ArticleURL,
					PlatformName:            fa.PlatformName,
					PlatformUrl:             fa.PlatformURL,
					PlatformFaviconUrl:      fa.PlatformFaviconURL,
					IsEng:                   fa.IsEng,
					IsPrivate:               fa.IsPrivate,
					IsRead:                  fa.IsRead,
					CreatedAt:               timestamppb.New(fa.CreatedAt),
					UpdatedAt:               timestamppb.New(fa.UpdatedAt),
				}

				if fa.PlatformID.Valid {
					resFa.PlatformId = wrapperspb.String(fa.PlatformID.String)
				}
				if fa.PublishedAt.Valid {
					resFa.PublishedAt = timestamppb.New(fa.PublishedAt.Time)
				}
				if fa.AuthorName.Valid {
					resFa.AuthorName = wrapperspb.String(fa.AuthorName.String)
				}
				if fa.Tags.Valid {
					resFa.Tags = wrapperspb.String(fa.Tags.String)
				}
				resFas[j] = resFa
			}
			faf.FavoriteArticles = resFas
		}

		resFafs[i] = &fpb.FavoriteArticleFolderEdge{
			Cursor: f.ID,
			Node:   faf,
		}
	}

	if len(resFafs) == 0 {
		return &fpb.GetFavoriteArticleFoldersResponse{
			FavoriteArticleFoldersEdge: resFafs,
			PageInfo: &fpb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	return &fpb.GetFavoriteArticleFoldersResponse{
		FavoriteArticleFoldersEdge: resFafs,
		PageInfo: &fpb.PageInfo{
			HasNextPage: len(resFafs) == int(req.GetLimit()),
			EndCursor:   resFafs[len(resFafs)-1].Cursor,
		},
	}, nil
}

func (fafu *favoriteArticleFolderUseCase) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error) {
	f, err := fafu.favoriteArticleFolderPersistenceAdapter.CreateFavoriteArticleFolder(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleFolderResponse{}, err
	}
	return &fpb.CreateFavoriteArticleFolderResponse{
		FavoriteArticleFolder: &fpb.FavoriteArticleFolder{
			Id:          f.ID,
			UserId:      f.UserID,
			Title:       f.Title,
			Description: f.Description.String,
			CreatedAt:   timestamppb.New(f.CreatedAt),
			UpdatedAt:   timestamppb.New(f.UpdatedAt),
		},
	}, nil
}
