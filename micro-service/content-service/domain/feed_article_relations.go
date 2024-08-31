package domain

import "time"

type FeedArticleRelation struct {
	ID        string
	Feed      Feed
	Article   Article
	CreatedAt time.Time
	UpdatedAt time.Time
}
