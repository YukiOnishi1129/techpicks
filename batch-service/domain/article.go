package domain

import "time"

type Article struct {
	ID           string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  time.Time
	IsPrivate    bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time
}

type GetArticlesInputDTO struct {
	Title      *string
	ArticleURL *string
	StartedAt  *time.Time
	EndedAt    *time.Time
}

type CreateArticleInputDTO struct {
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  time.Time
	IsPrivate    *bool
}

type UpdateArticleInputDTO struct {
	ID           string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  time.Time
	IsPrivate    *bool
}

type ArticleFirestore struct {
	Title                string           `firestore:"title"`
	Description          string           `firestore:"description"`
	ThumbnailURL         string           `firestore:"thumbnail_url"`
	ArticleURL           string           `firestore:"article_url"`
	PublishedAt          int              `firestore:"published_at"`
	PlatformID           string           `firestore:"platform_id"`
	PlatformName         string           `firestore:"platform_name"`
	PlatformCategoryName string           `firestore:"platform_category_name"`
	PlatformSiteType     PlatformSiteType `firestore:"platform_site_type"`
	PlatformSiteURL      string           `firestore:"platform_site_url"`
	PlatformFaviconURL   string           `firestore:"platform_favicon_url"`
	IsEng                bool             `firestore:"is_eng"`
	IsPrivate            bool             `firestore:"is_private"`
	CreatedAt            int              `firestore:"created_at"`
	UpdatedAt            int              `firestore:"updated_at"`
	DeletedAt            *int             `firestore:"deleted_at"`
}
