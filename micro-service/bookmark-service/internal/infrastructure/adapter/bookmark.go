package adapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkAdapter interface {
	GetBookmarkByArticleID(ctx context.Context, articleID string) (entity.Bookmark, error)
}

type bookmarkAdapter struct {
	BookmarkRepository repository.BookmarkRepository
}

func NewBookmarkAdapter(br repository.BookmarkRepository) BookmarkAdapter {
	return &bookmarkAdapter{
		BookmarkRepository: br,
	}
}

func (ba *bookmarkAdapter) GetBookmarkByArticleID(ctx context.Context, articleID string) (entity.Bookmark, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", articleID),
	}
	return ba.BookmarkRepository.GetBookmark(ctx, q)
}
