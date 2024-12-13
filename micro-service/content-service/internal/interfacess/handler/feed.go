package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
)

func (ch *contentHandler) GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest) (*cpb.GetFeedsResponse, error) {
	res, err := ch.contentUseCase.GetFeeds(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (ch *contentHandler) GetFeed(ctx context.Context, req *cpb.GetFeedRequest) (*cpb.GetFeedResponse, error) {
	res, err := ch.contentUseCase.GetFeed(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
