package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BookmarkRepository interface {
	GetBookmark(ctx context.Context, q []qm.QueryMod) (entity.Bookmark, error)
}