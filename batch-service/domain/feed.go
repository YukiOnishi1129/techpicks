package domain

import "time"

type FeedFetchType int

const (
	FeedFetchTypeUnknown FeedFetchType = iota
	FeedFetchTypeRSS
	FeedFetchTypeAPI
	FeedFetchTypeRSSAndAPI
)

type Feed struct {
	ID                string
	Name              string
	RssURL            string
	FeedFetchType     FeedFetchType
	TrendPlatformType TrendPlatformType
	Platform          Platform
	Category          Category
	CreatedAt         time.Time
	UpdatedAt         time.Time
	DeletedAt         *time.Time
}

type CreateFeedInputDTO struct {
	Name       string `json:"name"`
	RssURL     string `json:"rss_url"`
	PlatformID string `json:"platform_id"`
	CategoryID string `json:"category_id"`
}

type UpdateFeedInputDTO struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	RssURL     string `json:"rss_url"`
	PlatformID string `json:"platform_id"`
	CategoryID string `json:"category_id"`
}
