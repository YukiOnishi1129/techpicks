package usecase

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/emptypb"
)

type ContentUseCase interface {
	ListArticle(ctx context.Context, req *cpb.ListArticleRequest) (*cpb.ListArticleResponse, error)
	ListArticleByArticleURL(ctx context.Context, req *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error)
	CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error)

	GetArticleOGP(ctx context.Context, articleURL string) (*cpb.GetArticleOGPResponse, error)

	GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest) (*cpb.GetFeedsResponse, error)
	GetFeed(ctx context.Context, req *cpb.GetFeedRequest) (*cpb.GetFeedResponse, error)

	UpsertArticleComment(ctx context.Context, req *cpb.UpsertArticleCommentRequest) (*cpb.UpsertArticleCommentResponse, error)
	DeleteArticleComment(ctx context.Context, req *cpb.DeleteArticleCommentRequest) (*emptypb.Empty, error)
}

type contentUseCase struct {
	articlePersistenceAdapter        persistenceadapter.ArticlePersistenceAdapter
	feedPersistenceAdapter           persistenceadapter.FeedPersistenceAdapter
	articleCommentPersistenceAdapter persistenceadapter.ArticleCommentPersistenceAdapter
	bookmarkExternalAdapter          externaladapter.BookmarkExternalAdapter
	favoriteExternalAdapter          externaladapter.FavoriteExternalAdapter
}

func NewContentUseCase(
	apa persistenceadapter.ArticlePersistenceAdapter,
	fpa persistenceadapter.FeedPersistenceAdapter,
	acpa persistenceadapter.ArticleCommentPersistenceAdapter,
	bea externaladapter.BookmarkExternalAdapter,
	fea externaladapter.FavoriteExternalAdapter) ContentUseCase {
	return &contentUseCase{
		articlePersistenceAdapter:        apa,
		feedPersistenceAdapter:           fpa,
		articleCommentPersistenceAdapter: acpa,
		bookmarkExternalAdapter:          bea,
		favoriteExternalAdapter:          fea,
	}
}
