package handler

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/application/usecase"
)

type bookmarkHandler struct {
	bookmarkUseCase usecase.BookmarkUseCase
}

func NewBookmarkHandler(bu usecase.BookmarkUseCase) bpb.BookmarkServiceServer {
	return &bookmarkHandler{
		bookmarkUseCase: bu,
	}
}

func (bh *bookmarkHandler) GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	res, err := bh.bookmarkUseCase.GetBookmarkByArticleID(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
