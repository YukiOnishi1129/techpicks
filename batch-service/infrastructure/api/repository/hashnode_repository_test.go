package repository

import (
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	"testing"
)

func TestRepository_GetHashnodeArticles(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		tag  string
	}{
		//{
		//	name: "Success: GetHashnodeArticles",
		//	tag:  "",
		//},
		{
			name: "Success: GetHashnodeArticles with tag",
			tag:  "584879f0c0aaf085e2012086",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			apiClient := client.NewAPIClient()
			r := NewRepository(&Params{
				APIClient: apiClient,
			})

			arg := GetHashnodeArticlesArg{}
			if tt.tag != "" {
				arg.Tag = &tt.tag
			}
			_, err := r.GetHashnodeArticles(arg)
			if err != nil {
				t.Errorf("failed to get hashnode articles: %v", err)
			}
		})
	}
}
