package domain

import "time"

type FeedArticleRelation struct {
	ID        string
	Feed      Feed
	Article   Article
	CreatedAt time.Time
	UpdatedAt time.Time
}

type GetFeedArticleRelationsInputDTO struct {
	FeedID    *string
	ArticleID *string
}

type CreateFeedArticleRelationInputDTO struct {
	FeedID    string
	ArticleID string
}

type UpdateFeedArticleRelationInputDTO struct {
	ID        string
	FeedID    string
	ArticleID string
}
