package repository

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	"testing"
)

func TestQiitaRepository_GetQiitaArticles(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		id   string
	}{
		{
			name: "Success: GetQiitaArticles",
			id:   "2fcda5a350bd3655e676",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			apiClient := client.NewAPIClient()
			r := NewRepository(&Params{
				APIClient: apiClient,
			})
			_, err := r.GetQiitaArticles(tt.id)
			if err != nil {
				t.Errorf("failed to get qiita articles: %v", err)
			}
		})
	}
}
