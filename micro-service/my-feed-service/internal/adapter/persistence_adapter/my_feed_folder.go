package persistenceadapter

import (
	"context"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/repository"
	"github.com/google/uuid"

	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type MyFeedFolderPersistenceAdapter interface {
	GetMyFeedFolders(ctx context.Context, req *mfpb.GetMyFeedFoldersRequest, limit int) (entity.MyFeedFolderSlice, error)
	GetMyFeedFolderByID(ctx context.Context, id string) (*entity.MyFeedFolder, error)
	CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*entity.MyFeedFolder, error)
	UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*entity.MyFeedFolder, error)
	DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) error
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
		qm.Where("my_feed_folders.user_id = ?", req.GetUserId()),
		qm.Load(qm.Rels(entity.MyFeedFolderRels.MyFeeds)),
		qm.OrderBy("my_feed_folders.created_at ASC"),
	}

	if !req.GetIsAllFetch().GetValue() {
		q = append(q, qm.Limit(limit))
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("my_feed_folders.created_at > (SELECT created_at FROM my_feed_folders WHERE id = ?)", req.GetCursor()))
	}

	if req.GetKeyword().GetValue() != "" {
		q = append(q, qm.Expr(
			qm.And("my_feed_folders.title LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
			qm.Or("my_feed_folders.description LIKE ?", "%"+req.GetKeyword().GetValue()+"%"),
		))
	}

	myFeedFolders, err := m.myFeedFolderRepository.GetMyFeedFolders(ctx, q)
	if err != nil {
		return nil, err
	}
	return myFeedFolders, nil
}

func (m *myFeedFolderPersistenceAdapter) GetMyFeedFolderByID(ctx context.Context, id string) (*entity.MyFeedFolder, error) {
	q := []qm.QueryMod{
		qm.Load(qm.Rels(entity.MyFeedFolderRels.MyFeeds)),
	}
	myFeedFolder, err := m.myFeedFolderRepository.GetMyFeedFolderByID(ctx, id, q)
	if err != nil {
		return nil, err
	}
	return &myFeedFolder, nil
}

func (m *myFeedFolderPersistenceAdapter) CreateMyFeedFolder(ctx context.Context, req *mfpb.CreateMyFeedFolderRequest) (*entity.MyFeedFolder, error) {
	myFeedFolderID, _ := uuid.NewUUID()
	mff := &entity.MyFeedFolder{
		ID:     myFeedFolderID.String(),
		UserID: req.GetUserId(),
		Title:  req.GetTitle(),
	}

	if req.GetDescription().GetValue() != "" {
		mff.Description.String = req.GetDescription().GetValue()
	}

	if err := m.myFeedFolderRepository.CreateMyFeedFolder(ctx, *mff); err != nil {
		return nil, err
	}

	q := []qm.QueryMod{
		qm.Load(qm.Rels(entity.MyFeedFolderRels.MyFeeds)),
	}

	res, err := m.myFeedFolderRepository.GetMyFeedFolderByID(ctx, mff.ID, q)
	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (m *myFeedFolderPersistenceAdapter) UpdateMyFeedFolder(ctx context.Context, req *mfpb.UpdateMyFeedFolderRequest) (*entity.MyFeedFolder, error) {
	q := []qm.QueryMod{
		qm.Load(qm.Rels(entity.MyFeedFolderRels.MyFeeds)),
	}
	mff, err := m.myFeedFolderRepository.GetMyFeedFolderByID(ctx, req.GetMyFeedFolderId(), q)
	if err != nil {
		return nil, err
	}

	mff.Title = req.GetTitle()
	if req.GetDescription().GetValue() != "" {
		mff.Description.String = req.GetDescription().GetValue()
	}

	if err = m.myFeedFolderRepository.UpdateMyFeedFolder(ctx, mff); err != nil {
		return nil, err
	}

	return &mff, nil
}

func (m *myFeedFolderPersistenceAdapter) DeleteMyFeedFolder(ctx context.Context, req *mfpb.DeleteMyFeedFolderRequest) error {
	tmff, err := m.myFeedFolderRepository.GetMyFeedFolderByID(ctx, req.GetMyFeedFolderId(), nil)
	if err != nil {
		return err
	}

	if err := m.myFeedFolderRepository.DeleteMyFeedFolder(ctx, tmff); err != nil {
		return err
	}

	return nil
}
