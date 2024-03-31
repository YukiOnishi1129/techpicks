package seeders

import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	goose "github.com/advancedlogic/GoOse"
	"github.com/google/uuid"
)

type PlatformSeedInterface interface {
	SeedPlatform(ctx context.Context) error
}

type PlatformSeed struct {
	Client *firestore.Client
}

func NewPlatformSeed(client *firestore.Client) *PlatformSeed {
	return &PlatformSeed{Client: client}
}

func (ps *PlatformSeed) SeedPlatform(ctx context.Context) error {
	batch := ps.Client.BulkWriter(ctx)
	iter := ps.Client.Collection("platforms").Documents(ctx)

	platforms := getPlatformDatas()
	for _, p := range platforms {
		isSkip := false
		for {
			doc, err := iter.Next()
			if err != nil {
				break
			}
			data := doc.Data()
			if data["site_url"].(string) == p.SiteURL {
				isSkip = true
				break
			}
		}
		if isSkip {
			fmt.Printf("skip: %s\n", p.Name)
			continue
		}

		platformID, err := uuid.NewUUID()
		if err != nil {
			return err
		}
		now := time.Now().Unix()
		faviconURL, ogpImageURL, err := getMetaData(p.SiteURL)
		if err != nil {
			fmt.Printf("getMetaData err: skiped url: %s\n, error: %s\n", p.SiteURL, err)
			continue
		}
		ref := ps.Client.Collection("platforms").Doc(platformID.String())

		platforms := domain.PlatformFirestore{
			Name:              p.Name,
			CategoryName:      p.CategoryName,
			RssURL:            p.RssURL,
			SiteURL:           p.SiteURL,
			PlatformType:      p.PlatformType,
			IsEng:             p.IsEng,
			ThumbnailImageURL: ogpImageURL,
			FaviconURL:        faviconURL,
			CreatedAt:         int(now),
			UpdatedAt:         int(now),
			DeletedAt:         nil,
		}

		if p.DeletedAt != nil {
			platforms.DeletedAt = p.DeletedAt
		}
		_, err = batch.Set(ref, platforms)
		if err != nil {
			return err
		}
	}
	batch.Flush()
	return nil
}

func getMetaData(url string) (faviconURL, ogpImageURL string, err error) {
	g := goose.New()
	article, err := g.ExtractFromURL(url)
	if err != nil {
		return "", "", err
	}
	faviconURL = article.MetaFavicon
	ogpImageURL = article.TopImage
	return faviconURL, ogpImageURL, nil
}

func getPlatformDatas() []domain.PlatformFirestore {
	deletedAt := int(time.Now().Unix())
	return []domain.PlatformFirestore{
		{
			Name:         "Qiita",
			CategoryName: "trend",
			RssURL:       "https://qiita.com/popular-items/feed.atom",
			SiteURL:      "https://qiita.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "all",
			RssURL:       "https://zenn.dev/feed",
			SiteURL:      "https://zenn.dev/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "はてなブックマーク",
			CategoryName: "technology",
			RssURL:       "https://b.hatena.ne.jp/hotentry/it.rss",
			SiteURL:      "https://b.hatena.ne.jp/hotentry/it",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "dev.to",
			CategoryName: "all",
			RssURL:       "https://dev.to/feed",
			SiteURL:      "https://dev.to/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "A List Apart",
			CategoryName: "",
			RssURL:       "https://alistapart.com/main/feed/",
			SiteURL:      "https://alistapart.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "David Walsh Blog",
			CategoryName: "",
			RssURL:       "https://davidwalsh.name/feed/atom",
			SiteURL:      "https://davidwalsh.name/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "JavaScript Playground",
			CategoryName: "",
			RssURL:       "https://www.jackfranklin.co.uk/feed.xml",
			SiteURL:      "https://www.jackfranklin.co.uk/blog/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Stack Overflow",
			CategoryName: "",
			RssURL:       "https://stackoverflow.com/feeds",
			SiteURL:      "https://stackoverflow.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
			DeletedAt:    &deletedAt,
		},
		{
			Name:         "free code camp",
			CategoryName: "all",
			RssURL:       "https://www.freecodecamp.org/news/rss/",
			SiteURL:      "https://www.freecodecamp.org/news/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Developer.io",
			CategoryName: "",
			RssURL:       "https://dev.classmethod.jp/feed/",
			SiteURL:      "https://dev.classmethod.jp/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "google japan",
			CategoryName: "",
			RssURL:       "https://developers-jp.googleblog.com/atom.xml",
			SiteURL:      "https://developers-jp.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "楽天　ラクマ事業部",
			CategoryName: "",
			RssURL:       "https://www.wantedly.com/stories/s/rakuma/rss.xml",
			SiteURL:      "https://www.wantedly.com/stories/s/rakuma",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CyberAgent",
			CategoryName: "",
			RssURL:       "https://developers.cyberagent.co.jp/blog/feed/",
			SiteURL:      "https://developers.cyberagent.co.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "paypay",
			CategoryName: "",
			RssURL:       "https://blog.paypay.ne.jp/category/engineering/feed/",
			SiteURL:      "https://blog.paypay.ne.jp/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "メルカリ",
			CategoryName: "",
			RssURL:       "https://engineering.mercari.com/blog/feed.xml",
			SiteURL:      "https://engineering.mercari.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "NTT",
			CategoryName: "",
			RssURL:       "https://engineers.ntt.com/feed",
			SiteURL:      "https://engineers.ntt.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Qiita (企業)",
			CategoryName: "",
			RssURL:       "https://blog.qiita.com/feed/",
			SiteURL:      "https://blog.qiita.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Cybozu",
			CategoryName: "",
			RssURL:       "https://blog.cybozu.io/feed",
			SiteURL:      "https://blog.cybozu.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "mixi",
			CategoryName: "",
			RssURL:       "https://mixi-developers.mixi.co.jp/feed",
			SiteURL:      "https://mixi-developers.mixi.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "GREE",
			CategoryName: "",
			RssURL:       "https://labs.gree.jp/blog/feed/",
			SiteURL:      "https://labs.gree.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ZOZO",
			CategoryName: "",
			RssURL:       "https://techblog.zozo.com/rss",
			SiteURL:      "https://techblog.zozo.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "DeNA",
			CategoryName: "",
			RssURL:       "https://engineering.dena.com/index.xml",
			SiteURL:      "https://engineering.dena.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "リクルートテクノロジーズ",
			CategoryName: "",
			RssURL:       "https://blog.recruit.co.jp/rtc/feed/",
			SiteURL:      "https://blog.recruit.co.jp/rtc/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "dwango on GitHub",
			CategoryName: "",
			RssURL:       "https://dwango.github.io/index.xml",
			SiteURL:      "https://dwango.github.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "SanSan",
			CategoryName: "",
			RssURL:       "https://buildersbox.corp-sansan.com/rss",
			SiteURL:      "https://buildersbox.corp-sansan.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "HRBrain",
			CategoryName: "",
			RssURL:       "https://times.hrbrain.co.jp/rss",
			SiteURL:      "https://times.hrbrain.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Lineヤフー",
			CategoryName: "",
			RssURL:       "https://techblog.lycorp.co.jp/ja/feed/index.xml",
			SiteURL:      "https://techblog.lycorp.co.jp/ja",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Sony Music",
			CategoryName: "",
			RssURL:       "https://tech.sme.co.jp/rss",
			SiteURL:      "https://tech.sme.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "IBM",
			CategoryName: "",
			RssURL:       "https://www.ibm.com/blogs/solutions/jp-ja/feed/atom/",
			SiteURL:      "https://www.ibm.com/blogs/solutions/jp-ja/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "カミナシ",
			CategoryName: "",
			RssURL:       "https://kaminashi-developer.hatenablog.jp/rss",
			SiteURL:      "https://kaminashi-developer.hatenablog.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ANDPAD",
			CategoryName: "",
			RssURL:       "https://tech.andpad.co.jp/rss",
			SiteURL:      "https://tech.andpad.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "gaudiy",
			CategoryName: "",
			RssURL:       "https://techblog.gaudiy.com/rss",
			SiteURL:      "https://techblog.gaudiy.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws amazon web services",
			CategoryName: "",
			RssURL:       "https://aws.amazon.com/jp/blogs/news/feed/",
			SiteURL:      "https://aws.amazon.com/jp/blogs/news/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws startup",
			CategoryName: "",
			RssURL:       "https://aws.amazon.com/jp/blogs/startup/feed/",
			SiteURL:      "https://aws.amazon.com/jp/blogs/startup/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "LayerX",
			CategoryName: "",
			RssURL:       "https://tech.layerx.co.jp/rss",
			SiteURL:      "https://tech.layerx.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UPSIDER",
			CategoryName: "",
			RssURL:       "https://tech.up-sider.com/rss",
			SiteURL:      "https://tech.up-sider.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CADDI",
			CategoryName: "",
			RssURL:       "https://caddi.tech/rss",
			SiteURL:      "https://caddi.tech/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UZABASE",
			CategoryName: "",
			RssURL:       "https://tech.uzabase.com/rss/category/Blog",
			SiteURL:      "https://tech.uzabase.com/archive/category/Blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "BASE",
			CategoryName: "",
			RssURL:       "https://devblog.thebase.in/rss",
			SiteURL:      "https://devblog.thebase.in/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "タイミー",
			CategoryName: "",
			RssURL:       "https://tech.timee.co.jp/rss",
			SiteURL:      "https://tech.timee.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "はてな開発者ブログ",
			CategoryName: "",
			RssURL:       "https://developer.hatenastaff.com/rss",
			SiteURL:      "https://developer.hatenastaff.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Money Forward",
			CategoryName: "",
			RssURL:       "https://moneyforward-dev.jp/rss",
			SiteURL:      "https://moneyforward-dev.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "pixiv",
			CategoryName: "",
			RssURL:       "https://inside.pixiv.blog/rss",
			SiteURL:      "https://inside.pixiv.blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "speee",
			CategoryName: "",
			RssURL:       "https://tech.speee.jp/rss",
			SiteURL:      "https://tech.speee.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Gunosy",
			CategoryName: "",
			RssURL:       "https://tech.gunosy.io/rss",
			SiteURL:      "https://tech.gunosy.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "クックパッド",
			CategoryName: "",
			RssURL:       "https://techlife.cookpad.com/rss",
			SiteURL:      "https://techlife.cookpad.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "wantedly",
			CategoryName: "",
			RssURL:       "https://www.wantedly.com/stories/s/wantedly_engineers/rss.xml",
			SiteURL:      "https://www.wantedly.com/stories/s/wantedly_engineers",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ABEJA",
			CategoryName: "",
			RssURL:       "https://tech-blog.abeja.asia/rss",
			SiteURL:      "https://tech-blog.abeja.asia/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "AppBrew",
			CategoryName: "",
			RssURL:       "https://tech.appbrew.io/rss",
			SiteURL:      "https://tech.appbrew.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "エウレカ",
			CategoryName: "",
			RssURL:       "https://medium.com/feed/eureka-engineering",
			SiteURL:      "https://medium.com/eureka-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Airbnb",
			CategoryName: "",
			RssURL:       "https://medium.com/feed/airbnb-engineering",
			SiteURL:      "https://medium.com/airbnb-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Atlassian",
			CategoryName: "",
			RssURL:       "https://blog.developer.atlassian.com/feed/",
			SiteURL:      "https://blog.developer.atlassian.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Docker",
			CategoryName: "",
			RssURL:       "https://www.docker.com/feed/",
			SiteURL:      "https://www.docker.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Facebook",
			CategoryName: "",
			RssURL:       "https://engineering.fb.com/feed/",
			SiteURL:      "https://engineering.fb.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "GitHub",
			CategoryName: "",
			RssURL:       "https://github.blog/category/engineering/feed/",
			SiteURL:      "https://github.blog/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Google",
			CategoryName: "",
			RssURL:       "https://www.blogger.com/feeds/596098824972435195/posts/default",
			SiteURL:      "https://developers.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Instagram",
			CategoryName: "",
			RssURL:       "https://instagram-engineering.com/feed",
			SiteURL:      "https://instagram-engineering.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Netflix",
			CategoryName: "",
			RssURL:       "https://netflixtechblog.com/feed",
			SiteURL:      "https://netflixtechblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "PayPal",
			CategoryName: "",
			RssURL:       "https://medium.com/feed/paypal-tech",
			SiteURL:      "https://medium.com/paypal-tech",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Salesforce",
			CategoryName: "",
			RssURL:       "https://engineering.salesforce.com/feed/",
			SiteURL:      "https://engineering.salesforce.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Zoom",
			CategoryName: "",
			RssURL:       "https://medium.com/feed/zoom-developer-blog",
			SiteURL:      "https://medium.com/zoom-developer-blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Asana",
			CategoryName: "",
			RssURL:       "https://blog.asana.com/category/eng/feed/",
			SiteURL:      "https://blog.asana.com/category/eng/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "mercari",
			CategoryName: "",
			RssURL:       "https://engineering.mercari.com/en/blog/feed.xml",
			SiteURL:      "https://engineering.mercari.com/en/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "ROUTE 06",
			CategoryName: "",
			RssURL:       "https://tech.route06.co.jp/feed",
			SiteURL:      "https://tech.route06.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "スタディサプリ",
			CategoryName: "",
			RssURL:       "https://blog.studysapuri.jp/rss",
			SiteURL:      "https://blog.studysapuri.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Menthas",
			CategoryName: "all",
			RssURL:       "https://menthas.com/all/rss",
			SiteURL:      "https://menthas.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Menthas",
			CategoryName: "programming",
			RssURL:       "https://menthas.com/programming/rss",
			SiteURL:      "https://menthas.com/programming",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Menthas",
			CategoryName: "javascript",
			RssURL:       "https://menthas.com/javascript/rss",
			SiteURL:      "https://menthas.com/javascript",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Menthas",
			CategoryName: "infrastructure",
			RssURL:       "https://menthas.com/infrastructure/rss",
			SiteURL:      "https://menthas.com/infrastructure",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "React",
			RssURL:       "https://zenn.dev/topics/react/feed",
			SiteURL:      "https://zenn.dev/topics/react",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "Next.js",
			RssURL:       "https://zenn.dev/topics/nextjs/feed",
			SiteURL:      "https://zenn.dev/topics/nextjs",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "React Native",
			RssURL:       "https://zenn.dev/topics/reactnative/feed",
			SiteURL:      "https://zenn.dev/topics/reactnative",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "JavaScript",
			RssURL:       "https://zenn.dev/topics/javascript/feed",
			SiteURL:      "https://zenn.dev/topics/javascript",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "TypeScript",
			RssURL:       "https://zenn.dev/topics/typescript/feed",
			SiteURL:      "https://zenn.dev/topics/typescript",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "Node.js",
			RssURL:       "https://zenn.dev/topics/nodejs/feed",
			SiteURL:      "https://zenn.dev/topics/nodejs",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "Golang",
			RssURL:       "https://zenn.dev/topics/go/feed",
			SiteURL:      "https://zenn.dev/topics/go",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "AWS",
			RssURL:       "https://zenn.dev/topics/aws/feed",
			SiteURL:      "https://zenn.dev/topics/aws",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "GCP",
			RssURL:       "https://zenn.dev/topics/gcp/feed",
			SiteURL:      "https://zenn.dev/topics/gcp",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "Docker",
			RssURL:       "https://zenn.dev/topics/docker/feed",
			SiteURL:      "https://zenn.dev/topics/docker",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "GraphQL",
			RssURL:       "https://zenn.dev/topics/graphql/feed",
			SiteURL:      "https://zenn.dev/topics/graphql",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "GitHub",
			RssURL:       "https://zenn.dev/topics/github/feed",
			SiteURL:      "https://zenn.dev/topics/github",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "GitHub Actions",
			RssURL:       "https://zenn.dev/topics/githubactions/feed",
			SiteURL:      "https://zenn.dev/topics/githubactions",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "ChatGPT",
			RssURL:       "https://zenn.dev/topics/chatgpt/feed",
			SiteURL:      "https://zenn.dev/topics/chatgpt",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "個人開発",
			RssURL:       "https://zenn.dev/topics/個人開発/feed",
			SiteURL:      "https://zenn.dev/topics/個人開発",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "frontend",
			RssURL:       "https://zenn.dev/topics/frontend/feed",
			SiteURL:      "https://zenn.dev/topics/frontend",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Zenn",
			CategoryName: "Test",
			RssURL:       "https://zenn.dev/topics/test/feed",
			SiteURL:      "https://zenn.dev/topics/test",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "Hashnode",
			CategoryName: "React",
			RssURL:       "https://hashnode.com/n/reactjs/rss",
			SiteURL:      "https://hashnode.com/n/reactjs",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Next.js",
			RssURL:       "https://hashnode.com/n/nextjs/rss",
			SiteURL:      "https://hashnode.com/n/nextjs",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "React Native",
			RssURL:       "https://hashnode.com/n/react-native/rss",
			SiteURL:      "https://hashnode.com/n/react-native",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Expo",
			RssURL:       "https://hashnode.com/n/expo/rss",
			SiteURL:      "https://hashnode.com/n/expo",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Node.js",
			RssURL:       "https://hashnode.com/n/nodejs/rss",
			SiteURL:      "https://hashnode.com/n/nodejs",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "TypeScript",
			RssURL:       "https://hashnode.com/n/typescript/rss",
			SiteURL:      "https://hashnode.com/n/typescript",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Golang",
			RssURL:       "https://hashnode.com/n/go/rss",
			SiteURL:      "https://hashnode.com/n/go",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},

		{
			Name:         "Hashnode",
			CategoryName: "AWS",
			RssURL:       "https://hashnode.com/n/aws/rss",
			SiteURL:      "https://hashnode.com/n/aws",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "GCP",
			RssURL:       "https://hashnode.com/n/gcp/rss",
			SiteURL:      "https://hashnode.com/n/gcp",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Docker",
			RssURL:       "https://hashnode.com/n/docker/rss",
			SiteURL:      "https://hashnode.com/n/docker",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Testing",
			RssURL:       "https://hashnode.com/n/testing/rss",
			SiteURL:      "https://hashnode.com/n/testing",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "GraphQL",
			RssURL:       "https://hashnode.com/n/graphql/rss",
			SiteURL:      "https://hashnode.com/n/graphql",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Frontend Development",
			RssURL:       "https://hashnode.com/n/frontend-development/rss",
			SiteURL:      "https://hashnode.com/n/frontend-development",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Web Development",
			RssURL:       "https://hashnode.com/n/web-development/rss",
			SiteURL:      "https://hashnode.com/n/web-development",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "chatgpt",
			RssURL:       "https://hashnode.com/n/chatgpt/rss",
			SiteURL:      "https://hashnode.com/n/chatgpt",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Developer",
			RssURL:       "https://hashnode.com/n/developer/rss",
			SiteURL:      "https://hashnode.com/n/developer",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Hashnode",
			CategoryName: "Devops",
			RssURL:       "https://hashnode.com/n/devops/rss",
			SiteURL:      "https://hashnode.com/n/devops",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
	}
}
