package repository

import (
	"context"
	"fmt"
	"github.com/Songmu/go-httpdate"
	"github.com/otiai10/opengraph"
	"time"
)

type RSS struct {
	Title       string
	Link        string
	Description string
	PublishedAt int
	ImageURL    string
	Tags        string
	AuthorName  string
}

func (r *Repository) GetRSS(rssURL string) ([]RSS, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	feed, err := r.rssClient.GetRSSClient().ParseURLWithContext(rssURL, ctx)
	if err != nil {
		println(fmt.Sprintf("error: %s\n", err))
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

		if len(item.Authors) != 0 {
			rss[i].AuthorName = item.Authors[0].Name
		}
		if len(item.Categories) != 0 {
			tags := ""
			for i, tag := range item.Categories {
				if i != 0 {
					tags = fmt.Sprintf("%s,%s", tags, tag)
					continue
				}
				tags = tag
			}
			rss[i].Tags = tags
		}
	}
	return rss, nil
}

func getOGPImage(url string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	ogp, err := opengraph.FetchWithContext(ctx, url)
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
