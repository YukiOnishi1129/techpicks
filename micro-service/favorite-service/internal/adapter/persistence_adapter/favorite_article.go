package persistenceadapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticlePersistenceAdapter interface {
	GetFavoriteArticleByID(ctx context.Context, id string, userID string) (entity.FavoriteArticle, error)
	GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int) (entity.FavoriteArticleSlice, error)
	CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (entity.FavoriteArticle, error)
	MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error
}

type favoriteArticlePersistenceAdapter struct {
	favoriteArticleFolderRepository repository.FavoriteArticleRepository
}

func NewFavoriteArticlePersistenceAdapter(favoriteArticleFolderRepository repository.FavoriteArticleRepository) FavoriteArticlePersistenceAdapter {
	return &favoriteArticlePersistenceAdapter{
		favoriteArticleFolderRepository: favoriteArticleFolderRepository,
	}
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticleByID(ctx context.Context, id string, userID string) (entity.FavoriteArticle, error) {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", userID),
	}
	fa, err := fapa.favoriteArticleFolderRepository.GetFavoriteArticleByID(ctx, id, q)
	if err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int) (entity.FavoriteArticleSlice, error) {
	paramLimit := 1
	if limit != nil {
		paramLimit = int(*limit)
	}

	q := []qm.QueryMod{
		qm.Where("favorite_article_folder_id = ?", fafID),
		qm.Where("user_id = ?", userID),
		qm.OrderBy("created_at DESC"),
		qm.Limit(paramLimit),
	}

	favoriteArticles, err := fapa.favoriteArticleFolderRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		return nil, err
	}
	return favoriteArticles, nil
}

func (fapa *favoriteArticlePersistenceAdapter) CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (entity.FavoriteArticle, error) {
	favoriteArticleID, _ := uuid.NewRandom()
	fa := entity.FavoriteArticle{
		ID:                      favoriteArticleID.String(),
		UserID:                  req.GetUserId(),
		FavoriteArticleFolderID: req.GetFavoriteArticleFolderId(),
		ArticleID:               req.GetArticleId(),
		Title:                   req.GetTitle(),
		ArticleURL:              req.GetArticleUrl(),
		ThumbnailURL:            req.GetThumbnailUrl(),
		PlatformName:            req.GetPlatformName(),
		PlatformURL:             req.GetPlatformUrl(),
		PlatformFaviconURL:      req.GetPlatformFaviconUrl(),
		IsEng:                   req.GetIsEng(),
		IsPrivate:               req.GetIsPrivate(),
	}

	if req.GetDescription() != nil {
		fa.Description = req.GetDescription().GetValue()
	}
	if req.GetPlatformId() != nil {
		fa.PlatformID = null.String{String: req.GetPlatformId().GetValue(), Valid: true}
	}
	if req.GetPublishedAt() != nil {
		fa.PublishedAt = null.TimeFrom(req.GetPublishedAt().AsTime())
	}
	if req.GetAuthorName() != nil {
		fa.AuthorName = null.String{String: req.GetAuthorName().GetValue(), Valid: true}
	}
	if req.GetTags() != nil {
		fa.Tags = null.String{String: req.GetTags().GetValue(), Valid: true}
	}

	if _, err := fapa.favoriteArticleFolderRepository.CreateFavoriteArticle(ctx, fa); err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error {
	return fapa.favoriteArticleFolderRepository.MultiDeleteFavoriteArticles(ctx, fa)
}
