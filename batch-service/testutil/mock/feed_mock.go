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
	feedID4, _ := uuid.NewUUID()
	feedID5, _ := uuid.NewUUID()
	feedID6, _ := uuid.NewUUID()
	feedID7, _ := uuid.NewUUID()
	feedID8, _ := uuid.NewUUID()
	feedID9, _ := uuid.NewUUID()
	feedID10, _ := uuid.NewUUID()
	feedID11, _ := uuid.NewUUID()
	feedID12, _ := uuid.NewUUID()
	feedID13, _ := uuid.NewUUID()
	feedID14, _ := uuid.NewUUID()

	mockFeeds = []entity.Feed{
		// site, jp
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
		// site, en
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
		// company, jp
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
		// company, en
		{
			ID:                feedID4.String(),
			PlatformID:        mockPlatforms[2].ID,
			CategoryID:        mockCategories[2].ID,
			Name:              "feed_name_4",
			Description:       "feed_description_4",
			SiteURL:           "https://feed.example4.com",
			RSSURL:            "https://feed.example4.com/rss",
			TrendPlatformType: 0,
		},
		{
			ID:                feedID5.String(),
			PlatformID:        mockPlatforms[3].ID,
			CategoryID:        mockCategories[2].ID,
			Name:              "feed_name_5",
			Description:       "feed_description_5",
			SiteURL:           "https://feed.example5.com",
			RSSURL:            "https://feed.example5.com/rss",
			TrendPlatformType: 0,
		},
		// summary, jp
		{
			ID:                feedID6.String(),
			PlatformID:        mockPlatforms[4].ID,
			CategoryID:        mockCategories[2].ID,
			Name:              "feed_name_6",
			Description:       "feed_description_6",
			SiteURL:           "https://feed.example6.com",
			RSSURL:            "https://feed.example6.com/rss",
			TrendPlatformType: 0,
		},
		// summary, en
		{
			ID:                feedID7.String(),
			PlatformID:        mockPlatforms[5].ID,
			CategoryID:        mockCategories[2].ID,
			Name:              "feed_name_7",
			Description:       "feed_description_7",
			SiteURL:           "https://feed.example7.com",
			RSSURL:            "https://feed.example7.com/rss",
			TrendPlatformType: 0,
		},
		// trend
		{
			ID:                feedID8.String(),
			PlatformID:        mockPlatforms[6].ID,
			CategoryID:        mockCategories[3].ID,
			Name:              "feed_name_8",
			Description:       "feed_description_8",
			SiteURL:           "https://feed.example8.com",
			RSSURL:            "https://feed.example8.com/rss",
			TrendPlatformType: 1,
		},
		{
			ID:                feedID9.String(),
			PlatformID:        mockPlatforms[6].ID,
			CategoryID:        mockCategories[4].ID,
			Name:              "feed_name_9",
			Description:       "feed_description_9",
			SiteURL:           "https://feed.example9.com",
			RSSURL:            "https://feed.example9.com/rss",
			TrendPlatformType: 1,
		},
		{
			ID:                feedID10.String(),
			PlatformID:        mockPlatforms[6].ID,
			CategoryID:        mockCategories[5].ID,
			Name:              "feed_name_10",
			Description:       "feed_description_10",
			SiteURL:           "https://feed.example10.com",
			RSSURL:            "https://feed.example10.com/rss",
			TrendPlatformType: 1,
		},
		{
			ID:                feedID11.String(),
			PlatformID:        mockPlatforms[7].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_11",
			Description:       "feed_description_11",
			SiteURL:           "https://feed.example11.com",
			RSSURL:            "https://feed.example11.com/rss",
			TrendPlatformType: 2,
		},
		{
			ID:                feedID12.String(),
			PlatformID:        mockPlatforms[8].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_12",
			Description:       "feed_description_12",
			SiteURL:           "https://feed.example12.com",
			RSSURL:            "https://feed.example12.com/rss",
			TrendPlatformType: 3,
		},
		{
			ID:                feedID13.String(),
			PlatformID:        mockPlatforms[9].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_13",
			Description:       "feed_description_13",
			SiteURL:           "https://feed.example13.com",
			RSSURL:            "https://feed.example13.com/rss",
			TrendPlatformType: 4,
		},
		{
			ID:                feedID14.String(),
			PlatformID:        mockPlatforms[10].ID,
			CategoryID:        mockCategories[1].ID,
			Name:              "feed_name_14",
			Description:       "feed_description_14",
			SiteURL:           "https://feed.example14.com",
			RSSURL:            "https://feed.example14.com/rss",
			TrendPlatformType: 4,
		},
	}
}

func GetFeedMock() []entity.Feed {
	return mockFeeds
}
