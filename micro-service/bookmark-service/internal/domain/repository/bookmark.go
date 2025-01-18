package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkRepository interface {
	ListBookmark(ctx context.Context, q []qm.QueryMod) (entity.BookmarkSlice, error)
	GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error)
	GetBookmark(ctx context.Context, q []qm.QueryMod) (entity.Bookmark, error)
	CreateBookmark(ctx context.Context, b entity.Bookmark) error
	DeleteBookmark(ctx context.Context, b entity.Bookmark) error
}
