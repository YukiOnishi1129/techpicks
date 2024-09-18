package usecase

import (
	"context"
	"errors"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (fu *favoriteUseCase) GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest) (*fpb.GetFavoriteArticlesResponse, error) {
	fas, err := fu.favoriteArticlePersistenceAdapter.GetFavoriteArticles(ctx, req)
	if err != nil {
		return &fpb.GetFavoriteArticlesResponse{}, err
	}

	resFas := make([]*fpb.FavoriteArticleEdge, 0, len(fas))
	for _, fa := range fas {
		resFas = append(resFas, &fpb.FavoriteArticleEdge{
			Cursor: fa.ID,
			Node:   fu.convertPBFavoriteArticle(fa),
		})
	}

	return &fpb.GetFavoriteArticlesResponse{
		FavoriteArticlesEdge: resFas,
		PageInfo: &fpb.PageInfo{
			HasNextPage: len(resFas) == int(req.GetLimit().GetValue()),
			EndCursor:   resFas[len(resFas)-1].Cursor,
		},
	}, nil
}

func (fu *favoriteUseCase) CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (*fpb.CreateFavoriteArticleResponse, error) {
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
