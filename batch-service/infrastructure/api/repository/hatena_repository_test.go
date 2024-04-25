package repository

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	"testing"
)

func TestHatenaRepository_GetHatenaArticles(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name      string
		targetURL string
	}{
		{
			name:      "Success: GetHatenaArticles",
			targetURL: "https://zenn.dev/yukionishi/articles/4c02ece789c34daadda5",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			apiClient := client.NewAPIClient()
			r := NewRepository(&Params{
				APIClient: apiClient,
			})
			count, err := r.GetHatenaArticles(tt.targetURL)
			if err != nil {
				t.Errorf("failed to get hatena articles: %v", err)
			}
			if count < 0 {
				t.Errorf("failed to get hatena articles: %v", count)
			}
		})
	}
}
