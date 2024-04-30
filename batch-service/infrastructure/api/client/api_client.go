package client

import (
	"github.com/machinebox/graphql"
	"net/http"
)

type APIClient struct {
	client          *http.Client
	hashnodeClient  *graphql.Client
	zennBaseURL     string
	qiitaBaseURL    string
	hatenaBaseURL   string
	devCommunityURL string
}

func NewAPIClient() *APIClient {
	hashnodeClient := graphql.NewClient("https://gql.hashnode.com")
	return &APIClient{
		client:          http.DefaultClient,
		hashnodeClient:  hashnodeClient,
		zennBaseURL:     "https://zenn.dev/api/",
		qiitaBaseURL:    "https://qiita.com/api/v2/",
		hatenaBaseURL:   "https://bookmark.hatenaapis.com/",
		devCommunityURL: "https://dev.to/api/",
	}
}

func (a *APIClient) GetClient() *http.Client {
	return a.client
}

func (a *APIClient) GetHashnodeClient() *graphql.Client {
	return a.hashnodeClient
}

func (a *APIClient) GetZennBaseURL() string {
	return a.zennBaseURL
}

func (a *APIClient) GetQiitaBaseURL() string {
	return a.qiitaBaseURL
}

func (a *APIClient) GetHatenaBaseURL() string {
	return a.hatenaBaseURL
}

func (a *APIClient) GetDevCommunityURL() string {
	return a.devCommunityURL
}
