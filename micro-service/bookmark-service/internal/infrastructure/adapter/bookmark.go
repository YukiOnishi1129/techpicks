package adapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkAdapter interface {
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
