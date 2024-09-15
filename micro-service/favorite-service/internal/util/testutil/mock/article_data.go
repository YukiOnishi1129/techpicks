package mock

import (
	"time"

	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
)

var mockArticles = []entity.Article{}

func CreateArticleMock() {
	articleID1, _ := uuid.NewUUID()
	articleID2, _ := uuid.NewUUID()
	articleID3, _ := uuid.NewUUID()
	articleID4, _ := uuid.NewUUID()
	articleID5, _ := uuid.NewUUID()
	articleID6, _ := uuid.NewUUID()
	articleID7, _ := uuid.NewUUID()
	articleID8, _ := uuid.NewUUID()
	articleID9, _ := uuid.NewUUID()
	articleID10, _ := uuid.NewUUID()

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
			ArticleURL:   "https://article.example2.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_2"),
			Tags:         null.StringFrom("tag1,tag2"),
			ThumbnailURL: "https://article.example1.com/thumbnail2",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID3.String(),
			PlatformID: null.String{
				String: mockPlatforms[2].ID,
				Valid:  true,
			},
			Title:        "article_title_3",
			Description:  "article_description_3",
			ArticleURL:   "https://article.example3.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_3"),
			Tags:         null.StringFrom("tag1,tag3"),
			ThumbnailURL: "https://article.example1.com/thumbnail3",
			IsEng:        true,
			IsPrivate:    false,
		},
		{
			ID: articleID4.String(),
			PlatformID: null.String{
				String: mockPlatforms[3].ID,
				Valid:  true,
			},
			Title:        "article_title_4",
			Description:  "article_description_4",
			ArticleURL:   "https://article.example4.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_4"),
			Tags:         null.StringFrom("tag1,tag4"),
			ThumbnailURL: "https://article.example1.com/thumbnail4",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID5.String(),
			PlatformID: null.String{
				String: mockPlatforms[4].ID,
				Valid:  true,
			},
			Title:        "article_title_5",
			Description:  "article_description_5",
			ArticleURL:   "https://article.example5.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_5"),
			Tags:         null.StringFrom("tag1,tag5"),
			ThumbnailURL: "https://article.example1.com/thumbnail5",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID6.String(),
			PlatformID: null.String{
				String: mockPlatforms[5].ID,
				Valid:  true,
			},
			Title:        "article_title_6",
			Description:  "article_description_6",
			ArticleURL:   "https://article.example6.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_6"),
			Tags:         null.StringFrom("tag1,tag6"),
			ThumbnailURL: "https://article.example1.com/thumbnail6",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID7.String(),
			PlatformID: null.String{
				String: mockPlatforms[6].ID,
				Valid:  true,
			},
			Title:        "article_title_7",
			Description:  "article_description_7",
			ArticleURL:   "https://article.example7.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_7"),
			Tags:         null.StringFrom("tag1,tag7"),
			ThumbnailURL: "https://article.example1.com/thumbnail7",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID8.String(),
			PlatformID: null.String{
				String: mockPlatforms[7].ID,
				Valid:  true,
			},
			Title:        "article_title_8",
			Description:  "article_description_8",
			ArticleURL:   "https://article.example8.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_8"),
			Tags:         null.StringFrom("tag1,tag8"),
			ThumbnailURL: "https://article.example1.com/thumbnail8",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID9.String(),
			PlatformID: null.String{
				String: mockPlatforms[8].ID,
				Valid:  true,
			},
			Title:        "article_title_9",
			Description:  "article_description_9",
			ArticleURL:   "https://article.example9.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_9"),
			Tags:         null.StringFrom("tag1,tag9"),
			ThumbnailURL: "https://article.example1.com/thumbnail9",
			IsEng:        false,
			IsPrivate:    false,
		},
		{
			ID: articleID10.String(),
			PlatformID: null.String{
				String: mockPlatforms[9].ID,
				Valid:  true,
			},
			Title:        "article_title_10",
			Description:  "article_description_10",
			ArticleURL:   "https://article.example10.com",
			PublishedAt:  null.TimeFrom(publishedAt),
			AuthorName:   null.StringFrom("author_name_10"),
			Tags:         null.StringFrom("tag1,tag10"),
			ThumbnailURL: "https://article.example1.com/thumbnail10",
			IsEng:        false,
			IsPrivate:    false,
		},
	}
}

func GetArticleMock() []entity.Article {
	return mockArticles
}
