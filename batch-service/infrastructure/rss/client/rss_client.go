package client

import "github.com/mmcdole/gofeed"

type RSSClient struct {
	rssClient *gofeed.Parser
}

func NewRSSClient() *RSSClient {
	return &RSSClient{
		rssClient: gofeed.NewParser(),
	}
}

func (rc *RSSClient) GetRSSClient() *gofeed.Parser {
	return rc.rssClient
}
