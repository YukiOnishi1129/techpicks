package domain

type PlatformSiteType int

const (
	platformUnknown PlatformSiteType = iota
	PlatformTypeSite
	PlatformTypeCompany
	PlatformTypeSummary
)
