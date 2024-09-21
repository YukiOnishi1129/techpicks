package usecase

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/emptypb"
)

type FavoriteUseCase interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	GetFavoriteArticleFoldersByArticleId(ctx context.Context, req *fpb.GetFavoriteArticleFoldersByArticleIdRequest) (*fpb.GetFavoriteArticleFoldersResponse, error)
	GetFavoriteArticleFolderByID(ctx context.Context, req *fpb.GetFavoriteArticleFolderByIdRequest) (*fpb.GetFavoriteArticleFolderResponse, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (*fpb.CreateFavoriteArticleFolderResponse, error)
	UpdateFavoriteArticleFolder(ctx context.Context, req *fpb.UpdateFavoriteArticleFolderRequest) (*fpb.UpdateFavoriteArticleFolderResponse, error)
	DeleteFavoriteArticleFolder(ctx context.Context, req *fpb.DeleteFavoriteArticleFolderRequest) (*emptypb.Empty, error)

	GetFavoriteArticles(ctx context.Context, req *fpb.GetFavoriteArticlesRequest) (*fpb.GetFavoriteArticlesResponse, error)
	CreateFavoriteArticle(ctx context.Context, req *fpb.CreateFavoriteArticleRequest) (*fpb.CreateFavoriteArticleResponse, error)
	CreateFavoriteArticleForUploadArticle(ctx context.Context, req *fpb.CreateFavoriteArticleForUploadArticleRequest) (*fpb.CreateFavoriteArticleResponse, error)
	DeleteFavoriteArticle(ctx context.Context, req *fpb.DeleteFavoriteArticleRequest) (*emptypb.Empty, error)
	DeleteFavoriteArticlesByArticleID(ctx context.Context, req *fpb.DeleteFavoriteArticleByArticleIdRequest) (*emptypb.Empty, error)
}

type favoriteUseCase struct {
	favoriteArticleFolderPersistenceAdapter persistenceadapter.FavoriteArticleFolderPersistenceAdapter
	favoriteArticlePersistenceAdapter       persistenceadapter.FavoriteArticlePersistenceAdapter
	contentExternalAdapter                  externaladapter.ContentExternalAdapter
}

func NewFavoriteUseCase(fafpa persistenceadapter.FavoriteArticleFolderPersistenceAdapter, fapa persistenceadapter.FavoriteArticlePersistenceAdapter, cea externaladapter.ContentExternalAdapter) FavoriteUseCase {
	return &favoriteUseCase{
		favoriteArticleFolderPersistenceAdapter: fafpa,
		favoriteArticlePersistenceAdapter:       fapa,
		contentExternalAdapter:                  cea,
	}
}
