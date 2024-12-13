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

func (fp *feedPersistence) GetFeed(ctx context.Context, q []qm.QueryMod) (entity.Feed, error) {
	// boil.DebugMode = true
	feed, err := entity.Feeds(q...).One(ctx, fp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.Feed{}, nil
		}
		return entity.Feed{}, err
	}
	// boil.DebugMode = false
	return *feed, nil
}
