package usecase

import (
	"context"
	"fmt"

	bpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/bookmark"
	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/persistence_adapter"
	"google.golang.org/protobuf/types/known/emptypb"
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
	favoriteExternalAdapter    externaladapter.FavoriteExternalAdapter
}

func NewBookmarkUseCase(bpa persistenceadapter.BookmarkPersistenceAdapter, cea externaladapter.ContentExternalAdapter, fea externaladapter.FavoriteExternalAdapter) BookmarkUseCase {
	return &bookmarkUseCase{
		bookmarkPersistenceAdapter: bpa,
		contentExternalAdapter:     cea,
		favoriteExternalAdapter:    fea,
	}
}

func (bu *bookmarkUseCase) GetBookmarks(ctx context.Context, req *bpb.GetBookmarksRequest) (*bpb.GetBookmarksResponse, error) {
	inputKeywords := make([]string, len(req.GetKeywords()))
	if len(req.GetKeywords()) > 0 {
		for i, k := range req.GetKeywords() {
			inputKeywords[i] = k.GetValue()
		}

	}
	resB, err := bu.bookmarkPersistenceAdapter.ListBookmark(ctx, &persistenceadapter.ListBookmarkInputDTO{
		UserID:   req.GetUserId(),
		Limit:    req.GetLimit(),
		Cursor:   req.GetCursor(),
		Keywords: inputKeywords,
	})
	if err != nil {
		return nil, err
	}

	edges := make([]*bpb.BookmarkEdge, len(resB.Bookmarks))
	for i, b := range resB.Bookmarks {
		resA, err := bu.contentExternalAdapter.GetUserSavedArticle(ctx, &externaladapter.GetUserSavedArticleInputDTO{
			ArticleID: b.ArticleID,
			UserID:    req.GetUserId(),
		})
		if err != nil {
			return nil, err
		}
		resB := bu.convertPBBookmark(b, resA.Article)

		resFavoriteFolders, err := bu.favoriteExternalAdapter.ListFavoriteArticleFoldersByArticleID(ctx, &externaladapter.ListFavoriteArticleFoldersByArticleIDInputDTO{
			ArticleID: b.ArticleID,
			UserID:    req.GetUserId(),
		})
		if err != nil {
			return nil, err
		}

		if len(resFavoriteFolders.FavoriteArticleFolders) > 0 {
			resFavIds := make([]string, len(resFavoriteFolders.FavoriteArticleFolders))
			for i, f := range resFavoriteFolders.FavoriteArticleFolders {
				resFavIds[i] = f.ID
			}
			resB.FavoriteArticleFolderIds = resFavIds
			resB.IsFollowing = true
		}

		edges[i] = &bpb.BookmarkEdge{
			Cursor:   b.ID,
			Bookmark: resB,
		}
	}

	if len(edges) == 0 {
		return &bpb.GetBookmarksResponse{
			BookmarkEdge: edges,
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	return &bpb.GetBookmarksResponse{
		BookmarkEdge: edges,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(edges) == int(req.GetLimit()),
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}

func (bu *bookmarkUseCase) GetBookmarkByArticleID(ctx context.Context, req *bpb.GetBookmarkByArticleIDRequest) (*bpb.GetBookmarkResponse, error) {
	b, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleID(ctx, &persistenceadapter.GetBookmarkByArticleIDInputDTO{
		ArticleID: req.GetArticleId(),
		UserID:    req.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	a, err := bu.contentExternalAdapter.GetUserSavedArticle(ctx, &externaladapter.GetUserSavedArticleInputDTO{
		ArticleID: b.Bookmark.ArticleID,
		UserID:    req.GetUserId(),
	})
	if err != nil {
		return nil, err
	}
	return &bpb.GetBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b.Bookmark, a.Article),
	}, nil
}

func (bu *bookmarkUseCase) CreateBookmark(ctx context.Context, req *bpb.CreateBookmarkRequest) (*bpb.CreateBookmarkResponse, error) {
	data, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleID(ctx, &persistenceadapter.GetBookmarkByArticleIDInputDTO{
		ArticleID: req.GetArticleId(),
		UserID:    req.GetUserId(),
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}
	if data.Bookmark.ID != "" {
		return &bpb.CreateBookmarkResponse{}, fmt.Errorf("bookmark already exists")
	}

	inputDTO := &persistenceadapter.CreateBookmarkInputDTO{
		ArticleID:          req.GetArticleId(),
		UserID:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleURL:         req.GetArticleUrl(),
		ThumbnailURL:       req.GetThumbnailUrl(),
		PublishedAt:        req.GetPublishedAt(),
		PlatformName:       req.GetPlatformName(),
		PlatformURL:        req.GetPlatformUrl(),
		PlatformFaviconURL: req.GetPlatformFaviconUrl(),
		IsEng:              req.GetIsEng(),
		IsRead:             req.GetIsRead(),
	}

	if req.GetPlatformId() != nil {
		pID := req.GetPlatformId().GetValue()
		inputDTO.PlatformID = &pID
	}

	b, err := bu.bookmarkPersistenceAdapter.CreateBookmark(ctx, inputDTO)
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	a, err := bu.contentExternalAdapter.GetUserSavedArticle(ctx, &externaladapter.GetUserSavedArticleInputDTO{
		ArticleID: b.Bookmark.ArticleID,
		UserID:    req.GetUserId(),
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b.Bookmark, a.Article),
	}, nil
}

func (bu *bookmarkUseCase) CreateBookmarkForUploadArticle(ctx context.Context, req *bpb.CreateBookmarkForUploadArticleRequest) (*bpb.CreateBookmarkResponse, error) {
	// check if the url is already in the bookmark
	res, err := bu.bookmarkPersistenceAdapter.GetBookmarkByArticleURL(ctx, &persistenceadapter.GetBookmarkByArticleURLInputDTO{
		ArticleURL: req.GetArticleUrl(),
		UserID:     req.GetUserId(),
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}
	if res.Bookmark.ID != "" {
		return &bpb.CreateBookmarkResponse{}, fmt.Errorf("bookmark already exists")
	}

	// create article
	article, err := bu.contentExternalAdapter.GetOrCreateUploadArticle(ctx, &externaladapter.GetOrCreateUploadArticleInputDTO{
		UserID:             req.GetUserId(),
		Title:              req.GetTitle(),
		Description:        req.GetDescription(),
		ArticleURL:         req.GetArticleUrl(),
		ThumbnailURL:       req.GetThumbnailUrl(),
		PlatformName:       req.GetPlatformName(),
		PlatformURL:        req.GetPlatformUrl(),
		PlatformFaviconURL: req.GetPlatformFaviconUrl(),
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	// create bookmark
	b, err := bu.bookmarkPersistenceAdapter.CreateBookmarkForUploadArticle(ctx, &persistenceadapter.CreateBookmarkForUploadArticleInputDTO{
		UserID:             req.GetUserId(),
		PlatformName:       req.GetPlatformName(),
		PlatformURL:        req.GetPlatformUrl(),
		PlatformFaviconURL: req.GetPlatformFaviconUrl(),
		Article:            article.Article,
	})
	if err != nil {
		return &bpb.CreateBookmarkResponse{}, err
	}

	return &bpb.CreateBookmarkResponse{
		Bookmark: bu.convertPBBookmark(b.Bookmark, article.Article),
	}, nil
}

func (bu *bookmarkUseCase) DeleteBookmark(ctx context.Context, req *bpb.DeleteBookmarkRequest) (*emptypb.Empty, error) {
	data, err := bu.bookmarkPersistenceAdapter.GetBookmarkByID(ctx, &persistenceadapter.GetBookmarkByIDInputDTO{
		ID: req.GetBookmarkId(),
	})
	if err != nil {
		return &emptypb.Empty{}, err
	}
	if data.Bookmark.ID == "" {
		return &emptypb.Empty{}, fmt.Errorf("bookmark does not exist")
	}
	if data.Bookmark.UserID != req.GetUserId() {
		return &emptypb.Empty{}, fmt.Errorf("bookmark does not belong to the user")
	}

	if err := bu.bookmarkPersistenceAdapter.DeleteBookmark(ctx, &persistenceadapter.DeleteBookmarkInputDTO{
		ID:     req.GetBookmarkId(),
		UserID: req.GetUserId(),
	}); err != nil {
		return &emptypb.Empty{}, err
	}
	return &emptypb.Empty{}, nil
}

func (bu *bookmarkUseCase) convertPBBookmark(b *persistenceadapter.BookmarkDTO, a *externaladapter.ArticleDTO) *bpb.Bookmark {
	if b.ID == "" {
		return &bpb.Bookmark{}
	}

	resB := &bpb.Bookmark{
		Id:                       b.ID,
		ArticleId:                b.ArticleID,
		UserId:                   b.UserID,
		Title:                    a.Title,
		Description:              a.Description,
		ArticleUrl:               a.ArticleURL,
		ThumbnailUrl:             a.ThumbnailURL,
		PlatformName:             b.PlatformName,
		PlatformUrl:              b.PlatformURL,
		PlatformFaviconUrl:       b.PlatformFaviconURL,
		IsEng:                    a.IsEng,
		IsRead:                   b.IsRead,
		IsFollowing:              a.IsFollowing,
		FavoriteArticleFolderIds: a.FavoriteArticleFolderIDs,
		CreatedAt:                b.CreatedAt,
		UpdatedAt:                b.UpdatedAt,
	}
	if a.Platform != nil {
		resB.PlatformId = wrapperspb.String(a.Platform.ID)
		resB.PlatformName = a.Platform.Name
		resB.PlatformUrl = a.Platform.SiteURL
		resB.PlatformFaviconUrl = a.Platform.FaviconURL
	}
	if b.PublishedAt != nil {
		resB.PublishedAt = b.PublishedAt
	}

	if a.ArticleComment != nil {
		resB.ArticleComment = &cpb.ArticleComment{
			Id:        a.ArticleComment.ID,
			UserId:    a.ArticleComment.UserID,
			ArticleId: a.ArticleComment.ArticleID,
			Comment:   a.ArticleComment.Comment,
			CreatedAt: a.ArticleComment.CreatedAt,
			UpdatedAt: a.ArticleComment.UpdatedAt,
		}
	}
	return resB
}
