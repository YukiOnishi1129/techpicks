package persistenceadapter

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkPersistenceAdapter interface {
	GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (entity.BookmarkSlice, error)
	GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error)
	GetBookmarkByArticleID(ctx context.Context, articleID, userID string) (entity.Bookmark, error)
	GetBookmarkByArticleURL(ctx context.Context, articleURL, userID string) (entity.Bookmark, error)
	CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (entity.Bookmark, error)
	CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest, article *cpb.Article) (entity.Bookmark, error)
	DeleteBookmark(ctx context.Context, id, userID string) error
}

type bookmarkPersistenceAdapter struct {
	BookmarkRepository repository.BookmarkRepository
}

func NewBookmarkPersistenceAdapter(br repository.BookmarkRepository) BookmarkPersistenceAdapter {
	return &bookmarkPersistenceAdapter{
		BookmarkRepository: br,
	}
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (entity.BookmarkSlice, error) {
	limit := 20
	if req.GetLimit() != 0 {
		limit = int(req.GetLimit())
	}

	q := []qm.QueryMod{
		qm.Where("user_id = ?", req.GetUserId()),
		qm.Limit(limit),
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("created_at < (SELECT created_at FROM bookmarks WHERE id = ?)", req.GetCursor()))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("title LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}

	return bpa.BookmarkRepository.GetBookmarks(ctx, q)
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error) {
	return bpa.BookmarkRepository.GetBookmarkByID(ctx, id)
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByArticleID(ctx context.Context, articleID, userID string) (entity.Bookmark, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
		qm.Where("user_id = ?", userID),
	}
	return bpa.BookmarkRepository.GetBookmark(ctx, q)
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByArticleURL(ctx context.Context, articleURL, userID string) (entity.Bookmark, error) {
	q := []qm.QueryMod{
		qm.Where("article_url = ?", articleURL),
		qm.Where("user_id = ?", userID),
	}
	return bpa.BookmarkRepository.GetBookmark(ctx, q)
}

func (bpa *bookmarkPersistenceAdapter) CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (entity.Bookmark, error) {
	bookmarkID, _ := uuid.NewUUID()
	bookmark := entity.Bookmark{
		ID:                 bookmarkID.String(),
		ArticleID:          req.GetArticleId(),
		UserID:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleURL:         req.GetArticleUrl(),
		ThumbnailURL:       req.GetThumbnailUrl(),
		PlatformName:       req.GetPlatformName(),
		PlatformURL:        req.GetPlatformUrl(),
		PlatformFaviconURL: req.GetPlatformFaviconUrl(),
		IsEng:              req.GetIsEng(),
		IsRead:             req.GetIsRead(),
	}

	if req.GetPlatformId() != nil {
		bookmark.PlatformID.String = req.GetPlatformId().GetValue()
		bookmark.PlatformID.Valid = true
	}
	if req.GetPublishedAt() != nil {
		bookmark.PublishedAt.Time = req.GetPublishedAt().AsTime()
		bookmark.PublishedAt.Valid = true
	}

	if err := bpa.BookmarkRepository.CreateBookmark(ctx, bookmark); err != nil {
		return entity.Bookmark{}, err
	}
	return bpa.BookmarkRepository.GetBookmarkByID(ctx, bookmark.ID)
}

func (bpa *bookmarkPersistenceAdapter) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest, article *cpb.Article) (entity.Bookmark, error) {
	bookmarkID, _ := uuid.NewUUID()
	bookmark := entity.Bookmark{
		ID:           bookmarkID.String(),
		ArticleID:    article.GetId(),
		UserID:       req.GetUserId(),
		Title:        article.GetTitle(),
		Description:  article.GetDescription(),
		ArticleURL:   article.GetArticleUrl(),
		ThumbnailURL: article.GetThumbnailUrl(),
		IsEng:        article.GetIsEng(),
		IsRead:       false,
	}
	if article.GetPublishedAt() != nil {
		bookmark.PublishedAt.Time = article.GetPublishedAt().AsTime()
		bookmark.PublishedAt.Valid = true
	}

	if article.GetPlatform() != nil {
		bookmark.PlatformID.String = article.GetPlatform().GetId()
		bookmark.PlatformID.Valid = true
		bookmark.PlatformName = article.GetPlatform().GetName()
		bookmark.PlatformURL = article.GetPlatform().GetSiteUrl()
		bookmark.PlatformFaviconURL = article.GetPlatform().GetFaviconUrl()
	} else {
		bookmark.PlatformName = req.GetPlatformName()
		bookmark.PlatformURL = req.GetPlatformUrl()
		bookmark.PlatformFaviconURL = req.GetPlatformFaviconUrl()
	}

	if err := bpa.BookmarkRepository.CreateBookmark(ctx, bookmark); err != nil {
		return entity.Bookmark{}, err
	}
	return bpa.BookmarkRepository.GetBookmarkByID(ctx, bookmark.ID)
}

func (bpa *bookmarkPersistenceAdapter) DeleteBookmark(ctx context.Context, id, userID string) error {
	b, err := bpa.BookmarkRepository.GetBookmarkByID(ctx, id)
	if err != nil {
		return err
	}
	if b.UserID != userID {
		return entity.ErrSyncFail
	}
	return bpa.BookmarkRepository.DeleteBookmark(ctx, b)
}
