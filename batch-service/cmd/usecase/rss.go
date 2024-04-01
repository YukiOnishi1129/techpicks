package usecase

import (
	"fmt"
	"github.com/Songmu/go-httpdate"
	"github.com/mmcdole/gofeed"
	"github.com/otiai10/opengraph"
)

type RSS struct {
	Title       string
	Link        string
	Description string
	PublishedAt int
	ImageURL    string
}

func GetRSS(rssURL string) ([]RSS, error) {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(rssURL)
	if err != nil {
		return nil, err
	}
	items := feed.Items
	rss := make([]RSS, len(items))
	for i, item := range items {
		ogpImageURL, err := getOGPImage(item.Link)
		if err != nil {
			println(fmt.Sprintf("skiped url: %s\n, error: %s\n", item.Link, err))
			continue

		}
		if item.Published == "" {
			println(fmt.Sprintf("skiped published: %s\n", item.Published))
			continue
		}
		t, err := httpdate.Str2Time(item.Published, nil)
		if err != nil {
			println(fmt.Sprintf("skiped time: %s\n", t))
			continue
		}

		rss[i] = RSS{
			Title:       item.Title,
			Link:        item.Link,
			Description: item.Description,
			PublishedAt: int(t.Unix()),
			ImageURL:    ogpImageURL,
		}
	}
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

//func getMetaData(url string) (faviconURL, ogpImageURL string, err error) {
//	g := goose.New()
//	article, err := g.ExtractFromURL(url)
//	if err != nil {
//		return "", "", err
//	}
//	faviconURL = article.MetaFavicon
//	ogpImageURL = article.TopImage
//	return faviconURL, ogpImageURL, nil
//}
