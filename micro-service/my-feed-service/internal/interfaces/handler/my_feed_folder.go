package handler

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (m *myHandler) GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error) {
	res, err := m.myUseCase.GetMyFeedFolders(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (m *myHandler) GetMyFeedFolder(ctx context.Context, req *mfpb.GetMyFeedFolderRequest) (*mfpb.GetMyFeedFolderResponse, error) {
	// res, err := m.myUseCase.GetMyFeedFolderByID(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}

func (m *myHandler) CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*mfpb.CreateMyFeedFolderResponse, error) {
	res, err := m.myUseCase.CreateMyFeedFolder(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (m *myHandler) UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*mfpb.UpdateMyFeedFolderResponse, error) {
	// res, err := m.myUseCase.UpdateMyFeedFolder(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}

func (m *myHandler) DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) (*emptypb.Empty, error) {
	// res, err := m.myUseCase.DeleteMyFeedFolder(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}
