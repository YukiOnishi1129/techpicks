package mock

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
)

var mockFeeds = []entity.Feed{}

func CreateFeedsMock() {

	mockPlatforms := GetPlatformMock()
	mockCategories := GetCategoryMock()

	feedID1, _ := uuid.NewUUID()
	feedID2, _ := uuid.NewUUID()
	feedID3, _ := uuid.NewUUID()

	mockFeeds = []entity.Feed{
		{
			ID:                feedID1.String(),
			PlatformID:        mockPlatforms[0].ID,
			CategoryID:        mockCategories[0].ID,
			Name:              "feed_name_1",
			Description:       "feed_description_1",
			SiteURL:           "https://feed.example1.com",
			RSSURL:            "https://feed.example1.com/rss",
			TrendPlatformType: 0,
		},
		{
			ID:                feedID2.String(),
			PlatformID:        mockPlatforms[1].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_2",
			Description:       "feed_description_2",
			SiteURL:           "https://feed.example2.com",
			RSSURL:            "https://feed.example2.com/rss",
			TrendPlatformType: 0,
		},
		{
			ID:                feedID3.String(),
			PlatformID:        mockPlatforms[0].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_3",
			Description:       "feed_description_3",
			SiteURL:           "https://feed.example3.com",
			RSSURL:            "https://feed.example3.com/rss",
			TrendPlatformType: 0,
		},
	}
}

func GetFeedMock() []entity.Feed {
	return mockFeeds
}
