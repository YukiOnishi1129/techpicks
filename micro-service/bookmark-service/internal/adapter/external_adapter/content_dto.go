package externaladapter

import (
	"google.golang.org/protobuf/types/known/timestamppb"
)

type GetUserSavedArticleInputDTO struct {
	ArticleID string
	UserID    string
}

type GetUserSavedArticleOutputDTO struct {
	Article *ArticleDTO
}

type GetOrCreateUploadArticleInputDTO struct {
	UserID             string
	Title              string
	Description        string
	ArticleURL         string
	ThumbnailURL       string
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
}

type GetOrCreateUploadArticleOutputDTO struct {
	Article *ArticleDTO
}

type ArticleDTO struct {
	ID                       string
	Platform                 *PlatformDTO
	Feeds                    []*FeedDTO
	ArticleComment           *ArticleCommentDTO
	Title                    string
	Description              string
	ArticleURL               string
	PublishedAt              *timestamppb.Timestamp
	AuthorName               *string
	Tags                     *string
	ThumbnailURL             string
	IsEng                    bool
	IsPrivate                bool
	BookmarkID               *string
	IsBookmarked             bool
	IsFollowing              bool
	FavoriteArticleFolderIDs []string
	LikeCount                int64
	IsTrend                  bool
	CreatedAt                *timestamppb.Timestamp
	UpdatedAt                *timestamppb.Timestamp
}

type ArticleCommentDTO struct {
	ID        string
	UserID    string
	ArticleID string
	Comment   string
	CreatedAt *timestamppb.Timestamp
	UpdatedAt *timestamppb.Timestamp
}

type FeedDTO struct {
	ID                string
	Platform          *PlatformDTO
	Category          *CategoryDTO
	MyFeedIds         []string
	Name              string
	Description       string
	RssURL            string
	SiteURL           string
	ThumbnailURL      string
	TrendPlatformType int64
	ApiQueryParam     *string
	CreatedAt         *timestamppb.Timestamp
	UpdatedAt         *timestamppb.Timestamp
	DeleteAt          *timestamppb.Timestamp
}

type CategoryDTO struct {
	ID        string
	Name      string
	Type      int64
	CreatedAt *timestamppb.Timestamp
	UpdatedAt *timestamppb.Timestamp
	DeleteAt  *timestamppb.Timestamp
}

type PlatformDTO struct {
	ID               string
	Name             string
	SiteURL          string
	PlatformSiteType int64
	FaviconURL       string
	IsEng            bool
	CreatedAt        *timestamppb.Timestamp
	UpdatedAt        *timestamppb.Timestamp
	DeletedAt        *timestamppb.Timestamp
}
