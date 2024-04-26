package repository

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	"testing"
)

func TestDevCommunityRepository_GetDevCommunityArticles(t *testing.T) {
	t.Parallel()
	tagReact := "react"
	tests := []struct {
		name string
		tag  *string
	}{
		{
			name: "Success: GetDevCommunityArticles",
		},
		{
			name: "Success: GetDevCommunityArticles with tag",
			tag:  &tagReact,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			apiClient := client.NewAPIClient()
			r := NewRepository(&Params{
				APIClient: apiClient,
			})
			data, err := r.GetDevCommunityArticles(tt.tag)
			if err != nil {
				t.Errorf("failed to get dev community articles: %v", err)
			}
			if len(data) == 0 {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].Title == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].Description == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].PublishedTimestamp == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].URL == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].PublicReactionsCount < 0 {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].CoverImage == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].Tags == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
			if data[0].User.UserName == "" {
				t.Errorf("failed to get dev community articles: %v", data)
			}
		})
	}
}
