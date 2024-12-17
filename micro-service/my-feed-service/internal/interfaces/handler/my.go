package handler

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/application/usecase"
)

type myHandler struct {
	myUseCase usecase.MyUseCase
}

func NewMyHandler(mfu usecase.MyUseCase) mfpb.MyFeedServiceServer {
	return &myHandler{
		myUseCase: mfu,
	}
}

func (m *myHandler) GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error) {
	res, err := m.myUseCase.GetMyFeedFolders(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
