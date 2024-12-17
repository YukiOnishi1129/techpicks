package usecase

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/adapter/persistence"
)

type MyUseCase interface {
	GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error)
}

type myUseCase struct {
	myFeedFolderPersistenceAdapter persistenceadapter.MyFeedFolderPersistenceAdapter
}

func NewMyUseCase(mffpa persistenceadapter.MyFeedFolderPersistenceAdapter) MyUseCase {
	return &myUseCase{
		myFeedFolderPersistenceAdapter: mffpa,
	}
}
