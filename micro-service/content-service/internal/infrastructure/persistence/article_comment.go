package persistence

import (
	"context"
	"database/sql"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type articleCommentPersistence struct {
	db *sql.DB
}

func NewArticleCommentPersistence(db *sql.DB) repository.ArticleCommentRepository {
	return &articleCommentPersistence{
		db: db,
	}
}

func (ap *articleCommentPersistence) GetArticleCommentByID(ctx context.Context, id string, q []qm.QueryMod) (entity.ArticleComment, error) {
	q = append(q, qm.Where("id = ?", id))
	articleComment, err := entity.ArticleComments(q...).One(ctx, ap.db)
	if err != nil {
		if err == sql.ErrNoRows {
			return entity.ArticleComment{}, nil
		}
		return entity.ArticleComment{}, err
	}
	return *articleComment, nil
}

func (ap *articleCommentPersistence) CreateArticleComment(ctx context.Context, a entity.ArticleComment) error {
	if err := a.Insert(ctx, ap.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (ap *articleCommentPersistence) UpdateArticleComment(ctx context.Context, a entity.ArticleComment) error {
	if _, err := a.Update(ctx, ap.db, boil.Infer()); err != nil {
		return err
	}
	return nil
}

func (ap *articleCommentPersistence) DeleteArticleComment(ctx context.Context, a entity.ArticleComment) error {
	if _, err := a.Delete(ctx, ap.db); err != nil {
		return err
	}
	return nil
}
