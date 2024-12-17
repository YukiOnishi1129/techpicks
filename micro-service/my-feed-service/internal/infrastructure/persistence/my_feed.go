package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type myFeedPersistence struct {
	db *sql.DB
}

func NewMyFeedPersistence(db *sql.DB) repository.MyFeedRepository {
	return &myFeedPersistence{
		db: db,
	}
}

func (mfp *myFeedPersistence) GetMyFeeds(ctx context.Context, q []qm.QueryMod) (entity.MyFeedSlice, error) {
	myFeeds, err := entity.MyFeeds(q...).All(ctx, mfp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return myFeeds, nil
}

func (mfp *myFeedPersistence) GetMyFeedByID(ctx context.Context, id string, q []qm.QueryMod) (entity.MyFeed, error) {
	myFeed, err := entity.FindMyFeed(ctx, mfp.db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.MyFeed{}, nil
		}
		return entity.MyFeed{}, err
	}
	return *myFeed, nil
}

func (mfp *myFeedPersistence) CreateMyFeed(ctx context.Context, mf entity.MyFeed) error {
	if err := mf.Insert(ctx, mfp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (mfp *myFeedPersistence) UpdateMyFeed(ctx context.Context, mf entity.MyFeed) error {
	if _, err := mf.Update(ctx, mfp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (mfp *myFeedPersistence) DeleteMyFeed(ctx context.Context, mf entity.MyFeed) error {
	if _, err := mf.Delete(ctx, mfp.db); err != nil {
		return err
	}
	return nil
}
