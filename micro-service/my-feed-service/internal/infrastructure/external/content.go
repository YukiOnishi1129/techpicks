package external

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
)

type ContentExternal interface {
	GetAllFeeds(ctx context.Context, req *cpb.GetAllFeedsRequest) (*cpb.GetFeedsResponse, error)
}

type contentExternal struct {
	cpbClient cpb.ContentServiceClient
}

func NewContentExternal(cc cpb.ContentServiceClient) ContentExternal {
	return &contentExternal{
		cpbClient: cc,
	}
}

func (ce *contentExternal) GetAllFeeds(ctx context.Context, req *cpb.GetAllFeedsRequest) (*cpb.GetFeedsResponse, error) {
	res, err := ce.cpbClient.GetAllFeeds(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
