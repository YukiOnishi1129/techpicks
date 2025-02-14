package persistenceadapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FavoriteArticleFolderPersistenceAdapter interface {
	GetFavoriteArticleFolders(ctx context.Context, req *fpb.GetFavoriteArticleFoldersRequest) (entity.FavoriteArticleFolderSlice, error)
	GetFavoriteArticleFoldersByIds(ctx context.Context, ids []string) (entity.FavoriteArticleFolderSlice, error)
	GetFavoriteArticleFolderByID(ctx context.Context, id, userID string, isFolderOnly *bool) (entity.FavoriteArticleFolder, error)
	CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error)
	UpdateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder, req *fpb.UpdateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error)
	DeleteFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error
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
	q := []qm.QueryMod{
		qm.Where("favorite_article_folders.user_id = ?", req.GetUserId()),
		qm.GroupBy("favorite_article_folders.id"),
		qm.OrderBy("favorite_article_folders.title ASC"),
	}

	if !req.GetIsAllFetch().GetValue() {
		limit := 9
		if req.GetLimit() != nil {
			limit = int(req.GetLimit().GetValue())
		}
		q = append(q, qm.Limit(limit))
	}

	if req.GetCursor() != nil {
		q = append(q, qm.Where("favorite_article_folders.title > (SELECT title FROM favorite_article_folders WHERE id = ?)", req.GetCursor().GetValue()))
	}

	if req.GetKeywords() != nil {
		for _, keyword := range req.GetKeywords() {
			q = append(q, qm.Expr(
				qm.And("favorite_article_folders.title ILIKE ?", "%"+keyword.GetValue()+"%"),
				qm.Or("favorite_article_folders.description ILIKE ?", "%"+keyword.GetValue()+"%"),
			))
		}
	}
	favoriteArticleFolders, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolders(ctx, q)
	if err != nil {
		return nil, err
	}

	return favoriteArticleFolders, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) GetFavoriteArticleFoldersByIds(ctx context.Context, ids []string) (entity.FavoriteArticleFolderSlice, error) {
	whereIds := make([]interface{}, len(ids))
	for i, id := range ids {
		whereIds[i] = id
	}
	q := []qm.QueryMod{
		qm.WhereIn("id IN ?", whereIds...),
		qm.GroupBy("id"),
	}

	favoriteArticleFolders, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolders(ctx, q)
	if err != nil {
		return nil, err
	}

	return favoriteArticleFolders, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) GetFavoriteArticleFolderByID(ctx context.Context, id, userID string, isFolderOnly *bool) (entity.FavoriteArticleFolder, error) {
	q := []qm.QueryMod{
		qm.Where("favorite_article_folders.user_id = ?", userID),
	}

	if isFolderOnly != nil && *isFolderOnly {
		q = append(q, qm.Load(qm.Rels(entity.FavoriteArticleFolderRels.FavoriteArticles)))
	}

	f, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolderByID(ctx, id, q)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	return f, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) CreateFavoriteArticleFolder(ctx context.Context, req *fpb.CreateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error) {
	favoriteFolderID, _ := uuid.NewUUID()
	faf := entity.FavoriteArticleFolder{
		ID:     favoriteFolderID.String(),
		UserID: req.GetUserId(),
		Title:  req.GetTitle(),
	}

	if req.GetDescription() != nil {
		faf.Description = null.String{
			Valid:  true,
			String: req.GetDescription().GetValue(),
		}
	}

	err := fafa.favoriteArticleFolderRepository.CreateFavoriteArticleFolder(ctx, faf)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	// f, err := fafa.favoriteArticleFolderRepository.GetFavoriteArticleFolderByID(ctx, favoriteFolderID.String(), nil)
	// if err != nil {
	// 	return entity.FavoriteArticleFolder{}, err
	// }

	return faf, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) UpdateFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder, req *fpb.UpdateFavoriteArticleFolderRequest) (entity.FavoriteArticleFolder, error) {
	f.Title = req.GetTitle()
	if req.GetDescription() != nil {
		f.Description = null.String{
			Valid:  true,
			String: req.GetDescription().GetValue(),
		}
	}

	err := fafa.favoriteArticleFolderRepository.UpdateFavoriteArticleFolder(ctx, f)
	if err != nil {
		return entity.FavoriteArticleFolder{}, err
	}

	return f, nil
}

func (fafa *favoriteArticleFolderPersistenceAdapter) DeleteFavoriteArticleFolder(ctx context.Context, f entity.FavoriteArticleFolder) error {
	err := fafa.favoriteArticleFolderRepository.DeleteFavoriteArticleFolder(ctx, f)
	if err != nil {
		return err
	}

	return nil
}
