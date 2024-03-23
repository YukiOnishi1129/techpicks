package usecase

import (
	"fmt"
	"github.com/mmcdole/gofeed"
	"github.com/otiai10/opengraph"
)

type RSS struct {
	Title       string
	Link        string
	Description string
	Published   string
	Image       string
}

func GetRSS(rssURL string) ([]RSS, error) {
	//var wg sync.WaitGroup
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(rssURL)
	if err != nil {
		return nil, err
	}
	items := feed.Items
	rss := make([]RSS, len(items))
	//wg.Add(1)
	//go func(items []*gofeed.Item) {
	//defer wg.Done()
	for i, item := range items {
		image, err := getOGPImage(item.Link)
		if err != nil {
			println(fmt.Sprintf("【image】: %s\n", image))
			continue
		}
		rss[i] = RSS{
			Title:       item.Title,
			Link:        item.Link,
			Description: item.Description,
			Published:   item.Published,
			Image:       image,
		}
	}
	//}(items)
	//wg.Wait()
	return rss, nil
}

func getOGPImage(url string) (string, error) {
	ogp, err := opengraph.Fetch(url)
	if err != nil {
		return "", err
	}
	if len(ogp.Image) != 0 {
		return ogp.Image[0].URL, nil
	}
	return "", nil
}
