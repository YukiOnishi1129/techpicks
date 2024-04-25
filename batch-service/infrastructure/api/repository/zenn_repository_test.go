package repository

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	"testing"
)

func TestZennRepository_GetZennArticles(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		userName string
	}{
		{
			name:     "Success: GetZennArticles",
			userName: "yukionishi",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			apiClient := client.NewAPIClient()
			r := NewRepository(&Params{
				APIClient: apiClient,
			})
			data, err := r.GetZennArticles(tt.userName)
			if err != nil {
				t.Errorf("failed to get zenn articles: %v", err)
			}
			if len(data.Articles) == 0 {
				t.Errorf("failed to get zenn articles: %v", data)
			}
			if data.Articles[0].ID < 0 {
				t.Errorf("failed to get zenn articles: %v", data)
			}
			if data.Articles[0].LikedCount < 0 {
				t.Errorf("failed to get zenn articles: %v", data)
			}
			if data.Articles[0].Slug == "" {
				t.Errorf("failed to get zenn articles: %v", data)
			}
		})
	}
}
