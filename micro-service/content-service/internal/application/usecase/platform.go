package usecase

import (
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (cu *contentUseCase) convertPBPlatform(p entity.Platform) *cpb.Platform {
	platform := cpb.Platform{
		Id:               p.ID,
		Name:             p.Name,
		SiteUrl:          p.SiteURL,
		PlatformSiteType: int64(p.PlatformSiteType),
		FaviconUrl:       p.FaviconURL,
		IsEng:            p.IsEng,
		CreatedAt:        timestamppb.New(p.CreatedAt),
		UpdatedAt:        timestamppb.New(p.UpdatedAt),
	}
	if p.DeletedAt.Valid {
		platform.DeletedAt = timestamppb.New(p.DeletedAt.Time)
	}
	return &platform
}
