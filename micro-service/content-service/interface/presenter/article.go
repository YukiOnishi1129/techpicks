package presenter

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/usecase"
)

type articlePresenter struct {
	articleUseCase usecase.ArticleUseCase
}

func NewArticlePresenter(au usecase.ArticleUseCase) cpb.ArticleServiceServer {
	return &articlePresenter{
		articleUseCase: au,
	}
}

func (ap *articlePresenter) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	res, err := ap.articleUseCase.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
