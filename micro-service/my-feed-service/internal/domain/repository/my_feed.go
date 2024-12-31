package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type MyFeedRepository interface {
	GetMyFeeds(ctx context.Context, q []qm.QueryMod) (entity.MyFeedSlice, error)
	GetMyFeedByID(ctx context.Context, id string, q []qm.QueryMod) (entity.MyFeed, error)
	CreateMyFeed(ctx context.Context, mf entity.MyFeed) error
	UpdateMyFeed(ctx context.Context, mf entity.MyFeed) error
	DeleteMyFeed(ctx context.Context, mf entity.MyFeed) error

	BulkDeleteMyFeeds(ctx context.Context, mfs entity.MyFeedSlice) error
}
