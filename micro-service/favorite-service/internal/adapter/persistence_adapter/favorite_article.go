package persistenceadapter

import (
	"context"
	"fmt"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticlePersistenceAdapter interface {
	GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest, limit int) (entity.FavoriteArticleSlice, error)
	GetFavoriteArticlesOrderByArticleID(ctx context.Context, req *fpb.GetFavoriteAllFolderArticlesRequest, cursor string, limit int) (entity.FavoriteArticleSlice, error)
	GetFavoriteArticlesByArticleID(ctx context.Context, articleID, userID string) (entity.FavoriteArticleSlice, error)
	GetFavoriteArticleByArticleIDAndFavoriteArticleFolderID(ctx context.Context, articleID, favoriteArticleFolderID, userID string) (entity.FavoriteArticle, error)
	GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int, isAllFetch *bool) (entity.FavoriteArticleSlice, error)
	GetFavoriteArticleByID(ctx context.Context, id string, userID string) (entity.FavoriteArticle, error)
	GetFavoriteArticleByArticleURL(ctx context.Context, articleURL, favoriteArticleFolderID, userID string) (entity.FavoriteArticle, error)
	CountPreviousFavoriteArticleByArticleID(ctx context.Context, id, articleID, userID string) (int64, error)

	CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (entity.FavoriteArticle, error)
	CreateFavoriteArticleForUploadArticle(ctx context.Context, req *fpb.CreateFavoriteArticleForUploadArticleRequest, article *cpb.Article) (entity.FavoriteArticle, error)
	DeleteFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) error
	MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error
}

type favoriteArticlePersistenceAdapter struct {
	favoriteArticleRepository repository.FavoriteArticleRepository
}

func NewFavoriteArticlePersistenceAdapter(favoriteArticleRepository repository.FavoriteArticleRepository) FavoriteArticlePersistenceAdapter {
	return &favoriteArticlePersistenceAdapter{
		favoriteArticleRepository: favoriteArticleRepository,
	}
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest, limit int) (entity.FavoriteArticleSlice, error) {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", req.GetUserId()),
		qm.OrderBy("created_at DESC"),
		qm.Limit(limit),
	}
	if req.GetCursor() != nil {
		q = append(q, qm.Where("created_at < (SELECT created_at FROM favorite_articles WHERE id = ?)", req.GetCursor().GetValue()))
	}
	if req.GetKeyword() != nil {
		q = append(q, qm.Expr(
			qm.And("title ILIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("description ILIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}
	if req.GetFavoriteArticleFolderId() != nil {
		q = append(q, qm.Where("favorite_article_folder_id = ?", req.GetFavoriteArticleFolderId().GetValue()))
	}

	favoriteArticles, err := fapa.favoriteArticleRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		return nil, err
	}
	return favoriteArticles, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticlesOrderByArticleID(ctx context.Context, req *fpb.GetFavoriteAllFolderArticlesRequest, cursor string, limit int) (entity.FavoriteArticleSlice, error) {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", req.GetUserId()),
		qm.OrderBy("created_at DESC"),
		qm.OrderBy("article_id"),
		qm.Limit(limit),
	}

	if cursor != "" {
		q = append(q, qm.Where("created_at < (SELECT created_at FROM favorite_articles WHERE id = ?)", cursor))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("title LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}

	favoriteArticles, err := fapa.favoriteArticleRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return favoriteArticles, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticlesByArticleID(ctx context.Context, articleID, userID string) (entity.FavoriteArticleSlice, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
		qm.Where("user_id = ?", userID),
		qm.Load(qm.Rels(entity.FavoriteArticleRels.FavoriteArticleFolder)),
	}
	fa, err := fapa.favoriteArticleRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		return entity.FavoriteArticleSlice{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticleByArticleIDAndFavoriteArticleFolderID(ctx context.Context, articleID, favoriteArticleFolderID, userID string) (entity.FavoriteArticle, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
		qm.Where("favorite_article_folder_id = ?", favoriteArticleFolderID),
		qm.Where("user_id = ?", userID),
	}
	fa, err := fapa.favoriteArticleRepository.GetFavoriteArticle(ctx, q)
	if err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticleByID(ctx context.Context, id string, userID string) (entity.FavoriteArticle, error) {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", userID),
	}
	fa, err := fapa.favoriteArticleRepository.GetFavoriteArticleByID(ctx, id, q)
	if err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticlesByFavoriteArticleFolderID(ctx context.Context, fafID, userID string, limit *int, isFavoriteArticleAllFetch *bool) (entity.FavoriteArticleSlice, error) {

	q := []qm.QueryMod{
		qm.Where("favorite_article_folder_id = ?", fafID),
		qm.Where("user_id = ?", userID),
		qm.OrderBy("created_at DESC"),
	}

	if isFavoriteArticleAllFetch == nil || !*isFavoriteArticleAllFetch {
		paramLimit := 1
		if limit != nil {
			paramLimit = int(*limit)
		}
		q = append(q, qm.Limit(paramLimit))
	}

	favoriteArticles, err := fapa.favoriteArticleRepository.GetFavoriteArticles(ctx, q)
	if err != nil {
		return nil, err
	}
	return favoriteArticles, nil
}

func (fapa *favoriteArticlePersistenceAdapter) GetFavoriteArticleByArticleURL(ctx context.Context, articleURL, favoriteArticleFolderID, userID string) (entity.FavoriteArticle, error) {
	q := []qm.QueryMod{
		qm.Where("article_url = ?", articleURL),
		qm.Where("user_id = ?", userID),
		qm.Where("favorite_article_folder_id = ?", favoriteArticleFolderID),
	}
	fa, err := fapa.favoriteArticleRepository.GetFavoriteArticle(ctx, q)
	if err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) CountPreviousFavoriteArticleByArticleID(ctx context.Context, id, articleID, userID string) (int64, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
		qm.Where("user_id = ?", userID),
		qm.Where("created_at > (SELECT created_at FROM favorite_articles WHERE id = ?)", id),
	}
	count, err := fapa.favoriteArticleRepository.CountFavoriteArticles(ctx, q)
	if err != nil {
		return 0, err
	}
	return count, nil
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

	if _, err := fapa.favoriteArticleRepository.CreateFavoriteArticle(ctx, fa); err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) CreateFavoriteArticleForUploadArticle(ctx context.Context, req *fpb.CreateFavoriteArticleForUploadArticleRequest, article *cpb.Article) (entity.FavoriteArticle, error) {
	favoriteArticleID, _ := uuid.NewRandom()
	fa := entity.FavoriteArticle{
		ID:                      favoriteArticleID.String(),
		UserID:                  req.GetUserId(),
		FavoriteArticleFolderID: req.GetFavoriteArticleFolderId(),
		ArticleID:               article.GetId(),
		Title:                   article.GetTitle(),
		Description:             article.GetDescription(),
		ArticleURL:              article.GetArticleUrl(),
		ThumbnailURL:            article.GetThumbnailUrl(),
		IsEng:                   article.GetIsEng(),
		IsPrivate:               article.GetIsPrivate(),
		IsRead:                  false,
	}

	if article.GetPublishedAt() != nil {
		fa.PublishedAt.Time = article.GetPublishedAt().AsTime()
		fa.PublishedAt.Valid = true
	}

	if article.GetPlatform() != nil {
		fa.PlatformID.String = article.GetPlatform().GetId()
		fa.PlatformID.Valid = true
		fa.PlatformName = article.GetPlatform().GetName()
		fa.PlatformURL = article.GetPlatform().GetSiteUrl()
		fa.PlatformFaviconURL = article.GetPlatform().GetFaviconUrl()
	} else {
		fa.PlatformName = req.GetPlatformName()
		fa.PlatformURL = req.GetPlatformUrl()
		fa.PlatformFaviconURL = req.GetPlatformFaviconUrl()
	}

	if article.GetAuthorName() != nil {
		fa.AuthorName = null.String{String: article.GetAuthorName().GetValue(), Valid: true}
	}

	if article.GetTags() != nil {
		fa.Tags = null.String{String: article.GetTags().GetValue(), Valid: true}
	}

	if _, err := fapa.favoriteArticleRepository.CreateFavoriteArticle(ctx, fa); err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fapa *favoriteArticlePersistenceAdapter) DeleteFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) error {
	return fapa.favoriteArticleRepository.DeleteFavoriteArticle(ctx, fa)
}

func (fapa *favoriteArticlePersistenceAdapter) MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error {
	return fapa.favoriteArticleRepository.MultiDeleteFavoriteArticles(ctx, fa)
}
