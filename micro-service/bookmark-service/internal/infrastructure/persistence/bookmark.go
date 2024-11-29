package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
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

func (bp *bookmarkPersistence) GetBookmarks(ctx context.Context, q []qm.QueryMod) (entity.BookmarkSlice, error) {
	bookmarks, err := entity.Bookmarks(q...).All(ctx, bp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return bookmarks, nil
}

func (bp *bookmarkPersistence) GetBookmarkByID(ctx context.Context, id string) (entity.Bookmark, error) {
	bookmark, err := entity.FindBookmark(ctx, bp.db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.Bookmark{}, nil
		}
		return entity.Bookmark{}, err
	}
	return *bookmark, nil
}

func (bp *bookmarkPersistence) GetBookmark(ctx context.Context, q []qm.QueryMod) (entity.Bookmark, error) {
	bookmark, err := entity.Bookmarks(q...).One(ctx, bp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.Bookmark{}, nil
		}
		return entity.Bookmark{}, err
	}
	return *bookmark, nil
}

func (bp *bookmarkPersistence) CreateBookmark(ctx context.Context, b entity.Bookmark) error {
	if err := b.Insert(ctx, bp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (bp *bookmarkPersistence) DeleteBookmark(ctx context.Context, b entity.Bookmark) error {
	if _, err := b.Delete(ctx, bp.db); err != nil {
		return err
	}
	return nil
}
