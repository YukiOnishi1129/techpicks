package domain

type Platform struct {
	ID           string
	Name         string
	RssUrl       string
	ThumbnailUrl string

	PlatformType int64
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    *string
}
