package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleCommentRepository interface {
	GetArticleCommentByID(ctx context.Context, id string, q []qm.QueryMod) (entity.ArticleComment, error)
	CreateArticleComment(ctx context.Context, a entity.ArticleComment) error
	UpdateArticleComment(ctx context.Context, a entity.ArticleComment) error
	DeleteArticleComment(ctx context.Context, a entity.ArticleComment) error
}
