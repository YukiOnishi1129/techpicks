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
