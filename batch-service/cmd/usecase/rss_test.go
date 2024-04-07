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
			rssURL:  "https://www.toptal.com/blog.rss",
			siteURL: "https://menthas.com/javascript/rss",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			//GetRSS(tt.rssURL)
			//getFavicon(tt.siteURL)
		})
	}
}
