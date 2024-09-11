package persistenceadapter

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkPersistenceAdapter interface {
	GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (entity.BookmarkSlice, error)
	GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error)
	GetBookmarkByArticleID(ctx context.Context, articleID, userID string) (entity.Bookmark, error)
	GetBookmarkByArticleURL(ctx context.Context, articleURL, userID string) (entity.Bookmark, error)
	CreateBookmark(ctx context.Context, b entity.Bookmark) (entity.Bookmark, error)
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

func (bpa *bookmarkPersistenceAdapter) CreateBookmark(ctx context.Context, b entity.Bookmark) (entity.Bookmark, error) {
	if err := bpa.BookmarkRepository.CreateBookmark(ctx, b); err != nil {
		return entity.Bookmark{}, err
	}
	return bpa.BookmarkRepository.GetBookmarkByID(ctx, b.ID)
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
