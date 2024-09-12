package mock

import (
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/google/uuid"
)

var mockPlatforms = []entity.Platform{}

func CreatePlatformMock() {
	platformID1, _ := uuid.NewUUID()
	platformID2, _ := uuid.NewUUID()
	platformID3, _ := uuid.NewUUID()
	platformID4, _ := uuid.NewUUID()
	platformID5, _ := uuid.NewUUID()
	platformID6, _ := uuid.NewUUID()
	platformID7, _ := uuid.NewUUID()
	platformID8, _ := uuid.NewUUID()
	platformID9, _ := uuid.NewUUID()
	platformID10, _ := uuid.NewUUID()
	platformID11, _ := uuid.NewUUID()

	mockPlatforms = []entity.Platform{
		{
			ID:               platformID1.String(),
			Name:             "platform_name_1",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example1.com",
			FaviconURL:       "https://platform.example1.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID2.String(),
			Name:             "platform_name_2",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example2.com",
			FaviconURL:       "https://platform.example2.com/favicon",
			IsEng:            true,
		},
		{
			ID:               platformID3.String(),
			Name:             "platform_name_3",
			PlatformSiteType: 2,
			SiteURL:          "https://platform.example3.com",
			FaviconURL:       "https://platform.example3.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID4.String(),
			Name:             "platform_name_4",
			PlatformSiteType: 2,
			SiteURL:          "https://platform.example4.com",
			FaviconURL:       "https://platform.example4.com/favicon",
			IsEng:            true,
		},
		{
			ID:               platformID5.String(),
			Name:             "platform_name_5",
			PlatformSiteType: 3,
			SiteURL:          "https://platform.example5.com",
			FaviconURL:       "https://platform.example5.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID6.String(),
			Name:             "platform_name_6",
			PlatformSiteType: 3,
			SiteURL:          "https://platform.example6.com",
			FaviconURL:       "https://platform.example6.com/favicon",
			IsEng:            true,
		},
		// trend
		{
			ID:               platformID7.String(),
			Name:             "platform_name_7",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example7.com",
			FaviconURL:       "https://platform.example7.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID8.String(),
			Name:             "platform_name_8",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example8.com",
			FaviconURL:       "https://platform.example8.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID9.String(),
			Name:             "platform_name_9",
			PlatformSiteType: 3,
			SiteURL:          "https://platform.example9.com",
			FaviconURL:       "https://platform.example9.com/favicon",
			IsEng:            false,
		},
		{
			ID:               platformID10.String(),
			Name:             "platform_name_10",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example10.com",
			FaviconURL:       "https://platform.example10.com/favicon",
			IsEng:            true,
		},
		{
			ID:               platformID11.String(),
			Name:             "platform_name_11",
			PlatformSiteType: 1,
			SiteURL:          "https://platform.example11.com",
			FaviconURL:       "https://platform.example11.com/favicon",
			IsEng:            true,
		},
	}
}

func GetPlatformMock() []entity.Platform {
	return mockPlatforms
}
