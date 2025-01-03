package handler

import (
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
