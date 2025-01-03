package usecase

import (
	"context"
	"errors"
	"sort"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (fu *favoriteUseCase) GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest) (*fpb.GetFavoriteArticlesResponse, error) {
	limit := 20
	if req.GetLimit() != nil {
		limit = int(req.GetLimit().GetValue())
	}

	fas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticles(ctx, req, limit)
	if err != nil {
		return &fpb.GetFavoriteArticlesResponse{}, err
	}

	resFas := make([]*fpb.FavoriteArticleEdge, 0, len(fas))
	if len(fas) == 0 {
		return &fpb.GetFavoriteArticlesResponse{
			FavoriteArticlesEdge: resFas,
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	for _, fa := range fas {
		resFas = append(resFas, &fpb.FavoriteArticleEdge{
			Cursor: fa.ID,
			Node:   fu.convertPBFavoriteArticle(fa),
		})
	}

	return &fpb.GetFavoriteArticlesResponse{
		FavoriteArticlesEdge: resFas,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(resFas) == limit,
			EndCursor:   resFas[len(resFas)-1].Cursor,
		},
	}, nil
}

func (fu *favoriteUseCase) GetFavoriteAllFolderArticles(ctx context.Context, req *fpb.GetFavoriteAllFolderArticlesRequest) (*fpb.GetFavoriteAllFolderArticlesResponse, error) {
	limit := 20
	if req.GetLimit() != nil {
		limit = int(req.GetLimit().GetValue())
	}

	isEndSearch := false

	resFas := make([]*fpb.FavoriteAllFolderArticleEdge, 0)

	endCursor := ""
	if req.GetCursor().GetValue() != "" {
		endCursor = req.GetCursor().GetValue()
	}

	for !isEndSearch {
		fas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticlesOrderByArticleID(ctx, req, endCursor, limit)
		if err != nil {
			return &fpb.GetFavoriteAllFolderArticlesResponse{}, err
		}

		if len(fas) == 0 {
			break
		}

		newArticleIDs := make(map[string]struct{})

		for _, fa := range fas {
			endCursor = fa.ID
			if _, exists := newArticleIDs[fa.ArticleID]; exists {
				continue
			}

			count, err := fu.favoriteArticlePersistenceAdapter.CountPreviousFavoriteArticleByArticleID(ctx, fa.ID, fa.ArticleID, fa.UserID)
			if err != nil {
				return &fpb.GetFavoriteAllFolderArticlesResponse{}, err
			}
			if count != 0 {
				continue
			}

			afas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticlesByArticleID(ctx, fa.ArticleID, fa.UserID)
			if err != nil {
				return &fpb.GetFavoriteAllFolderArticlesResponse{}, err
			}
			if len(afas) == 0 {
				continue
			}

			newArticleIDs[fa.ArticleID] = struct{}{}

			resFaFs := make([]*fpb.FavoriteArticleFolder, len(afas))

			sort.Slice(afas, func(i, j int) bool {
				return afas[i].R.FavoriteArticleFolder.CreatedAt.Before(afas[j].R.FavoriteArticleFolder.CreatedAt)
			})

			for j, afa := range afas {
				resFaFs[j] = &fpb.FavoriteArticleFolder{
					Id:        afa.R.FavoriteArticleFolder.ID,
					UserId:    afa.R.FavoriteArticleFolder.UserID,
					Title:     afa.R.FavoriteArticleFolder.Title,
					CreatedAt: timestamppb.New(afa.R.FavoriteArticleFolder.CreatedAt),
					UpdatedAt: timestamppb.New(afa.R.FavoriteArticleFolder.UpdatedAt),
				}
				if afa.R.FavoriteArticleFolder.Description.Valid {
					resFaFs[j].Description = afa.R.FavoriteArticleFolder.Description.String
				}
			}

			resFa := &fpb.FavoriteAllFolderArticleEdge{
				Cursor:                 fa.ID,
				Node:                   fu.convertPBFavoriteArticle(fa),
				FavoriteArticleFolders: resFaFs,
			}
			resFas = append(resFas, resFa)

			if len(resFas) == limit {
				isEndSearch = true
				break
			}
		}
	}

	if len(resFas) == 0 {
		endCursor = ""
	}

	return &fpb.GetFavoriteAllFolderArticlesResponse{
		FavoriteAllFolderArticleEdge: resFas,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(resFas) == limit,
			EndCursor:   endCursor,
		},
	}, nil
}

func (fu *favoriteUseCase) CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
	data, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByArticleIDAndFavoriteArticleFolderID(ctx, req.GetArticleId(), req.GetFavoriteArticleFolderId(), req.GetUserId())
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}
	if data.ID != "" {
		return &fpb.CreateFavoriteArticleResponse{}, errors.New("favorite article already exists")
	}
	cfa, err := fu.favoriteArticlePersistenceAdapter.CreateFavoriteArticle(ctx, req)
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}

	fa, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByID(ctx, cfa.ID, cfa.UserID)
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}

	return &fpb.CreateFavoriteArticleResponse{
		FavoriteArticle: fu.convertPBFavoriteArticle(&fa),
	}, nil
}

func (fu *favoriteUseCase) CreateFavoriteArticleForUploadArticle(ctx context.Context, req *fpb.CreateFavoriteArticleForUploadArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
	data, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByArticleURL(ctx, req.GetArticleUrl(), req.GetFavoriteArticleFolderId(), req.GetUserId())
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}
	if data.ID != "" {
		return &fpb.CreateFavoriteArticleResponse{}, errors.New("favorite article already exists")
	}

	// create article
	article, err := fu.contentExternalAdapter.CreateUploadArticle(ctx, &cpb.CreateUploadArticleRequest{
		UserId:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleUrl:         req.GetArticleUrl(),
		ThumbnailUrl:       req.GetThumbnailUrl(),
		PlatformName:       req.GetPlatformName(),
		PlatformUrl:        req.GetPlatformUrl(),
		PlatformFaviconUrl: req.GetPlatformFaviconUrl(),
	})
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}

	// create favorite article
	cfa, err := fu.favoriteArticlePersistenceAdapter.CreateFavoriteArticleForUploadArticle(ctx, req, article.Article)
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}

	fa, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByID(ctx, cfa.ID, cfa.UserID)
	if err != nil {
		return &fpb.CreateFavoriteArticleResponse{}, err
	}

	return &fpb.CreateFavoriteArticleResponse{
		FavoriteArticle: fu.convertPBFavoriteArticle(&fa),
	}, nil
}

func (fu *favoriteUseCase) DeleteFavoriteArticle(ctx context.Context, req *fpb.DeleteFavoriteArticleRequest) (*emptypb.Empty, error) {
	f, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByID(ctx, req.GetId(), req.GetUserId())
	if err != nil {
		return &emptypb.Empty{}, err
	}
	if f.ID == "" {
		return &emptypb.Empty{}, errors.New("favorite article not found")
	}

	err = fu.favoriteArticlePersistenceAdapter.DeleteFavoriteArticle(ctx, f)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	return &emptypb.Empty{}, nil
}

func (fu *favoriteUseCase) DeleteFavoriteArticlesByArticleID(ctx context.Context, req *fpb.DeleteFavoriteArticleByArticleIdRequest) (*emptypb.Empty, error) {
	f, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticleByArticleIDAndFavoriteArticleFolderID(ctx, req.GetArticleId(), req.GetFavoriteArticleFolderId(), req.GetUserId())
	if err != nil {
		return &emptypb.Empty{}, err
	}
	if f.ID == "" {
		return &emptypb.Empty{}, errors.New("favorite article not found")
	}

	err = fu.favoriteArticlePersistenceAdapter.DeleteFavoriteArticle(ctx, f)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	return &emptypb.Empty{}, nil
}

func (fu *favoriteUseCase) convertPBFavoriteArticle(fa *entity.FavoriteArticle) *fpb.FavoriteArticle {
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

	return resFa
}
