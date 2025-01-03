package external

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

type ContentExternal interface {
	GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest) (*cpb.GetFeedsResponse, error)
}

type contentExternal struct {
	cpbClient cpb.ContentServiceClient
}

func NewContentExternal(cc cpb.ContentServiceClient) ContentExternal {
	return &contentExternal{
		cpbClient: cc,
	}
}

func (ce *contentExternal) GetFeeds(ctx context.Context, req *cpb.GetFeedsRequest) (*cpb.GetFeedsResponse, error) {
	res, err := ce.cpbClient.GetFeeds(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
