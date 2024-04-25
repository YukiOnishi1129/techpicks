package repository

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type QiitaRepository struct {
}

func NewQiitaRepository() *QiitaRepository {
	return &QiitaRepository{}
}

type QiitaItem struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	LikesCount int    `json:"likes_count"`
}

func (qr *QiitaRepository) GetQiitaArticles(id string) (QiitaItem, error) {
	url := fmt.Sprintf("https://qiita.com/api/v2/items/%s", id)
	resp, err := http.Get(url)
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
