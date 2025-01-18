package persistenceadapter

import (
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/external_adapter"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ListBookmarkInputDTO struct {
	UserID   string
	Keywords []string
	Cursor   string
	Limit    int64
}

type ListBookmarkOutputDTO struct {
	Bookmarks []*BookmarkDTO
}

type GetBookmarkByIDInputDTO struct {
	ID string
}

type GetBookmarkByIDOutputDTO struct {
	Bookmark *BookmarkDTO
}

type GetBookmarkByArticleIDInputDTO struct {
	ArticleID string
	UserID    string
}

type GetBookmarkByArticleIDOutputDTO struct {
	Bookmark *BookmarkDTO
}

type GetBookmarkByArticleURLInputDTO struct {
	ArticleURL string
	UserID     string
}

type GetBookmarkByArticleURLOutputDTO struct {
	Bookmark *BookmarkDTO
}

type CreateBookmarkInputDTO struct {
	ArticleID          string
	UserID             string
	PlatformID         *string
	Title              string
	Description        string
	ArticleURL         string
	ThumbnailURL       string
	PublishedAt        *timestamppb.Timestamp
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
	IsEng              bool
	IsRead             bool
}

type CreateBookmarkOutputDTO struct {
	Bookmark *BookmarkDTO
}

type CreateBookmarkForUploadArticleInputDTO struct {
	UserID             string
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
	Article            *externaladapter.ArticleDTO
}

type CreateBookmarkForUploadArticleOutputDTO struct {
	Bookmark *BookmarkDTO
}

type DeleteBookmarkInputDTO struct {
	ID     string
	UserID string
}

type BookmarkDTO struct {
	ID                 string
	UserID             string
	PlatformID         *string
	ArticleID          string
	Title              string
	Description        string
	ArticleURL         string
	PublishedAt        *timestamppb.Timestamp
	ThumbnailURL       string
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
	IsEng              bool
	IsRead             bool
	CreatedAt          *timestamppb.Timestamp
	UpdatedAt          *timestamppb.Timestamp
}
