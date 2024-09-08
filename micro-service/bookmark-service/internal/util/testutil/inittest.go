package testutil

import "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util/testutil/mock"

func BeforeAllTest() {
	mock.CreatePlatformMock()
	mock.CreateProfileMock()
	mock.CreateArticleMock()
}
