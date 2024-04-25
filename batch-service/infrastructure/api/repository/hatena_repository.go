package repository

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

type HatenaRepository struct {
}

func NewHatenaRepository() *HatenaRepository {
	return &HatenaRepository{}
}

type HatenaItem struct {
}

func (hr *HatenaRepository) GetHatenaArticles(targetURL string) (int, error) {
	url := fmt.Sprintf("https://bookmark.hatenaapis.com/count/entry?url=%s", targetURL)
	resp, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			log.Fatalf("failed to close body: %v", err)
		}
	}(resp.Body)

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	var count int
	if _, err := fmt.Sscanf(string(body), "%d", &count); err != nil {
		return 0, err
	}
	return count, nil
}
