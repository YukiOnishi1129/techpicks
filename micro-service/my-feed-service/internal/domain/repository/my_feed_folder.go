package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type MyFeedFolderRepository interface {
	GetMyFeedFolders(ctx context.Context, q []qm.QueryMod) (entity.MyFeedFolderSlice, error)
	GetMyFeedFolderByID(ctx context.Context, id string) (entity.MyFeedFolder, error)
	CreateMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error
	UpdateMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error
	DeleteMyFeedFolder(ctx context.Context, mff entity.MyFeedFolder) error
}
