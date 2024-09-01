package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/entity"
)

type ArticleRepository interface {
	GetArticles(ctx context.Context, dto domain.GetArticlesInputDTO) (entity.ArticleSlice, error)
}
