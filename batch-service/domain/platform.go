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
	CreatedAt    int
	UpdatedAt    int
	DeletedAt    *int
}

type PlatformFirestore struct {
	Name         string       `firestore:"name"`
	RssURL       string       `firestore:"rss_url"`
	SiteURL      string       `firestore:"site_url"`
	PlatformType PlatformType `firestore:"platform_type"`
	IsEng        bool         `firestore:"is_eng"`
	CreatedAt    int          `firestore:"created_at"`
	UpdatedAt    int          `firestore:"updated_at"`
	DeletedAt    *int         `firestore:"deleted_at"`
}
