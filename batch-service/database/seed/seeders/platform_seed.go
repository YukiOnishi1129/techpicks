package seeders

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/google/uuid"
	"time"
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
		ref := ps.Client.Collection("platforms").Doc(platformID.String())
		_, err = batch.Set(ref, domain.PlatformFirestore{
			Name:         p.Name,
			RssURL:       p.RssURL,
			SiteURL:      p.SiteURL,
			PlatformType: p.PlatformType,
			IsEng:        p.IsEng,
			CreatedAt:    int(now),
			UpdatedAt:    int(now),
			DeletedAt:    nil,
		})
		if err != nil {
			return err
		}
	}
	batch.Flush()
	return nil
}

func getPlatformDatas() []domain.PlatformFirestore {
	deletedAt := int(time.Now().Unix())
	return []domain.PlatformFirestore{
		{
			Name:         "qiita",
			RssURL:       "https://qiita.com/popular-items/feed.atom",
			SiteURL:      "https://qiita.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "zenn",
			RssURL:       "https://zenn.dev/feed",
			SiteURL:      "https://zenn.dev/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "はてなブックマーク",
			RssURL:       "https://b.hatena.ne.jp/hotentry/it.rss",
			SiteURL:      "https://b.hatena.ne.jp/hotentry/it",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "dev.to",
			RssURL:       "https://dev.to/feed",
			SiteURL:      "https://dev.to/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "A List Apart",
			RssURL:       "https://alistapart.com/main/feed/",
			SiteURL:      "https://alistapart.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "David Walsh Blog",
			RssURL:       "https://davidwalsh.name/feed/atom",
			SiteURL:      "https://davidwalsh.name/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "JavaScript Playground",
			RssURL:       "https://www.jackfranklin.co.uk/feed.xml",
			SiteURL:      "https://www.jackfranklin.co.uk/blog/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Stack Overflow",
			RssURL:       "https://stackoverflow.com/feeds",
			SiteURL:      "https://stackoverflow.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
			DeletedAt:    &deletedAt,
		},
		{
			Name:         "free code camp",
			RssURL:       "https://www.freecodecamp.org/news/rss/",
			SiteURL:      "https://www.freecodecamp.org/news/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Developer.io",
			RssURL:       "https://dev.classmethod.jp/feed/",
			SiteURL:      "https://dev.classmethod.jp/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "google japan",
			RssURL:       "https://developers-jp.googleblog.com/atom.xml",
			SiteURL:      "https://developers-jp.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "楽天　ラクマ事業部",
			RssURL:       "https://www.wantedly.com/stories/s/rakuma/rss.xml",
			SiteURL:      "https://www.wantedly.com/stories/s/rakuma",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CyberAgent",
			RssURL:       "https://developers.cyberagent.co.jp/blog/feed/",
			SiteURL:      "https://developers.cyberagent.co.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "paypay",
			RssURL:       "https://blog.paypay.ne.jp/category/engineering/feed/",
			SiteURL:      "https://blog.paypay.ne.jp/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "メルカリ",
			RssURL:       "https://engineering.mercari.com/blog/feed.xml",
			SiteURL:      "https://engineering.mercari.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "NTT",
			RssURL:       "https://engineers.ntt.com/feed",
			SiteURL:      "https://engineers.ntt.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Qiita (企業)",
			RssURL:       "https://blog.qiita.com/feed/",
			SiteURL:      "https://blog.qiita.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Cybozu",
			RssURL:       "https://blog.cybozu.io/feed",
			SiteURL:      "https://blog.cybozu.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "mixi",
			RssURL:       "https://mixi-developers.mixi.co.jp/feed",
			SiteURL:      "https://mixi-developers.mixi.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "GREE",
			RssURL:       "https://labs.gree.jp/blog/feed/",
			SiteURL:      "https://labs.gree.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ZOZO",
			RssURL:       "https://techblog.zozo.com/rss",
			SiteURL:      "https://techblog.zozo.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "DeNA",
			RssURL:       "https://engineering.dena.com/index.xml",
			SiteURL:      "https://engineering.dena.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "リクルートテクノロジーズ",
			RssURL:       "https://blog.recruit.co.jp/rtc/feed/",
			SiteURL:      "https://blog.recruit.co.jp/rtc/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "dwango on GitHub",
			RssURL:       "https://dwango.github.io/index.xml",
			SiteURL:      "https://dwango.github.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "SanSan",
			RssURL:       "https://buildersbox.corp-sansan.com/rss",
			SiteURL:      "https://buildersbox.corp-sansan.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "HRBrain",
			RssURL:       "https://times.hrbrain.co.jp/rss",
			SiteURL:      "https://times.hrbrain.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Lineヤフー",
			RssURL:       "https://techblog.lycorp.co.jp/ja/feed/index.xml",
			SiteURL:      "https://techblog.lycorp.co.jp/ja",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Sony Music",
			RssURL:       "https://tech.sme.co.jp/rss",
			SiteURL:      "https://tech.sme.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "IBM",
			RssURL:       "https://www.ibm.com/blogs/solutions/jp-ja/feed/atom/",
			SiteURL:      "https://www.ibm.com/blogs/solutions/jp-ja/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "カミナシ",
			RssURL:       "https://kaminashi-developer.hatenablog.jp/rss",
			SiteURL:      "https://kaminashi-developer.hatenablog.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ANDPAD",
			RssURL:       "https://tech.andpad.co.jp/rss",
			SiteURL:      "https://tech.andpad.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "gaudiy",
			RssURL:       "https://techblog.gaudiy.com/rss",
			SiteURL:      "https://techblog.gaudiy.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws amazon web services",
			RssURL:       "https://aws.amazon.com/jp/blogs/news/feed/",
			SiteURL:      "https://aws.amazon.com/jp/blogs/news/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws startup",
			RssURL:       "https://aws.amazon.com/jp/blogs/startup/feed/",
			SiteURL:      "https://aws.amazon.com/jp/blogs/startup/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "LayerX",
			RssURL:       "https://tech.layerx.co.jp/rss",
			SiteURL:      "https://tech.layerx.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UPSIDER",
			RssURL:       "https://tech.up-sider.com/rss",
			SiteURL:      "https://tech.up-sider.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CADDI",
			RssURL:       "https://caddi.tech/rss",
			SiteURL:      "https://caddi.tech/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UZABASE",
			RssURL:       "https://tech.uzabase.com/rss/category/Blog",
			SiteURL:      "https://tech.uzabase.com/archive/category/Blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "BASE",
			RssURL:       "https://devblog.thebase.in/rss",
			SiteURL:      "https://devblog.thebase.in/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "タイミー",
			RssURL:       "https://tech.timee.co.jp/rss",
			SiteURL:      "https://tech.timee.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "はてな開発者ブログ",
			RssURL:       "https://developer.hatenastaff.com/rss",
			SiteURL:      "https://developer.hatenastaff.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Money Forward",
			RssURL:       "https://moneyforward-dev.jp/rss",
			SiteURL:      "https://moneyforward-dev.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "pixiv",
			RssURL:       "https://inside.pixiv.blog/rss",
			SiteURL:      "https://inside.pixiv.blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "speee",
			RssURL:       "https://tech.speee.jp/rss",
			SiteURL:      "https://tech.speee.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Gunosy",
			RssURL:       "https://tech.gunosy.io/rss",
			SiteURL:      "https://tech.gunosy.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "クックパッド",
			RssURL:       "https://techlife.cookpad.com/rss",
			SiteURL:      "https://techlife.cookpad.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "wantedly",
			RssURL:       "https://www.wantedly.com/stories/s/wantedly_engineers/rss.xml",
			SiteURL:      "https://www.wantedly.com/stories/s/wantedly_engineers",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ABEJA",
			RssURL:       "https://tech-blog.abeja.asia/rss",
			SiteURL:      "https://tech-blog.abeja.asia/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "AppBrew",
			RssURL:       "https://tech.appbrew.io/rss",
			SiteURL:      "https://tech.appbrew.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "エウレカ",
			RssURL:       "https://medium.com/feed/eureka-engineering",
			SiteURL:      "https://medium.com/eureka-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Airbnb",
			RssURL:       "https://medium.com/feed/airbnb-engineering",
			SiteURL:      "https://medium.com/airbnb-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Atlassian",
			RssURL:       "https://blog.developer.atlassian.com/feed/",
			SiteURL:      "https://blog.developer.atlassian.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Docker",
			RssURL:       "https://www.docker.com/feed/",
			SiteURL:      "https://www.docker.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Facebook",
			RssURL:       "https://engineering.fb.com/feed/",
			SiteURL:      "https://engineering.fb.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "GitHub",
			RssURL:       "https://github.blog/category/engineering/feed/",
			SiteURL:      "https://github.blog/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Google",
			RssURL:       "https://www.blogger.com/feeds/596098824972435195/posts/default",
			SiteURL:      "https://developers.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Instagram",
			RssURL:       "https://instagram-engineering.com/feed",
			SiteURL:      "https://instagram-engineering.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Netflix",
			RssURL:       "https://netflixtechblog.com/feed",
			SiteURL:      "https://netflixtechblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "PayPal",
			RssURL:       "https://medium.com/feed/paypal-tech",
			SiteURL:      "https://medium.com/paypal-tech",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Salesforce",
			RssURL:       "https://engineering.salesforce.com/feed/",
			SiteURL:      "https://engineering.salesforce.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Zoom",
			RssURL:       "https://medium.com/feed/zoom-developer-blog",
			SiteURL:      "https://medium.com/zoom-developer-blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Asana",
			RssURL:       "https://blog.asana.com/category/eng/feed/",
			SiteURL:      "https://blog.asana.com/category/eng/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "mercari",
			RssURL:       "https://engineering.mercari.com/en/blog/feed.xml",
			SiteURL:      "https://engineering.mercari.com/en/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "ROUTE 06",
			RssURL:       "https://tech.route06.co.jp/feed",
			SiteURL:      "https://tech.route06.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "スタディサプリ",
			RssURL:       "https://blog.studysapuri.jp/rss",
			SiteURL:      "https://blog.studysapuri.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
	}
}
