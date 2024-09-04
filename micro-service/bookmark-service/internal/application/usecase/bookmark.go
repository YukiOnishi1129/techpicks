package usecase

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/adapter"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type BookmarkUseCase interface {
	GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
}

type bookmarkUseCase struct {
	bookmarkAdapter adapter.BookmarkAdapter
}

func NewBookmarkUseCase(ba adapter.BookmarkAdapter) BookmarkUseCase {
	return &bookmarkUseCase{
		bookmarkAdapter: ba,
	}
}

func (bu *bookmarkUseCase) GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	bookmark, err := bu.bookmarkAdapter.GetBookmarkByArticleID(ctx, req.ArticleId)
	if err != nil {
		return nil, err
	}
	return &bpb.GetBookmarkResponse{
		Bookmark: bu.convertPBBookmark(bookmark),
	}, nil
}

func (bu *bookmarkUseCase) convertPBBookmark(b entity.Bookmark) *bpb.Bookmark {
	resBookmark := &bpb.Bookmark{
		Id:                 b.ID,
		ArticleId:          b.ArticleID,
		UserId:             b.UserID,
		Title:              b.Title,
		Description:        b.Description,
		ArticleUrl:         b.ArticleURL,
		PlatformName:       b.PlatformName,
		PlatformUrl:        b.PlatformURL,
		PlatformFaviconUrl: b.PlatformFaviconURL,
		IsEng:              b.IsEng,
		IsRead:             b.IsRead,
		CreatedAt:          timestamppb.New(b.CreatedAt),
		UpdatedAt:          timestamppb.New(b.UpdatedAt),
	}
	if b.PlatformID.Valid {
		resBookmark.PlatformId = wrapperspb.String(b.PlatformID.String)
	}
	if b.PublishedAt.Valid {
		resBookmark.PublishedAt = timestamppb.New(b.PublishedAt.Time)
	}
	return resBookmark
}
