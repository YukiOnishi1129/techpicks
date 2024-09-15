package mock

import (
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/google/uuid"
)

var mockProfiles = []entity.Profile{}

func CreateProfileMock() {
	profileID1, _ := uuid.NewUUID()
	profileID2, _ := uuid.NewUUID()
	profileID3, _ := uuid.NewUUID()

	mockProfiles = []entity.Profile{
		{
			ID:           profileID1.String(),
			Name:         "user_name_1",
			Email:        "user1@gmail.com",
			Image:        "https://user1.example1.com",
			IsSuperAdmin: false,
		},
		{
			ID:           profileID2.String(),
			Name:         "user_name_2",
			Email:        "user2@gmail.com",
			Image:        "https://user2.example1.com",
			IsSuperAdmin: false,
		},
		{
			ID:           profileID3.String(),
			Name:         "user_name_3",
			Email:        "user3@gmail.com",
			Image:        "https://user3.example1.com",
			IsSuperAdmin: false,
		},
	}
}

func GetProfileMock() []entity.Profile {
	return mockProfiles
}
