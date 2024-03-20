package usecase

import (
	"fmt"
	"github.com/mmcdole/gofeed"
)

func GetRSS() {
	url := "https://engineering.mercari.com/blog/feed.xml"

	fp := gofeed.NewParser()
	feed, _ := fp.ParseURL(url)

	items := feed.Items

	for _, item := range items {
		println(fmt.Sprintf("【title】: %s\n", item.Title))
		println(fmt.Sprintf("【link】: %s\n", item.Link))
		if item.Image != nil {
			println(fmt.Sprintf("【image.title】: %s\n", item.Image.Title))
			println(fmt.Sprintf("【image.url】: %s\n", item.Image.URL))
		}
		println(fmt.Sprintf("【description】: %s\n", item.Description))
		println(fmt.Sprintf("【published】: %s\n", item.Published))
		//println(fmt.Sprintf("【content】: %s\n", item.Content))
		//println(fmt.Sprintf("【author】: %s\n", item.Author))
		println(fmt.Sprintf("【guid】: %s\n", item.GUID))
		println(fmt.Sprintf("【categories】: %s\n", item.Categories))
		println(fmt.Sprintf("【enclosures】: %s\n", item.Enclosures))
		println(fmt.Sprintf("【extensions】: %s\n", item.Extensions))
		println("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
	}
}
