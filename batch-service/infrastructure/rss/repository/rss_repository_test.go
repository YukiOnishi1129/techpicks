package repository

import (
	"testing"
)

func TestRSSRepository_GetRSS(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name    string
		rssURL  string
		siteURL string
	}{
		{
			name:    "Success: GetRss",
			rssURL:  "https://zenn.dev/feed",
			siteURL: "https://menthas.com/javascript/rss",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			//rssClient := client.NewRSSClient()
			//rr := NewRepository(&Params{
			//	RSSClient: rssClient,
			//})
			//rss, err := rr.GetRSS(tt.rssURL)
			//if err != nil {
			//	t.Errorf("failed to get rss: %v", err)
			//}
			//if len(rss) == 0 {
			//	t.Errorf("failed to get rss: %v", rss)
			//}

		})
	}
}
