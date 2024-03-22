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
