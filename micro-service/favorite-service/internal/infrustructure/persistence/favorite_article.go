package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type favoriteArticlePersistence struct {
	db *sql.DB
}

func NewFavoriteArticlePersistence(db *sql.DB) repository.FavoriteArticleRepository {
	return &favoriteArticlePersistence{
		db: db,
	}
}

func (fap *favoriteArticlePersistence) GetFavoriteArticles(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticleSlice, error) {
	favoriteArticles, err := entity.FavoriteArticles(q...).All(ctx, fap.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return favoriteArticles, nil
}

func (fap *favoriteArticlePersistence) GetFavoriteArticle(ctx context.Context, q []qm.QueryMod) (entity.FavoriteArticle, error) {
	favoriteArticle, err := entity.FavoriteArticles(q...).One(ctx, fap.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.FavoriteArticle{}, nil
		}
		return entity.FavoriteArticle{}, err
	}
	return *favoriteArticle, nil
}

func (fap *favoriteArticlePersistence) GetFavoriteArticleByID(ctx context.Context, id string, q []qm.QueryMod) (entity.FavoriteArticle, error) {
	q = append(q, qm.Where("id = ?", id))
	favoriteArticle, err := entity.FavoriteArticles(q...).One(ctx, fap.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.FavoriteArticle{}, nil
		}
		return entity.FavoriteArticle{}, err
	}
	return *favoriteArticle, nil
}

func (fap *favoriteArticlePersistence) CreateFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) (entity.FavoriteArticle, error) {
	if err := fa.Insert(ctx, fap.db, boil.Infer()); err != nil {
		return entity.FavoriteArticle{}, err
	}
	return fa, nil
}

func (fap *favoriteArticlePersistence) DeleteFavoriteArticle(ctx context.Context, fa entity.FavoriteArticle) error {
	if _, err := fa.Delete(ctx, fap.db); err != nil {
		return err
	}
	return nil
}

func (fap *favoriteArticlePersistence) MultiDeleteFavoriteArticles(ctx context.Context, fa entity.FavoriteArticleSlice) error {
	tx, err := fap.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	if _, err := fa.DeleteAll(ctx, tx); err != nil {
		if err := tx.Rollback(); err != nil {
			return err
		}
		return err
	}

	return tx.Commit()
}
