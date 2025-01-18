package persistenceadapter

import (
	"context"

	bpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/bookmark"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/external_adapter"
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
	CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest, article *externaladapter.ArticleDTO) (entity.Bookmark, error)
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
		qm.OrderBy("created_at DESC"),
		qm.Limit(limit),
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("created_at < (SELECT created_at FROM bookmarks WHERE id = ?)", req.GetCursor()))
	}

	if req.GetKeywords() != nil {
		for _, keyword := range req.GetKeywords() {
			q = append(q, qm.Expr(
				qm.And("title ILIKE ?", "%"+keyword.GetValue()+"%"),
				qm.Or("description ILIKE ?", "%"+keyword.GetValue()+"%"),
			))
		}
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

func (bpa *bookmarkPersistenceAdapter) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest, article *externaladapter.ArticleDTO) (entity.Bookmark, error) {
	bookmarkID, _ := uuid.NewUUID()
	bookmark := entity.Bookmark{
		ID:           bookmarkID.String(),
		ArticleID:    article.ID,
		UserID:       req.GetUserId(),
		Title:        article.Title,
		Description:  article.Description,
		ArticleURL:   article.ArticleURL,
		ThumbnailURL: article.ThumbnailURL,
		IsEng:        article.IsEng,
		IsRead:       false,
	}
	if article.PublishedAt != nil {
		bookmark.PublishedAt.Time = article.PublishedAt.AsTime()
		bookmark.PublishedAt.Valid = true
	}

	if article.Platform != nil {
		bookmark.PlatformID.String = article.Platform.ID
		bookmark.PlatformID.Valid = true
		bookmark.PlatformName = article.Platform.Name
		bookmark.PlatformURL = article.Platform.SiteURL
		bookmark.PlatformFaviconURL = article.Platform.FaviconURL
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
