package repository

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
)

type ZennResponse struct {
	Articles []ZennItem `json:"articles"`
}

type ZennItem struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	LikedCount  int    `json:"liked_count"`
	PublishedAt string `json:"published_at"`
	Slug        string `json:"slug"`
	Path        string `json:"path"`
}

func (r *Repository) GetZennArticles() (ZennResponse, error) {
	url := fmt.Sprintf("%sarticles/", r.apiClient.GetZennBaseURL())
	resp, err := r.apiClient.GetClient().Get(url)
	if err != nil {
		return ZennResponse{}, err
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			log.Fatalf("failed to close body: %v", err)
		}
	}(resp.Body)

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ZennResponse{}, err
	}

	var data ZennResponse
	if err := json.Unmarshal(body, &data); err != nil {
		return ZennResponse{}, err
	}

	return data, nil
}
