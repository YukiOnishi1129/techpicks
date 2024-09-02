package usecase

import (
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (au *articleUseCase) convertPBCategory(c entity.Category) *cpb.Category {
	return &cpb.Category{
		Id:        c.ID,
		Name:      c.Name,
		Type:      int64(c.Type),
		CreatedAt: timestamppb.New(c.CreatedAt),
		UpdatedAt: timestamppb.New(c.UpdatedAt),
	}
}
