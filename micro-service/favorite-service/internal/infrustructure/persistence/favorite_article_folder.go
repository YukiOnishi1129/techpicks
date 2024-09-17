package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type favoriteArticleFolderPersistence struct {
	db *sql.DB
}

func NewFavoriteArticleFolderPersistence(db *sql.DB) repository.FavoriteArticleFolderRepository {
	return &favoriteArticleFolderPersistence{
		db: db,
	}
}

func (fafp *favoriteArticleFolderPersistence) GetFavoriteArticleFolders(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticleFolderSlice, error) {
	favoriteArticleFolders, err := entity.FavoriteArticleFolders(q...).All(ctx, fafp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return favoriteArticleFolders, nil
}

func (fafp *favoriteArticleFolderPersistence) GetFavoriteArticleFolderByID(ctx context.Context, id string, q []qm.QueryMod) (entity.FavoriteArticleFolder, error) {
	q = append(q, qm.Where("id = ?", id))
	favoriteArticleFolder, err := entity.FavoriteArticleFolders(q...).One(ctx, fafp.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.FavoriteArticleFolder{}, nil
		}
		return entity.FavoriteArticleFolder{}, err
	}
	return *favoriteArticleFolder, nil
}

func (fafp *favoriteArticleFolderPersistence) CreateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error {
	if err := f.Insert(ctx, fafp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (fafp *favoriteArticleFolderPersistence) UpdateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error {
	if _, err := f.Update(ctx, fafp.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (fafp *favoriteArticleFolderPersistence) DeleteFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error {
	if _, err := f.Delete(ctx, fafp.db); err != nil {
		return err
	}
	return nil
}
