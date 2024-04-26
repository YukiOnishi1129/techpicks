package repository

import "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/client"

type Repository struct {
	rssClient client.RSSClient
}

type Params struct {
	RSSClient *client.RSSClient
}

func NewRepository(p *Params) *Repository {
	return &Repository{
		rssClient: *p.RSSClient,
	}
}
