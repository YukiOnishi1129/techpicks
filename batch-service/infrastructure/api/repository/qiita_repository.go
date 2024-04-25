package repository

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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

type APIResponse struct {
	Data string `json:"data"`
}

func (qr *QiitaRepository) GetQiitaArticles(id string) (QiitaItem, error) {
	url := fmt.Sprintf("https://qiita.com/api/v2/items/%s", id)
	//req, err := http.NewRequest(http.MethodGet, url, nil)
	resp, err := http.Get(url)
	if err != nil {
		return QiitaItem{}, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return QiitaItem{}, err
	}

	var data QiitaItem
	if err := json.Unmarshal(body, &data); err != nil {
		return QiitaItem{}, err
	}

	return data, nil
}
