package usecase

import (
	"context"
	"fmt"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/google/uuid"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type BookmarkUseCase interface {
	GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (*bpb.GetBookmarksResponse, error)
	GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
	CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error)
	CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error)
	DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error)
}

type bookmarkUseCase struct {
	bookmarkPersistenceAdapter persistenceadapter.BookmarkPersistenceAdapter
}

func NewBookmarkUseCase(bpa persistenceadapter.BookmarkPersistenceAdapter) BookmarkUseCase {
	return &bookmarkUseCase{
		bookmarkPersistenceAdapter: bpa,
	}
}

func (bu *bookmarkUseCase) GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (*bpb.GetBookmarksResponse, error) {
	bookmarks, err := bu.bookmarkPersistenceAdapter.GetBookmarks(ctx, req)
	if err != nil {
		return nil, err
	}

	edges := make([]*bpb.BookmarkEdge, len(bookmarks))
	for i, b := range bookmarks {
		edges[i] = &bpb.BookmarkEdge{
			Cursor:   b.ID,
			Bookmark: bu.convertPBBookmark(*b),
		}
	}

	if len(edges) == 0 {
		return &bpb.GetBookmarksResponse{
			BookmarkEdge: edges,
			PageInfo: &bpb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	return &bpb.GetBookmarksResponse{
		BookmarkEdge: edges,
		PageInfo: &bpb.PageInfo{
			HasNextPage: len(edges) == int(req.GetLimit()),
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}

func (bu *bookmarkUseCase) GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	bookmark, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleID(ctx, req.GetArticleId(), req.GetUserId())
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
	data, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleID(ctx, req.GetArticleId(), req.GetUserId())
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}
	if data.ID != "" {
		return &bpb.CreateBookmarkResponse{}, fmt.Errorf("bookmark already exists")
	}

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
	b, err := bu.bookmarkPersistenceAdapter.CreateBookmark(ctx, bookmark)
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b),
	}, nil
}

func (bu *bookmarkUseCase) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error) {
	// check if the url is already in the bookmark
	res, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleURL(ctx, req.GetArticleUrl(), req.GetUserId())
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}
	if res.ID != "" {
		return &bpb.CreateBookmarkResponse{}, fmt.Errorf("bookmark already exists")
	}

	// TODO2: private=falseで同じarticleUrlとplatformUrlのarticleがすでにあるなら、そのデータを使ってbookmarkを登録
	// → true: create bookmark (use already created article)
	// → false: create article

	// TODO3:privateで同じarticleUrlのものがある
	// → true: create bookmark (use already created article)
	// → false: create article

	// TODO: articleとbookmarkと登録
	// → true: create bookmark
	// → false: create article

	return &bpb.CreateBookmarkResponse{}, nil
}

func (bu *bookmarkUseCase) DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error) {
	data, err := bu.bookmarkPersistenceAdapter.GetBookmarkByID(ctx, req.GetBookmarkId())
	if err != nil {
		return &emptypb.Empty{}, err
	}
	if data.ID == "" {
		return &emptypb.Empty{}, fmt.Errorf("bookmark does not exist")
	}
	if data.UserID != req.GetUserId() {
		return &emptypb.Empty{}, fmt.Errorf("bookmark does not belong to the user")
	}

	if err := bu.bookmarkPersistenceAdapter.DeleteBookmark(ctx, req.GetBookmarkId(), req.GetUserId()); err != nil {
		return &emptypb.Empty{}, err
	}
	return &emptypb.Empty{}, nil
}
