package repository

import "testing"

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
			hr := NewHatenaRepository()
			count, err := hr.GetHatenaArticles(tt.targetURL)
			if err != nil {
				t.Errorf("failed to get hatena articles: %v", err)
			}
			if count < 0 {
				t.Errorf("failed to get hatena articles: %v", count)
			}
		})
	}
}
