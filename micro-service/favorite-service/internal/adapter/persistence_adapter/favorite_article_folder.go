package persistenceadapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticleFolderPersistenceAdapter interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (entity.FavoriteArticleFolderSlice, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error)
}

type favoriteArticleFolderPersistenceAdapter struct {
	favoriteArticleFolderRepository repository.FavoriteArticleFolderRepository
}

func NewFavoriteArticleFolderPersistenceAdapter(fr repository.FavoriteArticleFolderRepository) FavoriteArticleFolderPersistenceAdapter {
	return &favoriteArticleFolderPersistenceAdapter{
		favoriteArticleFolderRepository: fr,
	}
}

func (fafa *favoriteArticleFolderPersistenceAdapter) GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (entity.FavoriteArticleFolderSlice, error) {
	limit := 9
	if req.GetLimit() != nil {
		limit = int(req.GetLimit().GetValue())
	}

	q := []qm.QueryMod{
		qm.Where("favorite_article_folders.user_id = ?", req.GetUserId()),
		qm.GroupBy("favorite_article_folders.id"),
		qm.OrderBy("favorite_article_folders.created_at DESC"),
		qm.Limit(limit),
	}

	if req.GetCursor() != nil {
		q = append(q, qm.Where("favorite_article_folders.created_at < (SELECT created_at FROM favorite_article_folders WHERE id = ?)", req.GetCursor().GetValue()))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("favorite_article_folders.title LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("favorite_article_folders.description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}
	favoriteArticleFolders, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolders(ctx, q)
	if err != nil {
		return nil, err
	}

	return favoriteArticleFolders, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error) {
	favoriteFolderID, _ := uuid.NewUUID()
	faf := entity.FavoriteArticleFolder{
		ID:     favoriteFolderID.String(),
		UserID: req.GetUserId(),
		Title:  req.GetTitle(),
		Description: null.String{
			Valid:  true,
			String: req.GetDescription(),
		},
	}

	err := fafa.favoriteArticleFolderRepository.CreateFavoriteArticleFolder(ctx, faf)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	f, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolderByID(ctx, favoriteFolderID.String(), nil)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	return f, nil
}
