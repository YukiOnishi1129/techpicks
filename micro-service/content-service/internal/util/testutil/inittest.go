package testutil

import "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util/testutil/mock"

func BeforeAllTest() {
	mock.CreatePlatformMock()
	mock.CreateCategoryMock()
	mock.CreateFeedsMock()
	mock.CreateProfileMock()
}
