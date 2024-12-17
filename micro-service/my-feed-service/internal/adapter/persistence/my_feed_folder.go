package persistence

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"

	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type MyFeedFolderPersistenceAdapter interface {
	GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest, limit int) (entity.MyFeedFolderSlice, error)
}

type myFeedFolderPersistenceAdapter struct {
	myFeedFolderRepository repository.MyFeedFolderRepository
}

func NewMyFeedFolderPersistenceAdapter(mffr repository.MyFeedFolderRepository) MyFeedFolderPersistenceAdapter {
	return &myFeedFolderPersistenceAdapter{
		myFeedFolderRepository: mffr,
	}
}

func (m *myFeedFolderPersistenceAdapter) GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest, limit int) (entity.MyFeedFolderSlice, error) {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", req.GetUserId()),
		qm.Load(qm.Rels(entity.MyFeedFolderRels.MyFeeds)),
		qm.OrderBy("created_at ASC"),
		qm.Limit(limit),
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("created_at > (SELECT created_at FROM my_feed_folders WHERE id = ?)", req.GetCursor()))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("name LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}

	myFeedFolders, err := m.myFeedFolderRepository.GetMyFeedFolders(ctx, q)
	if err != nil {
		return nil, err
	}
	return myFeedFolders, nil
}
