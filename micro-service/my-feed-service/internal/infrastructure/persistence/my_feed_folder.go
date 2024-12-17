package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type myFeedFolderPersistence struct {
	db *sql.DB
}

func NewMyFeedFolderPersistence(db *sql.DB) repository.MyFeedFolderRepository {
	return &myFeedFolderPersistence{
		db: db,
	}
}

func (mfp *myFeedFolderPersistence) GetMyFeedFolders(ctx context.Context, q []qm.QueryMod) (entity.MyFeedFolderSlice, error) {
	myFeedFolders, err := entity.MyFeedFolders(q...).All(ctx, mfp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return myFeedFolders, nil
}

func (mfp *myFeedFolderPersistence) GetMyFeedFolderByID(ctx context.Context, id string, q []qm.QueryMod) (entity.MyFeedFolder, error) {
	myFeedFolder, err := entity.FindMyFeedFolder(ctx, mfp.db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.MyFeedFolder{}, nil
		}
		return entity.MyFeedFolder{}, err
	}
	return *myFeedFolder, nil
}

func (mfp *myFeedFolderPersistence) CreateMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error {
	if err := mff.Insert(ctx, mfp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (mfp *myFeedFolderPersistence) UpdateMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error {
	if _, err := mff.Update(ctx, mfp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (mfp *myFeedFolderPersistence) DeleteMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error {
	if _, err := mff.Delete(ctx, mfp.db); err != nil {
		return err
	}
	return nil
}
