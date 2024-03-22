package domain

type Article struct {
	ID           string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	Platform     ArticlePlatform
	IsPrivate    bool
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    *string
}

type ArticlePlatform struct {
	ID           string
	Name         string
	PlatformType string
	SiteURL      string
}
