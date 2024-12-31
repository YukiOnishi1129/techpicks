package usecase

import (
	"context"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (m *myUseCase) GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest) (*mfpb.GetMyFeedFoldersResponse, error) {
	limit := 6
	if req.GetLimit() != 0 {
		limit = int(req.GetLimit())
	}

	mffs, err := m.myFeedFolderPersistenceAdapter.GetMyFeedFolders(ctx, req, limit)
	if err != nil {
		return nil, err
	}

	edges := make([]*mfpb.MyFeedFolderEdge, len(mffs))

	for i, mff := range mffs {
		resMff := m.convertPBMyFeedFolder(mff)
		// TODO: fetch feed connect from content service
		edges[i] = &mfpb.MyFeedFolderEdge{
			Cursor: mff.ID,
			Node:   resMff,
		}
	}

	if len(edges) == 0 {
		return &mfpb.GetMyFeedFoldersResponse{
			MyFeedFolderEdges: edges,
			PageInfo: &copb.PageInfo{
				EndCursor:   "",
				HasNextPage: false,
			},
		}, nil
	}

	res := &mfpb.GetMyFeedFoldersResponse{
		MyFeedFolderEdges: edges,
		PageInfo: &copb.PageInfo{
			EndCursor:   edges[len(edges)-1].Cursor,
			HasNextPage: len(edges) == limit,
		},
	}

	return res, nil
}

func (m *myUseCase) CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*mfpb.CreateMyFeedFolderResponse, error) {
	res, err := m.myFeedFolderPersistenceAdapter.CreateMyFeedFolder(ctx, req)
	if err != nil {
		return nil, err
	}

	mff := m.convertPBMyFeedFolder(res)

	return &mfpb.CreateMyFeedFolderResponse{
		MyFeedFolder: mff,
	}, nil
}

func (m *myUseCase) UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*mfpb.UpdateMyFeedFolderResponse, error) {
	res, err := m.myFeedFolderPersistenceAdapter.UpdateMyFeedFolder(ctx, req)
	if err != nil {
		return nil, err
	}

	// bulk delete my feed

	// bulk create my feed

	mff := m.convertPBMyFeedFolder(res)

	return &mfpb.UpdateMyFeedFolderResponse{
		MyFeedFolder: mff,
	}, nil
}

func (m *myUseCase) DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) (*emptypb.Empty, error) {
	// mff := &entity.MyFeedFolder{
	// 	ID: req.GetId(),
	// }

	// if err := m.myFeedFolderPersistenceAdapter.DeleteMyFeedFolder(ctx, mff); err != nil {
	// 	return nil, err
	// }

	return nil, nil
}

func (m *myUseCase) convertPBMyFeedFolder(mff *entity.MyFeedFolder) *mfpb.MyFeedFolder {
	return &mfpb.MyFeedFolder{
		Id:    mff.ID,
		Title: mff.ID,
	}
}
