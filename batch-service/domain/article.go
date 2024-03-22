package domain

type Article struct {
	ID           string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	Published    string
	Platform     ArticlePlatform
	IsEng        bool
	IsPrivate    bool
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    *string
}

type ArticlePlatform struct {
	ID           string
	Name         string
	PlatformType PlatformType
	SiteURL      string
}
