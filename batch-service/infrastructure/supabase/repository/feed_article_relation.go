package repository

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FeedArticleRelationRepositoryInterface interface {
	GetFeedArticleRelations(ctx context.Context, dto domain.GetFeedArticleRelationsInputDTO) ([]domain.FeedArticleRelation, error)
	GetFeedArticleRelation(ctx context.Context, id string) (domain.FeedArticleRelation, error)
	CreateFeedArticleRelation(ctx context.Context, arg domain.CreateFeedArticleRelationInputDTO) (feedArticleRelationID string, err error)
	DeleteFeedArticleRelation(ctx context.Context, id string) error
}

type FeedArticleRelationRepository struct {
	db *sql.DB
}

func NewFeedArticleRelationRepository(db *sql.DB) *FeedArticleRelationRepository {
	return &FeedArticleRelationRepository{db: db}
}

func (farr *FeedArticleRelationRepository) GetFeedArticleRelations(ctx context.Context, dto domain.GetFeedArticleRelationsInputDTO) ([]domain.FeedArticleRelation, error) {
	q := make([]qm.QueryMod, 0)
	if dto.FeedID != nil {
		q = append(q, qm.Where("feed_id = ?", *dto.FeedID))
	}
	if dto.ArticleID != nil {
		q = append(q, qm.Where("article_id = ?", *dto.ArticleID))
	}
	farRow, err := entity.FeedArticleRelations(q...).All(ctx, farr.db)
	if err != nil {
		return nil, err
	}
	resFeedArticleRelations := make([]domain.FeedArticleRelation, len(farRow))
	for i, far := range farRow {
		resFeedArticleRelations[i] = convertDBtoFeedArticleRelationDomain(far)
	}
	return resFeedArticleRelations, nil
}

func (farr *FeedArticleRelationRepository) GetFeedArticleRelation(ctx context.Context, id string) (domain.FeedArticleRelation, error) {
	return domain.FeedArticleRelation{}, nil
}

func (farr *FeedArticleRelationRepository) CreateFeedArticleRelation(ctx context.Context, arg domain.CreateFeedArticleRelationInputDTO) (feedArticleRelationID string, err error) {
	return "", nil
}

func (farr *FeedArticleRelationRepository) DeleteFeedArticleRelation(ctx context.Context, id string) error {
	return nil
}

func convertDBtoFeedArticleRelationDomain(far *entity.FeedArticleRelation) domain.FeedArticleRelation {
	return domain.FeedArticleRelation{
		ID: far.ID,
		Feed: domain.Feed{
			ID:     far.R.Feed.ID,
			Name:   far.R.Feed.Name,
			RssURL: far.R.Feed.RSSURL.String,
			Platform: domain.Platform{
				ID:           far.R.Feed.R.Platform.ID,
				Name:         far.R.Feed.R.Platform.Name,
				SiteURL:      far.R.Feed.R.Platform.SiteURL,
				PlatformType: domain.PlatformType(far.R.Feed.R.Platform.PlatformType),
				IsEng:        far.R.Feed.R.Platform.IsEng,
				FaviconURL:   far.R.Feed.R.Platform.FaviconURL,
				CreatedAt:    far.R.Feed.R.Platform.CreatedAt,
				UpdatedAt:    far.R.Feed.R.Platform.UpdatedAt,
			},
			Category: domain.Category{
				ID:        far.R.Feed.R.Category.ID,
				Name:      far.R.Feed.R.Category.Name,
				Type:      domain.CategoryType(far.R.Feed.R.Category.Type),
				CreatedAt: far.R.Feed.R.Category.CreatedAt,
				UpdatedAt: far.R.Feed.R.Category.UpdatedAt,
			},
		},
		Article: domain.Article{
			ID:           far.R.Article.ID,
			Title:        far.R.Article.Title,
			Description:  far.R.Article.Description,
			ThumbnailURL: far.R.Article.ThumbnailURL,
			ArticleURL:   far.R.Article.ArticleURL,
			PublishedAt:  far.R.Article.PublishedAt,
			IsPrivate:    far.R.Article.IsPrivate,
			CreatedAt:    far.R.Article.CreatedAt,
			UpdatedAt:    far.R.Article.UpdatedAt,
		},
		CreatedAt: far.CreatedAt,
		UpdatedAt: far.UpdatedAt,
	}
}
