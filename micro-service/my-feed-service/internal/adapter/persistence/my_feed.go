package persistence

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
	"github.com/google/uuid"
)

type MyFeedPersistenceAdapter interface {
	BulkCreateMyFeed(ctx context.Context, dto BulkCreateMyFeedInputDto) (entity.MyFeedSlice, error)

	BulkDeleteMyFeedsAsUpdate8(ctx context.Context, mfs entity.MyFeedSlice, fIDs []string) error
}

type myFeedPersistenceAdapter struct {
	myFeedPersistence repository.MyFeedRepository
}

func NewMyFeedPersistenceAdapter(mfr repository.MyFeedRepository) MyFeedPersistenceAdapter {
	return &myFeedPersistenceAdapter{
		myFeedPersistence: mfr,
	}
}

func (mfp *myFeedPersistenceAdapter) BulkCreateMyFeed(ctx context.Context, dto BulkCreateMyFeedInputDto) (entity.MyFeedSlice, error) {

	myFeeds := make(entity.MyFeedSlice, 0, len(dto.FeedIDs))
	for _, fID := range dto.FeedIDs {
		mfID, _ := uuid.NewUUID()
		myFeed := entity.MyFeed{
			ID:             mfID.String(),
			FeedID:         fID,
			MyFeedFolderID: dto.MyFeedFolderID,
			UserID:         dto.UserID,
		}
		myFeeds = append(myFeeds, &myFeed)
	}

	// if err := mfp.myFeedPersistence.BulkCreateMyFeed(ctx, myFeeds); err != nil {
	// 	return nil, err
	// }

	return myFeeds, nil
}


func (mfp *myFeedPersistenceAdapter) BulkDeleteMyFeedsAsUpdate8(ctx context.Context, mfs entity.MyFeedSlice, fIDs []string) error {
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
