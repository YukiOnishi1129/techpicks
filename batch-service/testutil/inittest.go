package testutil

import "github.com/YukiOnishi1129/techpicks/batch-service/testutil/mock"

func BeforeAllTest() {
	mock.CreatePlatformMock()
	mock.CreateCategoryMock()
	mock.CreateFeedsMock()
}
