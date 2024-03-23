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

type ArticleFirestore struct {
	ID              string       `firestore:"id"`
	Title           string       `firestore:"title"`
	Description     string       `firestore:"description"`
	ThumbnailURL    string       `firestore:"thumbnail_url"`
	ArticleURL      string       `firestore:"article_url"`
	Published       string       `firestore:"published"`
	PlatformID      string       `firestore:"platform_id"`
	PlatformName    string       `firestore:"platform_name"`
	PlatformType    PlatformType `firestore:"platform_type"`
	PlatformSiteURL string       `firestore:"platform_site_url"`
	IsEng           bool         `firestore:"is_eng"`
	IsPrivate       bool         `firestore:"is_private"`
	CreatedAt       string       `firestore:"created_at"`
	UpdatedAt       string       `firestore:"updated_at"`
	DeletedAt       *string      `firestore:"deleted_at"`
}
