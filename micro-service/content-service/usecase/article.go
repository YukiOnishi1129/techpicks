package usecase

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/repository"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
)

type ArticleUseCase interface {
	GetArticles(ctx context.Context, res *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error)
}

type articleUseCase struct {
	articleRepository repository.ArticleRepository
}

func NewArticleUseCase(ar repository.ArticleRepository) ArticleUseCase {
	return &articleUseCase{
		articleRepository: ar,
	}
}

func (au *articleUseCase) GetArticles(ctx context.Context, res *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	dto := domain.GetArticlesInputDTO{
		Limit:  res.Limit,
		Cursor: res.Cursor,
		// LanguageStatus: input.LanguageStatus,
		// Tag:            input.Tag,
	}

	articles, err := au.articleRepository.GetArticles(ctx, dto)
	if err != nil {
		return nil, err
	}
	println(len(articles))
	return nil, nil
}
