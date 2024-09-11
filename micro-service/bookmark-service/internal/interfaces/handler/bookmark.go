package handler

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/application/usecase"
	"google.golang.org/protobuf/types/known/emptypb"
)

type bookmarkHandler struct {
	bookmarkUseCase usecase.BookmarkUseCase
}

func NewBookmarkHandler(bu usecase.BookmarkUseCase) bpb.BookmarkServiceServer {
	return &bookmarkHandler{
		bookmarkUseCase: bu,
	}
}

func (bh *bookmarkHandler) GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (*bpb.GetBookmarksResponse, error) {
	res, err := bh.bookmarkUseCase.GetBookmarks(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (bh *bookmarkHandler) GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	res, err := bh.bookmarkUseCase.GetBookmarkByArticleID(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (bh *bookmarkHandler) CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error) {
	res, err := bh.bookmarkUseCase.CreateBookmark(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (bh *bookmarkHandler) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error) {
	res, err := bh.bookmarkUseCase.CreateBookmarkForUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (bh *bookmarkHandler) DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error) {
	res, err := bh.bookmarkUseCase.DeleteBookmark(ctx, req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
