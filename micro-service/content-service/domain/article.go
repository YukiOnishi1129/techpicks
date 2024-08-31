package domain

import "time"

type Article struct {
	ID           string
	Platform     *Platform
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  time.Time
	AuthorName   *string
	Tags         *string
	IsEng        bool
	IsPrivate    bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type GetArticlesInputDTO struct {
	LanguageStatus *int64
	Tag            *string
	Cursor         string
	Limit          int64
}
