package usecase

import (
	"context"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/wrapperspb"
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

func (m *myUseCase) GetMyFeedFolder(ctx context.Context, req *mfpb.GetMyFeedFolderRequest) (*mfpb.GetMyFeedFolderResponse, error) {
	mff, err := m.myFeedFolderPersistenceAdapter.GetMyFeedFolderByID(ctx, req.GetMyFeedFolderId())
	if err != nil {
		return nil, err
	}

	resMff := m.convertPBMyFeedFolder(mff)
	res := &mfpb.GetMyFeedFolderResponse{
		MyFeedFolder: resMff,
	}
	return res, nil
}

func (m *myUseCase) CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*mfpb.CreateMyFeedFolderResponse, error) {
	resRPC := &mfpb.CreateMyFeedFolderResponse{}
	if err := m.transactionPersistenceAdapter.RunInTx(ctx, func(ctx context.Context) error {
		res, err := m.myFeedFolderPersistenceAdapter.CreateMyFeedFolder(ctx, req)
		if err != nil {
			return err
		}

		// bulk create my feed
		if err = m.myFeedPersistenceAdapter.BulkCreateMyFeedAsFolderCreate(ctx, req, res.R.MyFeeds, res.ID); err != nil {
			return err
		}

		resMff, err := m.myFeedFolderPersistenceAdapter.GetMyFeedFolderByID(ctx, res.ID)
		if err != nil {
			return err
		}

		mff := m.convertPBMyFeedFolder(resMff)
		resRPC.MyFeedFolder = mff
		return nil

	}); err != nil {
		return nil, err
	}

	return resRPC, nil
}

func (m *myUseCase) UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*mfpb.UpdateMyFeedFolderResponse, error) {
	resRPC := &mfpb.UpdateMyFeedFolderResponse{}
	if err := m.transactionPersistenceAdapter.RunInTx(ctx, func(ctx context.Context) error {
		res, err := m.myFeedFolderPersistenceAdapter.UpdateMyFeedFolder(ctx, req)
		if err != nil {
			return err
		}

		// bulk delete my feed
		if err = m.myFeedPersistenceAdapter.BulkDeleteMyFeedsAsFolderUpdate(ctx, res.R.MyFeeds, req.GetFeedIdList()); err != nil {
			return err
		}

		// bulk create my feed
		if err = m.myFeedPersistenceAdapter.BulkCreateMyFeedsAsFolderUpdate(ctx, req, res.R.MyFeeds); err != nil {
			return err
		}

		resMff, err := m.myFeedFolderPersistenceAdapter.GetMyFeedFolderByID(ctx, res.ID)
		if err != nil {
			return err
		}
		mff := m.convertPBMyFeedFolder(resMff)
		resRPC.MyFeedFolder = mff
		return nil
	}); err != nil {
		return nil, err
	}

	return resRPC, nil
}

func (m *myUseCase) DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) (*emptypb.Empty, error) {
	if err := m.transactionPersistenceAdapter.RunInTx(ctx, func(ctx context.Context) error {
		res, err := m.myFeedFolderPersistenceAdapter.GetMyFeedFolderByID(ctx, req.GetMyFeedFolderId())
		if err != nil {
			return err
		}

		// bulk delete my feed
		if err = m.myFeedPersistenceAdapter.BulkDeleteMyFeedsAsFolderDelete(ctx, res.R.MyFeeds, req.GetMyFeedFolderId()); err != nil {
			return err
		}
		return nil
	}); err != nil {
		return nil, err
	}

	return nil, nil
}

func (m *myUseCase) convertPBMyFeedFolder(mff *entity.MyFeedFolder) *mfpb.MyFeedFolder {
	resMfRPC := &mfpb.MyFeedFolder{
		Id:    mff.ID,
		Title: mff.Title,
	}
	if mff.Description.Valid {
		resMfRPC.Description = wrapperspb.String(mff.Description.String)
	}
	// if mff.R != nil && len(mff.R.MyFeeds) > 0 {
	// 	// TODO: fetch feed connect from content service

	// }
	return resMfRPC
}
