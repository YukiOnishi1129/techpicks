package repository

import (
	"fmt"
	"io"
	"log"
)

type HatenaItem struct {
}

func (r *Repository) GetHatenaArticles(targetURL string) (int, error) {
	url := fmt.Sprintf("%scount/entry?url=%s", r.apiClient.GetHatenaBaseURL(), targetURL)
	resp, err := r.apiClient.GetClient().Get(url)
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
