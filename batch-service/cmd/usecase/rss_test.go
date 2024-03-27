package usecase

import "testing"

func TestGetRss(t *testing.T) {
	tests := []struct {
		name   string
		rssURL string
	}{
		{
			name:   "Success: GetRss",
			rssURL: "https://techblog.gaudiy.com/rss",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			GetRSS(tt.rssURL)
		})
	}
}
