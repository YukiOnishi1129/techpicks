package usecase

import (
	"context"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (cu *contentUseCase) GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest) (*cpb.GetFeedsResponse, error) {
	limit := 10
	if req.GetLimit() > 0 {
		limit = int(req.GetLimit())
	}

	feeds, err := cu.feedPersistenceAdapter.GetFeeds(ctx, req, limit)
	if err != nil {
		return nil, err
	}

	edges := make([]*cpb.FeedEdge, len(feeds))

	for i, feed := range feeds {
		res := cu.convertPBFeed(*feed)
		// TODO: fetch my feed data from connecting to my feed service
		res.MyFeedIds = []string{}
		edges[i] = &cpb.FeedEdge{
			Cursor: feed.ID,
			Feed:   res,
		}
	}

	if len(edges) == 0 {
		return &cpb.GetFeedsResponse{
			FeedEdge: edges,
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	res := &cpb.GetFeedsResponse{
		FeedEdge: edges,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(edges) == limit,
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}
	return res, nil
}

func (cu *contentUseCase) GetFeed(ctx context.Context, req *cpb.GetFeedRequest) (*cpb.GetFeedResponse, error) {
	feed, err := cu.feedPersistenceAdapter.GetFeed(ctx, req)
	if err != nil {
		return nil, err
	}

	res := cu.convertPBFeed(feed)
	// TODO: fetch my feed data from connecting to my feed service
	return &cpb.GetFeedResponse{
		Feed: res,
	}, nil
}

func (cu *contentUseCase) convertPBFeed(f entity.Feed) *cpb.Feed {
	feed := &cpb.Feed{
		Id:                f.ID,
		Name:              f.Name,
		Description:       f.Description,
		RssUrl:            f.RSSURL,
		SiteUrl:           f.SiteURL,
		ThumbnailUrl:      f.ThumbnailURL,
		TrendPlatformType: int64(f.TrendPlatformType),
		CreatedAt:         timestamppb.New(f.CreatedAt),
		UpdatedAt:         timestamppb.New(f.UpdatedAt),
	}
	if f.APIQueryParam.Valid {
		feed.ApiQueryParam = wrapperspb.String(f.APIQueryParam.String)
	}
	if f.DeletedAt.Valid {
		feed.DeletedAt = timestamppb.New(f.DeletedAt.Time)
	}
	feed.Platform = cu.convertPBPlatform(*f.R.Platform)
	feed.Category = cu.convertPBCategory(*f.R.Category)
	feed.MyFeedIds = []string{}
	return feed
}
