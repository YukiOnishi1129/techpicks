package adapter

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkAdapter interface {
	GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (entity.BookmarkSlice, error)
	GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error)
	GetBookmarkByArticleID(ctx context.Context, articleID, userID string) (entity.Bookmark, error)
	CreateBookmark(ctx context.Context, b entity.Bookmark) (entity.Bookmark, error)
	DeleteBookmark(ctx context.Context, id, userID string) error
}

type bookmarkAdapter struct {
	BookmarkRepository repository.BookmarkRepository
}

func NewBookmarkAdapter(br repository.BookmarkRepository) BookmarkAdapter {
	return &bookmarkAdapter{
		BookmarkRepository: br,
	}
}

func (ba *bookmarkAdapter) GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (entity.BookmarkSlice, error) {
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

	return ba.BookmarkRepository.GetBookmarks(ctx, q)
}

func (ba *bookmarkAdapter) GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error) {
	return ba.BookmarkRepository.GetBookmarkByID(ctx, id)
}

func (ba *bookmarkAdapter) GetBookmarkByArticleID(ctx context.Context, articleID, userID string) (entity.Bookmark, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
		qm.Where("user_id = ?", userID),
	}
	return ba.BookmarkRepository.GetBookmark(ctx, q)
}

func (ba *bookmarkAdapter) CreateBookmark(ctx context.Context, b entity.Bookmark) (entity.Bookmark, error) {
	if err := ba.BookmarkRepository.CreateBookmark(ctx, b); err != nil {
		return entity.Bookmark{}, err
	}
	return ba.BookmarkRepository.GetBookmarkByID(ctx, b.ID)
}

func (ba *bookmarkAdapter) DeleteBookmark(ctx context.Context, id, userID string) error {
	b, err := ba.BookmarkRepository.GetBookmarkByID(ctx, id)
	if err != nil {
		return err
	}
	if b.UserID != userID {
		return entity.ErrSyncFail
	}
	return ba.BookmarkRepository.DeleteBookmark(ctx, b)
}
