package mock

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
)

var mockCategories = []entity.Category{}

func CreateCategoryMock() {
	categoryID1, _ := uuid.NewUUID()
	categoryID2, _ := uuid.NewUUID()
	categoryID3, _ := uuid.NewUUID()
	categoryID4, _ := uuid.NewUUID()
	categoryID5, _ := uuid.NewUUID()
	categoryID6, _ := uuid.NewUUID()
	categoryID7, _ := uuid.NewUUID()
	categoryID8, _ := uuid.NewUUID()

	mockCategories = []entity.Category{
		{
			ID:   categoryID1.String(),
			Name: "category_name_1",
		},
		{
			ID:   categoryID2.String(),
			Name: "category_name_2",
		},
		{
			ID:   categoryID3.String(),
			Name: "category_name_3",
		},
		{
			ID:   categoryID4.String(),
			Name: "category_name_4",
		},
		{
			ID:   categoryID5.String(),
			Name: "category_name_5",
		},
		{
			ID:   categoryID6.String(),
			Name: "category_name_6",
		},
		{
			ID:   categoryID7.String(),
			Name: "category_name_7",
		},
		{
			ID:   categoryID8.String(),
			Name: "category_name_8",
		},
	}
}

func GetCategoryMock() []entity.Category {
	return mockCategories
}
