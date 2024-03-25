package domain

type PlatformType int

const (
	PlatformTypeSite PlatformType = iota
	PlatformTypeCompany
)

type Platform struct {
	ID           string
	Name         string
	RssURL       string
	SiteURL      string
	PlatformType PlatformType
	IsEng        bool
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    *string
}

type PlatformFirestore struct {
	ID           string       `firestore:"id"`
	Name         string       `firestore:"name"`
	RssURL       string       `firestore:"rss_url"`
	SiteURL      string       `firestore:"site_url"`
	PlatformType PlatformType `firestore:"platform_type"`
	IsEng        bool         `firestore:"is_eng"`
	CreatedAt    string       `firestore:"created_at"`
	UpdatedAt    string       `firestore:"updated_at"`
	DeletedAt    *string      `firestore:"deleted_at"`
}
