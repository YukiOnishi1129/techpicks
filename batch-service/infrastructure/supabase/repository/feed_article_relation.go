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

func (farr *FeedArticleRelationRepository) GetFeedArticleRelations(ctx context.Context, dto domain.GetFeedArticleRelationsInputDTO) ([]entity.FeedArticleRelation, error) {
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

	feedArticleRelations := make([]entity.FeedArticleRelation, len(farRow))
	for i, far := range farRow {
		feedArticleRelations[i] = *far

	}

	return feedArticleRelations, nil
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
