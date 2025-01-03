package usecase

import (
	"context"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
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
		resMff, err := m.convertPBMyFeedFolder(mff)
		if err != nil {
			return nil, err
		}
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

	if req.GetIsAllFetch().GetValue() {
		return &mfpb.GetMyFeedFoldersResponse{
			MyFeedFolderEdges: edges,
			PageInfo: &copb.PageInfo{
				EndCursor:   edges[len(edges)-1].Cursor,
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

	resMff, err := m.convertPBMyFeedFolder(mff)
	if err != nil {
		return nil, err
	}
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

		mff, err := m.convertPBMyFeedFolder(resMff)
		if err != nil {
			return err
		}
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
		mff, err := m.convertPBMyFeedFolder(resMff)
		if err != nil {
			return err
		}
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

func (m *myUseCase) convertPBMyFeedFolder(mff *entity.MyFeedFolder) (*mfpb.MyFeedFolder, error) {
	resMfRPC := &mfpb.MyFeedFolder{
		Id:        mff.ID,
		UserId:    mff.UserID,
		Title:     mff.Title,
		CreatedAt: timestamppb.New(mff.CreatedAt),
		UpdatedAt: timestamppb.New(mff.UpdatedAt),
	}
	if mff.Description.Valid {
		resMfRPC.Description = wrapperspb.String(mff.Description.String)
	}

	if mff.R != nil && len(mff.R.MyFeeds) > 0 {
		fIDs := make([]*wrapperspb.StringValue, len(mff.R.MyFeeds))
		for i, mf := range mff.R.MyFeeds {
			fIDs[i] = &wrapperspb.StringValue{
				Value: mf.FeedID,
			}
		}
		resFeeds, err := m.contentExternalAdapter.GetFeeds(context.Background(), &cpb.GetFeedsRequest{
			FeedIds: fIDs,
			IsAllFetch: &wrapperspb.BoolValue{
				Value: true,
			},
		})
		if err != nil {
			return nil, err
		}

		feedEdge := make([]*cpb.Feed, len(resFeeds.FeedEdge))
		for i, f := range resFeeds.FeedEdge {
			feedEdge[i] = f.Feed
		}

		resMfRPC.Feeds = feedEdge

	}
	return resMfRPC, nil
}
