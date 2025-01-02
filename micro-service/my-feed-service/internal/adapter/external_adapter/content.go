package externaladapter

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/infrastructure/external"
)

type ContentExternalAdapter interface {
	GetAllFeeds(ctx context.Context, req *cpb.GetAllFeedsRequest) (*cpb.GetFeedsResponse, error)
}

type contentExternalAdapter struct {
	contentExternal external.ContentExternal
}

func NewContentExternalAdapter(ce external.ContentExternal) ContentExternalAdapter {
	return &contentExternalAdapter{
		contentExternal: ce,
	}
}

func (cea *contentExternalAdapter) GetAllFeeds(ctx context.Context, req *cpb.GetAllFeedsRequest) (*cpb.GetFeedsResponse, error) {
	res, err := cea.contentExternal.GetAllFeeds(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
