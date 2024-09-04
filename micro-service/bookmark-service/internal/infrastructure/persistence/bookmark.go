package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type bookmarkPersistence struct {
	db *sql.DB
}

func NewBookmarkPersistence(db *sql.DB) repository.BookmarkRepository {
	return &bookmarkPersistence{
		db: db,
	}
}

func (bp *bookmarkPersistence) GetBookmark(ctx context.Context, q []qm.QueryMod) (entity.Bookmark, error) {
	bookmark, err := entity.Bookmarks(q...).One(ctx, bp.db)
	if err != nil {
		return entity.Bookmark{}, err
	}
	return *bookmark, nil
}
