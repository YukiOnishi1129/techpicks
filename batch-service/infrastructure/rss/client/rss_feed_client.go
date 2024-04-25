package client

import "github.com/mmcdole/gofeed"

type Client struct {
	client *gofeed.Parser
}

func NewClient() *Client {
	return &Client{
		client: gofeed.NewParser(),
	}
}
