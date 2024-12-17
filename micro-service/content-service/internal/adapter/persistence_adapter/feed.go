package persistenceadapter

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FeedPersistenceAdapter interface {
	GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest, limit int) (entity.FeedSlice, error)
	GetFeed(ctx context.Context, req *cpb.GetFeedRequest) (entity.Feed, error)
}

type feedPersistenceAdapter struct {
	feedRepository repository.FeedRepository
}

func NewFeedPersistenceAdapter(feedRepository repository.FeedRepository) FeedPersistenceAdapter {
	return &feedPersistenceAdapter{
		feedRepository: feedRepository,
	}
}

func (fpa *feedPersistenceAdapter) GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest, limit int) (entity.FeedSlice, error) {
	q := []qm.QueryMod{
		qm.Where("feeds.deleted_at IS NULL"),
		qm.Load(qm.Rels(entity.FeedRels.Platform)),
		qm.Load(qm.Rels(entity.FeedRels.Category)),
		qm.OrderBy("feeds.created_at ASC"),
		qm.Limit(limit),
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("feeds.created_at > (SELECT created_at FROM feeds WHERE id = ?)", req.GetCursor()))
	}

	if req.GetPlatformSiteType().GetValue() != 0 {
		switch {
		case req.GetPlatformSiteType().GetValue() == 1:
			q = append(q, qm.Where("platforms.site_type = ?", 1))
		case req.GetPlatformSiteType().GetValue() == 2:
			q = append(q, qm.Where("platforms.site_type = ?", 2))
		case req.GetPlatformSiteType().GetValue() == 3:
			q = append(q, qm.Where("platforms.site_type = ?", 3))
		}
	}

	if req.GetPlatformId().GetValue() != "" {
		q = append(q, qm.Where("platforms.id = ?", req.GetPlatformId().GetValue()))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("name LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}

	feeds, err := fpa.feedRepository.GetFeeds(ctx, q)
	if err != nil {
		return nil, err
	}

	return feeds, nil
}

func (fpa *feedPersistenceAdapter) GetFeed(ctx context.Context, req *cpb.GetFeedRequest) (entity.Feed, error) {
	q := []qm.QueryMod{
		qm.Where("deleted_at IS NULL"),
		qm.Load(qm.Rels(entity.FeedRels.Platform)),
		qm.Load(qm.Rels(entity.FeedRels.Category)),
	}

	if req.GetFeedId() != "" {
		q = append(q, qm.Where("id = ?", req.GetFeedId()))
	}

	feed, err := fpa.feedRepository.GetFeed(ctx, q)
	if err != nil {
		return entity.Feed{}, err
	}

	return feed, nil
}
