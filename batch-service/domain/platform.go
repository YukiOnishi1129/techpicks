package domain

import (
	"time"
)

type PlatformSiteType int

const (
	platformUnknown PlatformSiteType = iota
	PlatformTypeSite
	PlatformTypeCompany
	PlatformTypeSummary
)

type Platform struct {
	ID               string
	Name             string
	SiteURL          string
	PlatformSiteType PlatformSiteType
	IsEng            bool
	FaviconURL       string
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        *time.Time
}

type PlatformFirestore struct {
	Name              string           `firestore:"name"`
	CategoryName      string           `firestore:"category_name"`
	RssURL            string           `firestore:"rss_url"`
	SiteURL           string           `firestore:"site_url"`
	PlatformSiteType  PlatformSiteType `firestore:"platform_type"`
	IsEng             bool             `firestore:"is_eng"`
	ThumbnailImageURL string           `firestore:"thumbnail_image_url"`
	FaviconURL        string           `firestore:"favicon_url"`
	CreatedAt         int              `firestore:"created_at"`
	UpdatedAt         int              `firestore:"updated_at"`
	DeletedAt         *int             `firestore:"deleted_at"`
}
