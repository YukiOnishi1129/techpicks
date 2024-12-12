package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type feedPersistence struct {
	db *sql.DB
}

func NewFeedPersistence(db *sql.DB) repository.FeedRepository {
	return &feedPersistence{
		db: db,
	}
}

func (fp *feedPersistence) GetFeeds(ctx context.Context, q []qm.QueryMod) (entity.FeedSlice, error) {
	// boil.DebugMode = true
	feeds, err := entity.Feeds(q...).All(ctx, fp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	// boil.DebugMode = false
	return feeds, nil
}
