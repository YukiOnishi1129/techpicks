package externaladapter

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/external"
)

type ContentExternalAdapter interface {
	GetUserSavedArticle(ctx context.Context, dto *GetUserSavedArticleInputDTO) (*GetUserSavedArticleOutputDTO, error)
	CreateUploadArticle(ctx context.Context, dto *GetOrCreateUploadArticleInputDTO) (*GetOrCreateUploadArticleOutputDTO, error)
}

type contentExternalAdapter struct {
	contentExternal external.ContentExternal
}

func NewContentExternalAdapter(ce external.ContentExternal) ContentExternalAdapter {
	return &contentExternalAdapter{
		contentExternal: ce,
	}
}

func (cea *contentExternalAdapter) GetUserSavedArticle(ctx context.Context, dto *GetUserSavedArticleInputDTO) (*GetUserSavedArticleOutputDTO, error) {
	req := &cpb.GetUserSavedArticleRequest{
		ArticleId: dto.ArticleID,
		UserId:    dto.UserID,
	}
	res, err := cea.contentExternal.GetUserSavedArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return &GetUserSavedArticleOutputDTO{
		Article: cea.convertArticleDTO(res.Article),
	}, nil
}

func (cea *contentExternalAdapter) CreateUploadArticle(ctx context.Context, dto *GetOrCreateUploadArticleInputDTO) (*GetOrCreateUploadArticleOutputDTO, error) {
	req := &cpb.CreateUploadArticleRequest{
		UserId:             dto.UserID,
		Title:              dto.Title,
		Description:        dto.Description,
		ArticleUrl:         dto.ArticleURL,
		ThumbnailUrl:       dto.ThumbnailURL,
		PlatformName:       dto.PlatformName,
		PlatformUrl:        dto.PlatformURL,
		PlatformFaviconUrl: dto.PlatformFaviconURL,
	}

	res, err := cea.contentExternal.CreateUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}
	return &GetOrCreateUploadArticleOutputDTO{
		Article: cea.convertArticleDTO(res.Article),
	}, nil
}

func (cpa *contentExternalAdapter) convertArticleDTO(a *cpb.Article) *ArticleDTO {
	res := &ArticleDTO{
		ID:                       a.GetId(),
		Platform:                 cpa.convertPlatformDTO(a.GetPlatform()),
		ArticleComment:           cpa.convertArticleCommentDTO(a.GetComment()),
		Title:                    a.GetTitle(),
		Description:              a.GetDescription(),
		ArticleURL:               a.GetArticleUrl(),
		PublishedAt:              a.GetPublishedAt(),
		ThumbnailURL:             a.GetThumbnailUrl(),
		IsEng:                    a.GetIsEng(),
		IsPrivate:                a.GetIsPrivate(),
		IsBookmarked:             a.GetIsBookmarked(),
		IsFollowing:              a.GetIsFollowing(),
		FavoriteArticleFolderIDs: a.GetFavoriteArticleFolderIds(),
		LikeCount:                a.GetLikeCount(),
		IsTrend:                  a.GetIsTrend(),
		CreatedAt:                a.GetCreatedAt(),
		UpdatedAt:                a.GetUpdatedAt(),
	}
	if a.GetAuthorName() != nil {
		authorName := a.GetAuthorName().GetValue()
		res.AuthorName = &authorName
	}
	if a.GetTags() != nil {
		tags := a.GetTags().GetValue()
		res.Tags = &tags
	}
	if a.GetBookmarkId() != nil {
		bookmarkID := a.GetBookmarkId().GetValue()
		res.BookmarkID = &bookmarkID
	}
	if a.GetFeeds() != nil && len(a.GetFeeds()) > 0 {
		redFeeds := make([]*FeedDTO, len(a.GetFeeds()))
		for i, f := range a.GetFeeds() {
			redFeeds[i] = cpa.convertDTOFeed(f)
		}
	}
	return res
}

func (cpa *contentExternalAdapter) convertPlatformDTO(p *cpb.Platform) *PlatformDTO {
	if p == nil {
		return nil
	}
	return &PlatformDTO{
		ID:               p.GetId(),
		Name:             p.GetName(),
		SiteURL:          p.GetSiteUrl(),
		PlatformSiteType: p.GetPlatformSiteType(),
		FaviconURL:       p.GetFaviconUrl(),
		IsEng:            p.GetIsEng(),
		CreatedAt:        p.GetCreatedAt(),
		UpdatedAt:        p.GetUpdatedAt(),
		DeletedAt:        p.GetDeletedAt(),
	}
}

func (cpa *contentExternalAdapter) convertDTOFeed(f *cpb.Feed) *FeedDTO {
	if f == nil {
		return nil
	}
	res := &FeedDTO{
		ID:                f.GetId(),
		Platform:          cpa.convertPlatformDTO(f.GetPlatform()),
		Category:          cpa.convertCategoryDTO(f.GetCategory()),
		MyFeedIds:         f.GetMyFeedIds(),
		Name:              f.GetName(),
		Description:       f.GetDescription(),
		RssURL:            f.GetRssUrl(),
		SiteURL:           f.GetSiteUrl(),
		ThumbnailURL:      f.GetThumbnailUrl(),
		TrendPlatformType: f.GetTrendPlatformType(),
		CreatedAt:         f.GetCreatedAt(),
		UpdatedAt:         f.GetUpdatedAt(),
	}

	if f.GetApiQueryParam() != nil {
		apiParam := f.GetApiQueryParam().GetValue()
		res.ApiQueryParam = &apiParam
	}
	if f.GetDeletedAt() != nil {
		res.DeleteAt = f.GetDeletedAt()
	}

	return res
}

func (cpa *contentExternalAdapter) convertCategoryDTO(c *cpb.Category) *CategoryDTO {
	if c == nil {
		return nil
	}
	res := &CategoryDTO{
		ID:        c.GetId(),
		Name:      c.GetName(),
		Type:      c.GetType(),
		CreatedAt: c.GetCreatedAt(),
		UpdatedAt: c.GetUpdatedAt(),
	}
	if c.GetDeletedAt() != nil {
		res.DeleteAt = c.GetDeletedAt()
	}

	return res
}

func (cpa *contentExternalAdapter) convertArticleCommentDTO(ac *cpb.ArticleComment) *ArticleCommentDTO {
	if ac == nil {
		return nil
	}
	res := &ArticleCommentDTO{
		ID:        ac.GetId(),
		UserID:    ac.GetUserId(),
		ArticleID: ac.GetArticleId(),
		Comment:   ac.GetComment(),
		CreatedAt: ac.GetCreatedAt(),
		UpdatedAt: ac.GetUpdatedAt(),
	}
	return res
}
