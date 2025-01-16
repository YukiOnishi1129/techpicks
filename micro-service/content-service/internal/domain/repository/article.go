package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleRepository interface {
	ListArticle(ctx context.Context, q []qm.QueryMod) (entity.ArticleSlice, error)
	GetArticleByID(ctx context.Context, id string, q []qm.QueryMod) (entity.Article, error)
	CreateArticle(ctx context.Context, a entity.Article) error
}
