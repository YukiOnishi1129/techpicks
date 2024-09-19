package usecase

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
)

type ContentUseCase interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error)
	CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error)
	GetArticleOGP(ctx context.Context, articleURL string) (*cpb.GetArticleOGPResponse, error)
}

type contentUseCase struct {
	articlePersistenceAdapter persistenceadapter.ArticlePersistenceAdapter
	bookmarkExternalAdapter   externaladapter.BookmarkExternalAdapter
	favoriteExternalAdapter   externaladapter.FavoriteExternalAdapter
}

func NewContentUseCase(apa persistenceadapter.ArticlePersistenceAdapter, bea externaladapter.BookmarkExternalAdapter, fea externaladapter.FavoriteExternalAdapter) ContentUseCase {
	return &contentUseCase{
		articlePersistenceAdapter: apa,
		bookmarkExternalAdapter:   bea,
		favoriteExternalAdapter:   fea,
	}
}
