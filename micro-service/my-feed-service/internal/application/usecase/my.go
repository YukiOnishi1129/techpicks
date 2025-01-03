package usecase

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	externalAdapter "github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/emptypb"
)

type MyUseCase interface {
	GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error)
	GetMyFeedFolder(ctx context.Context, req *mfpb.GetMyFeedFolderRequest) (*mfpb.GetMyFeedFolderResponse, error)
	CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*mfpb.CreateMyFeedFolderResponse, error)
	UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*mfpb.UpdateMyFeedFolderResponse, error)
	DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) (*emptypb.Empty, error)
}

type myUseCase struct {
	transactionPersistenceAdapter  persistenceadapter.TransactionPersistenceAdapter
	myFeedFolderPersistenceAdapter persistenceadapter.MyFeedFolderPersistenceAdapter
	myFeedPersistenceAdapter       persistenceadapter.MyFeedPersistenceAdapter
	contentExternalAdapter         externalAdapter.ContentExternalAdapter
}

func NewMyUseCase(tpa persistenceadapter.TransactionPersistenceAdapter, mffpa persistenceadapter.MyFeedFolderPersistenceAdapter, mfpa persistenceadapter.MyFeedPersistenceAdapter, cxpa externalAdapter.ContentExternalAdapter) MyUseCase {
	return &myUseCase{
		transactionPersistenceAdapter:  tpa,
		myFeedFolderPersistenceAdapter: mffpa,
		myFeedPersistenceAdapter:       mfpa,
		contentExternalAdapter:         cxpa,
	}
}
