package repository

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FeedRepositoryInterface interface {
	GetFeeds(ctx context.Context) ([]domain.Feed, error)
	GetFeed(ctx context.Context, id string) (domain.Feed, error)
	CreateFeed(ctx context.Context, arg domain.CreateFeedInputDTO) (feedID string, err error)
	UpdateFeed(ctx context.Context, arg domain.UpdateFeedInputDTO) error
	DeletedFeed(ctx context.Context, id string) error
}

type FeedRepository struct {
	db *sql.DB
}

func NewFeedRepository(db *sql.DB) *FeedRepository {
	return &FeedRepository{db: db}
}

// GetFeeds is a method to get all feeds
func (fr *FeedRepository) GetFeeds(ctx context.Context) ([]domain.Feed, error) {
	fRows, err := entity.Feeds(qm.Where("deleted_at IS NOT NULL")).All(ctx, fr.db)
	if err != nil {
		return nil, err
	}
	resFeeds := make([]domain.Feed, len(fRows))
	for i, f := range fRows {
		resFeeds[i] = convertDBtoFeedDomain(f)
	}
	return nil, nil
}

// GetFeed is a method to get a feed by id
func (fr *FeedRepository) GetFeed(ctx context.Context, id string) (domain.Feed, error) {
	f, err := entity.Feeds(qm.Where("id = ?", id), qm.Where("deleted_at IS NOT NULL")).One(ctx, fr.db)
	if err != nil {
		return domain.Feed{}, err
	}
	return convertDBtoFeedDomain(f), nil
}

// CreateFeed is a method to create a feed
func (fr *FeedRepository) CreateFeed(ctx context.Context, arg domain.CreateFeedInputDTO) (feedID string, err error) {
	f := entity.Feed{
		Name:       arg.Name,
		RSSURL:     arg.RssURL,
		PlatformID: arg.PlatformID,
		CategoryID: arg.CategoryID,
	}
	err = f.Insert(ctx, fr.db, boil.Infer())
	if err != nil {
		return "", err
	}
	return f.ID, nil
}

func convertDBtoFeedDomain(f *entity.Feed) domain.Feed {
	return domain.Feed{
		ID:     f.ID,
		Name:   f.Name,
		RssURL: f.RSSURL,
		Platform: domain.Platform{
			ID:           f.R.Platform.ID,
			Title:        f.R.Platform.Title,
			SiteURL:      f.R.Platform.SiteURL,
			PlatformType: domain.PlatformType(f.R.Platform.PlatformType),
			IsEng:        f.R.Platform.IsEng,
			CreatedAt:    f.R.Platform.CreatedAt,
			UpdatedAt:    f.R.Platform.UpdatedAt,
		},
		Category: domain.Category{
			ID:        f.R.Category.ID,
			Name:      f.R.Category.Name,
			Type:      f.R.Category.Type,
			CreatedAt: f.R.Category.CreatedAt,
			UpdatedAt: f.R.Category.UpdatedAt,
		},
		CreatedAt: f.CreatedAt,
		UpdatedAt: f.UpdatedAt,
	}
}
