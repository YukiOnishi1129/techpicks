package usecase

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/adapter/persistence"
	"google.golang.org/protobuf/types/known/emptypb"
)

type MyUseCase interface {
	GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error)
	CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*mfpb.CreateMyFeedFolderResponse, error)
	UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*mfpb.UpdateMyFeedFolderResponse, error)
	DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) (*emptypb.Empty, error)
}

type myUseCase struct {
	transactionPersistenceAdapter  persistenceadapter.TransactionPersistenceAdapter
	myFeedFolderPersistenceAdapter persistenceadapter.MyFeedFolderPersistenceAdapter
}

func NewMyUseCase(tpa persistenceadapter.TransactionPersistenceAdapter, mffpa persistenceadapter.MyFeedFolderPersistenceAdapter) MyUseCase {
	return &myUseCase{
		transactionPersistenceAdapter:  tpa,
		myFeedFolderPersistenceAdapter: mffpa,
	}
}
