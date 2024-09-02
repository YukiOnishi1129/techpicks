package usecase

import (
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (au *articleUseCase) convertPBFeed(f entity.Feed) *cpb.Feed {
	feed := &cpb.Feed{
		Id:                f.ID,
		Name:              f.Name,
		Description:       f.Description,
		RssUrl:            f.RSSURL,
		SiteUrl:           f.SiteURL,
		ThumbnailUrl:      f.ThumbnailURL,
		TrendPlatformType: int64(f.TrendPlatformType),
		CreatedAt:         timestamppb.New(f.CreatedAt),
		UpdatedAt:         timestamppb.New(f.UpdatedAt),
	}
	if f.APIQueryParam.Valid {
		feed.ApiQueryParam = wrapperspb.String(f.APIQueryParam.String)
	}
	if f.DeletedAt.Valid {
		feed.DeletedAt = timestamppb.New(f.DeletedAt.Time)
	}
	feed.Platform = au.convertPBPlatform(*f.R.Platform)
	feed.Category = au.convertPBCategory(*f.R.Category)
	return feed
}
