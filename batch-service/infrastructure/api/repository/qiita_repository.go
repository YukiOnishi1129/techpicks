package repository

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
)

type QiitaItem struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	LikesCount int    `json:"likes_count"`
}

func (r *Repository) GetQiitaArticles(id string) (QiitaItem, error) {
	url := fmt.Sprintf("%sitems/%s", r.apiClient.GetQiitaBaseURL(), id)
	resp, err := r.apiClient.GetClient().Get(url)
	if err != nil {
		return QiitaItem{}, err
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			log.Fatalf("failed to close body: %v", err)
		}
	}(resp.Body)

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return QiitaItem{}, err
	}

	var data QiitaItem
	if err := json.Unmarshal(body, &data); err != nil {
		return QiitaItem{}, err
	}

	return data, nil
}
