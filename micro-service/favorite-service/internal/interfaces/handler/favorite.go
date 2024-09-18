package handler

import (
	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/application/usecase"
)

type favoriteHandler struct {
	favoriteUseCase usecase.FavoriteUseCase
}

func NewFavoriteHandler(fafu usecase.FavoriteUseCase) fpb.FavoriteServiceServer {
	return &favoriteHandler{
		favoriteUseCase: fafu,
	}
}
