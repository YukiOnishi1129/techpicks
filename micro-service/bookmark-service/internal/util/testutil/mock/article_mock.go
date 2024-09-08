package mock

import (
	"time"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
)

var mockArticles = []entity.Article{}

func CreateArticleMock() {
	articleID1, _ := uuid.NewUUID()
	articleID2, _ := uuid.NewUUID()
	// articleID3, _ := uuid.NewUUID()

	publishedAt := time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)

	mockPlatforms := GetPlatformMock()

	mockArticles = []entity.Article{
		{
			ID: articleID1.String(),
			PlatformID: null.String{
				String: mockPlatforms[0].ID,
				Valid:  true,
			},
			Title:        "article_title_1",
			Description:  "article_description_1",
			ArticleURL:   "https://article.example1.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_1"),
			Tags:         null.StringFrom("tag1,tag2"),
			ThumbnailURL: "https://article.example1.com/thumbnail1",
			IsEng:        true,
			IsPrivate:    false,
		},
		{
			ID: articleID2.String(),
			PlatformID: null.String{
				String: mockPlatforms[1].ID,
				Valid:  true,
			},
			Title:        "article_title_2",
			Description:  "article_description_2",
			ArticleURL:   "https://article.example1.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_2"),
			Tags:         null.StringFrom("tag1,tag2"),
			ThumbnailURL: "https://article.example1.com/thumbnail2",
			IsEng:        false,
			IsPrivate:    false,
		},
	}
}

func GetArticleMock() []entity.Article {
	return mockArticles
}
