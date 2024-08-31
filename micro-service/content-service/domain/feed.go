package domain

import "time"

type Feed struct {
	ID                string
	Name              string
	RssURL            string
	TrendPlatformType TrendPlatformType
	Platform          Platform
	Category          Category
	CreatedAt         time.Time
	UpdatedAt         time.Time
	DeletedAt         *time.Time
}
