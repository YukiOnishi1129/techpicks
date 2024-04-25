package repository

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type ZennRepository struct {
}

func NewZennRepository() *ZennRepository {
	return &ZennRepository{}
}

type ZennResponse struct {
	Articles []ZennItem `json:"articles"`
}

type ZennItem struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	LikedCount int    `json:"liked_count"`
	Slug       string `json:"slug"`
}

func (zr *ZennRepository) GetZennArticles(userName string) (ZennResponse, error) {
	url := fmt.Sprintf("https://zenn.dev/api/articles/?username=%s&order=latest", userName)
	resp, err := http.Get(url)
	if err != nil {
		return ZennResponse{}, err
	}
	defer resp.Body.Close()

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
