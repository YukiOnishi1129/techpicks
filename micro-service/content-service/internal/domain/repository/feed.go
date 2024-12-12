package repository

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type FeedRepository interface {
	GetFeeds(ctx context.Context, q []qm.QueryMod) (entity.FeedSlice, error)
}
