package usecase

import "testing"

func TestGetRss(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name    string
		rssURL  string
		siteURL string
	}{
		{
			name:    "Success: GetRss",
			rssURL:  "https://menthas.com/javascript/rss",
			siteURL: "https://menthas.com/javascript/rss",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rss, err := GetRSS(tt.rssURL)
			if err != nil {
				t.Errorf("failed to get rss: %v", err)
			}
			if len(rss) == 0 {
				t.Errorf("failed to get rss: %v", rss)
			}

			if rss[0].Link != tt.siteURL {
				t.Errorf("failed to get rss: %v", rss)
			}
		})
	}
}
