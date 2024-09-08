package usecase

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/adapter"
	"github.com/google/uuid"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type BookmarkUseCase interface {
	GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
	CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error)
	DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error)
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
	bookmark, err := bu.bookmarkAdapter.GetBookmarkByArticleID(ctx, req.GetArticleId(), req.GetUserId())
	if err != nil {
		return nil, err
	}
	return &bpb.GetBookmarkResponse{
		Bookmark: bu.convertPBBookmark(bookmark),
	}, nil
}

func (bu *bookmarkUseCase) convertPBBookmark(b entity.Bookmark) *bpb.Bookmark {
	if b.ID == "" {
		return &bpb.Bookmark{}
	}

	resBookmark := &bpb.Bookmark{
		Id:                 b.ID,
		ArticleId:          b.ArticleID,
		UserId:             b.UserID,
		Title:              b.Title,
		Description:        b.Description,
		ArticleUrl:         b.ArticleURL,
		ThumbnailUrl:       b.ThumbnailURL,
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

func (bu *bookmarkUseCase) CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error) {
	bookmarkID, _ := uuid.NewUUID()
	bookmark := entity.Bookmark{
		ID:                 bookmarkID.String(),
		ArticleID:          req.GetArticleId(),
		UserID:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleURL:         req.GetArticleUrl(),
		ThumbnailURL:       req.GetThumbnailUrl(),
		PlatformName:       req.GetPlatformName(),
		PlatformURL:        req.GetPlatformUrl(),
		PlatformFaviconURL: req.GetPlatformFaviconUrl(),
		IsEng:              req.GetIsEng(),
		IsRead:             req.GetIsRead(),
	}

	if req.GetPlatformId() != nil {
		bookmark.PlatformID.String = req.GetPlatformId().GetValue()
		bookmark.PlatformID.Valid = true
	}
	if req.GetPublishedAt() != nil {
		bookmark.PublishedAt.Time = req.GetPublishedAt().AsTime()
		bookmark.PublishedAt.Valid = true
	}
	b, err := bu.bookmarkAdapter.CreateBookmark(ctx, bookmark)
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b),
	}, nil
}

func (bu *bookmarkUseCase) DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error) {
	if err := bu.bookmarkAdapter.DeleteBookmark(ctx, req.GetBookmarkId(), req.GetUserId()); err != nil {
		return &emptypb.Empty{}, err
	}
	return &emptypb.Empty{}, nil
}
