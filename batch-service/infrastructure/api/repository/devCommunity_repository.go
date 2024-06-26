package repository

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
)

type DevCommunityItem struct {
	Title                string           `json:"title"`
	Description          string           `json:"description"`
	PublishedTimestamp   string           `json:"published_timestamp"`
	URL                  string           `json:"url"`
	PublicReactionsCount int              `json:"public_reactions_count"`
	CoverImage           string           `json:"cover_image"`
	Tags                 string           `json:"tags"`
	User                 DevCommunityUser `json:"user"`
}

type DevCommunityUser struct {
	UserName string `json:"username"`
}

func (r *Repository) GetDevCommunityArticles(tag *string) ([]DevCommunityItem, error) {
	url := fmt.Sprintf("%sarticles?top=7", r.apiClient.GetDevCommunityURL())
	if tag != nil && *tag != "" {
		url = fmt.Sprintf("%s&tag=%s", url, *tag)
	}
	resp, err := r.apiClient.GetClient().Get(url)
	if err != nil {
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			log.Fatalf("failed to close body: %v", err)
		}
	}(resp.Body)
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	data := make([]DevCommunityItem, 0)
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, err
	}
	return data, nil
}
