package usecase

import "testing"

func TestGetRss(t *testing.T) {
	tests := []struct {
		name    string
		rssURL  string
		siteURL string
	}{
		{
			name:    "Success: GetRss",
			rssURL:  "https://medium.com/feed/tag/nextjs",
			siteURL: "https://zenn.dev/itta/articles/a1cc436afbc901",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			//GetRSS(tt.rssURL)
			//getFavicon(tt.siteURL)
		})
	}
}
