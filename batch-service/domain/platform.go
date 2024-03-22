package domain

type Platform struct {
	ID           string
	Name         string
	RssURL       string
	SiteURL      string
	PlatformType int64
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    *string
}
