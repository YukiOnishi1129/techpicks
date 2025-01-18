package externaladapter

import "google.golang.org/protobuf/types/known/timestamppb"

type ListFavoriteArticleFoldersByArticleIDInputDTO struct {
	ArticleID string
	UserID    string
}

type ListFavoriteArticleFoldersByArticleIDOutputDTO struct {
	FavoriteArticleFolders []*FavoriteArticleFolderDTO
	PageInfo               *PageInfoDTO
}

type FavoriteArticleFolderDTO struct {
	ID               string
	UserID           string
	Title            string
	Description      string
	CreatedAt        *timestamppb.Timestamp
	UpdatedAt        *timestamppb.Timestamp
	FavoriteArticles []*FavoriteArticleDTO
}

type FavoriteArticleDTO struct {
	ID                      string
	ArticleID               string
	PlatformID              *string
	FavoriteArticleFolderID string
	UserID                  string
	Title                   string
	Description             string
	ThumbnailURL            string
	ArticleURL              string
	PublishedAt             *timestamppb.Timestamp
	AuthorName              *string
	Tags                    *string
	PlatformName            string
	PlatformURL             string
	PlatformFaviconURL      string
	Comment                 *ArticleCommentDTO
	IsEng                   bool
	IsPrivate               bool
	IsRead                  bool
	CreatedAt               *timestamppb.Timestamp
	UpdatedAt               *timestamppb.Timestamp
}
