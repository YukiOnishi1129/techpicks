package repository

import "testing"

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
			zr := NewZennRepository()
			data, err := zr.GetZennArticles(tt.userName)
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
