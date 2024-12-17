package handler

import (
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/application/usecase"
)

type contentHandler struct {
	contentUseCase usecase.ContentUseCase
}

func NewContentHandler(cu usecase.ContentUseCase) cpb.ContentServiceServer {
	return &contentHandler{
		contentUseCase: cu,
	}
}
