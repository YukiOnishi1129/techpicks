package usecase

import (
	"context"

	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
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

func (m *myUseCase) convertPBMyFeedFolder(mff *entity.MyFeedFolder) *mfpb.MyFeedFolder {
	return &mfpb.MyFeedFolder{
		Id:    mff.ID,
		Title: mff.ID,
	}
}
