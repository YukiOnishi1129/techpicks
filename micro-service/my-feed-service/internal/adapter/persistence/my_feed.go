package persistence

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
	"github.com/google/uuid"
)

type MyFeedPersistenceAdapter interface {
	BulkCreateMyFeedAsFolderCreate(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest, mfs entity.MyFeedSlice, folderID string) error

	BulkCreateMyFeedsAsFolderUpdate(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest, mfs entity.MyFeedSlice) error
	BulkDeleteMyFeedsAsFolderUpdate(ctx context.Context, mfs entity.MyFeedSlice, fIDs []string) error
}

type myFeedPersistenceAdapter struct {
	myFeedPersistence repository.MyFeedRepository
}

func NewMyFeedPersistenceAdapter(mfr repository.MyFeedRepository) MyFeedPersistenceAdapter {
	return &myFeedPersistenceAdapter{
		myFeedPersistence: mfr,
	}
}

func (mfp *myFeedPersistenceAdapter) BulkCreateMyFeedAsFolderCreate(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest, mfs entity.MyFeedSlice, folderID string) error {
	for _, fID := range req.GetFeedIdList() {
		isExist := false
		for _, mf := range mfs {
			if mf.FeedID == fID {
				isExist = true
				break
			}
		}
		if !isExist {
			mfID, _ := uuid.NewUUID()
			myFeed := entity.MyFeed{
				ID:             mfID.String(),
				UserID:         req.GetUserId(),
				MyFeedFolderID: folderID,
				FeedID:         fID,
			}
			if err := mfp.myFeedPersistence.CreateMyFeed(ctx, myFeed); err != nil {
				return err
			}
		}
	}

	return nil
}

func (mfp *myFeedPersistenceAdapter) BulkCreateMyFeedsAsFolderUpdate(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest, mfs entity.MyFeedSlice) error {
	for _, fID := range req.GetFeedIdList() {
		isExist := false
		for _, mf := range mfs {
			if mf.FeedID == fID {
				isExist = true
				break
			}
		}
		if !isExist {
			mfID, _ := uuid.NewUUID()
			myFeed := entity.MyFeed{
				ID:             mfID.String(),
				UserID:         req.GetUserId(),
				MyFeedFolderID: req.GetMyFeedFolderId(),
				FeedID:         fID,
			}
			if err := mfp.myFeedPersistence.CreateMyFeed(ctx, myFeed); err != nil {
				return err
			}
		}
	}

	return nil
}

func (mfp *myFeedPersistenceAdapter) BulkDeleteMyFeedsAsFolderUpdate(ctx context.Context, mfs entity.MyFeedSlice, fIDs []string) error {
	deleteMyFeeds := make(entity.MyFeedSlice, 0, len(fIDs))
	for _, fID := range fIDs {
		for _, mf := range mfs {
			if mf.FeedID == fID {
				deleteMyFeeds = append(deleteMyFeeds, mf)
			}
		}
	}
	if err := mfp.myFeedPersistence.BulkDeleteMyFeeds(ctx, deleteMyFeeds); err != nil {
		return err
	}

	return nil
}
