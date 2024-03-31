package domain

type Article struct {
	ID           string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  int
	Platform     ArticlePlatform
	IsEng        bool
	IsPrivate    bool
	CreatedAt    int
	UpdatedAt    int
	DeletedAt    *int
}

type ArticlePlatform struct {
	ID           string
	Name         string
	Category     string
	PlatformType PlatformType
	SiteURL      string
}

type ArticleFirestore struct {
	Title            string       `firestore:"title"`
	Description      string       `firestore:"description"`
	ThumbnailURL     string       `firestore:"thumbnail_url"`
	ArticleURL       string       `firestore:"article_url"`
	PublishedAt      int          `firestore:"published_at"`
	PlatformID       string       `firestore:"platform_id"`
	PlatformName     string       `firestore:"platform_name"`
	PlatformCategory string       `firestore:"platform_category"`
	PlatformType     PlatformType `firestore:"platform_type"`
	PlatformSiteURL  string       `firestore:"platform_site_url"`
	IsEng            bool         `firestore:"is_eng"`
	IsPrivate        bool         `firestore:"is_private"`
	CreatedAt        int          `firestore:"created_at"`
	UpdatedAt        int          `firestore:"updated_at"`
	DeletedAt        *int         `firestore:"deleted_at"`
}
