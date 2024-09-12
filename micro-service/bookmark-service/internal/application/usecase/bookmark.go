package usecase

import (
	"context"
	"fmt"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type BookmarkUseCase interface {
	GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (*bpb.GetBookmarksResponse, error)
	GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error)
	CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error)
	CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest) (*bpb.CreateBookmarkResponse, error)
	DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error)
}

type bookmarkUseCase struct {
	bookmarkPersistenceAdapter persistenceadapter.BookmarkPersistenceAdapter
	contentExternalAdapter     externaladapter.ContentExternalAdapter
}

func NewBookmarkUseCase(bpa persistenceadapter.BookmarkPersistenceAdapter, cea externaladapter.ContentExternalAdapter) BookmarkUseCase {
	return &bookmarkUseCase{
		bookmarkPersistenceAdapter: bpa,
		contentExternalAdapter:     cea,
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

	b, err := bu.bookmarkPersistenceAdapter.CreateBookmark(ctx, req)
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b),
	}, nil
}

func (bu *bookmarkUseCase) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest) (*bpb.CreateBookmarkResponse, error) {
	// check if the url is already in the bookmark
	res, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleURL(ctx, req.GetArticleUrl(), req.GetUserId())
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}
	if res.ID != "" {
		return &bpb.CreateBookmarkResponse{}, fmt.Errorf("bookmark already exists")
	}

	// create article
	article, err := bu.contentExternalAdapter.CreateUploadArticle(ctx, &cpb.CreateUploadArticleRequest{
		UserId:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleUrl:         req.GetArticleUrl(),
		ThumbnailUrl:       req.GetThumbnailUrl(),
		PlatformName:       req.GetPlatformName(),
		PlatformUrl:        req.GetPlatformUrl(),
		PlatformFaviconUrl: req.GetPlatformFaviconUrl(),
		IsEng:              !util.JapaneseTextCheck(req.GetTitle()) && !util.JapaneseTextCheck(req.GetDescription()) && !util.JapaneseTextCheck(req.GetPlatformName()),
		IsRead:             false,
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	// create bookmark
	bookmark, err := bu.bookmarkPersistenceAdapter.CreateBookmarkForUploadArticle(ctx, req, article.Article)
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(bookmark),
	}, nil
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
