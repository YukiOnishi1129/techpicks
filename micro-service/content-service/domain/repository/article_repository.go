package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleRepository interface {
	GetArticles(ctx context.Context, q []qm.QueryMod) (entity.ArticleSlice, error)
}
