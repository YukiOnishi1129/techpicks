package seeders

import (
	"cloud.google.com/go/firestore"
	"context"
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

type platformType struct {
	Name         string
	RssUrl       string
	SiteUrl      string
	PlatformType domain.PlatformType
	IsEng        bool
}

func (ps *PlatformSeed) SeedPlatform(ctx context.Context) error {
	batch := ps.Client.BulkWriter(ctx)
	platforms := getPlatforms()
	for _, platform := range platforms {
		platformID, err := uuid.NewUUID()
		if err != nil {
			return err
		}
		createdAt := time.Now().Format("2006-01-02T15:04:05Z")

		ref := ps.Client.Collection("platforms").Doc(platformID.String())
		_, err = batch.Set(ref, domain.Platform{
			ID:           platformID.String(),
			Name:         platform.Name,
			RssURL:       platform.RssUrl,
			SiteURL:      platform.SiteUrl,
			PlatformType: platform.PlatformType,
			IsEng:        platform.IsEng,
			CreatedAt:    createdAt,
			UpdatedAt:    createdAt,
			DeletedAt:    nil,
		})
		if err != nil {
			return err
		}
	}
	batch.Flush()
	return nil
}

func getPlatforms() []platformType {
	return []platformType{
		{
			Name:         "qiita",
			RssUrl:       "https://qiita.com/popular-items/feed.atom",
			SiteUrl:      "https://qiita.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "zenn",
			RssUrl:       "https://zenn.dev/feed",
			SiteUrl:      "https://zenn.dev/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "はてなブックマーク",
			RssUrl:       "https://b.hatena.ne.jp/hotentry/it.rss",
			SiteUrl:      "https://b.hatena.ne.jp/hotentry/it",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "dev.to",
			RssUrl:       "https://dev.to/feed",
			SiteUrl:      "https://dev.to/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "A List Apart",
			RssUrl:       "https://alistapart.com/main/feed/",
			SiteUrl:      "https://alistapart.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "David Walsh Blog",
			RssUrl:       "https://davidwalsh.name/feed/atom",
			SiteUrl:      "https://davidwalsh.name/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "JavaScript Playground",
			RssUrl:       "https://www.jackfranklin.co.uk/feed.xml",
			SiteUrl:      "https://www.jackfranklin.co.uk/blog/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Stack Overflow",
			RssUrl:       "https://stackoverflow.com/feeds",
			SiteUrl:      "https://stackoverflow.com/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "free code camp",
			RssUrl:       "https://www.freecodecamp.org/news/rss/",
			SiteUrl:      "https://www.freecodecamp.org/news/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        true,
		},
		{
			Name:         "Developer.io",
			RssUrl:       "https://dev.classmethod.jp/feed/",
			SiteUrl:      "https://dev.classmethod.jp/",
			PlatformType: domain.PlatformTypeSite,
			IsEng:        false,
		},
		{
			Name:         "google japan",
			RssUrl:       "https://developers-jp.googleblog.com/atom.xml",
			SiteUrl:      "https://developers-jp.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "楽天　ラクマ事業部",
			RssUrl:       "https://www.wantedly.com/stories/s/rakuma/rss.xml",
			SiteUrl:      "https://www.wantedly.com/stories/s/rakuma",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CyberAgent",
			RssUrl:       "https://developers.cyberagent.co.jp/blog/feed/",
			SiteUrl:      "https://developers.cyberagent.co.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "リクルート",
			RssUrl:       "https://www.recruit.co.jp/employment/students/engineers/techblog/feed/",
			SiteUrl:      "https://www.recruit.co.jp/employment/students/engineers/techblog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "paypay",
			RssUrl:       "https://blog.paypay.ne.jp/category/engineering/feed/",
			SiteUrl:      "https://blog.paypay.ne.jp/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "メルカリ",
			RssUrl:       "https://engineering.mercari.com/blog/feed.xml",
			SiteUrl:      "https://engineering.mercari.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "NTT",
			RssUrl:       "https://engineers.ntt.com/feed",
			SiteUrl:      "https://engineers.ntt.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Qiita (企業)",
			RssUrl:       "https://blog.qiita.com/feed/",
			SiteUrl:      "https://blog.qiita.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Cybozu",
			RssUrl:       "https://blog.cybozu.io/feed",
			SiteUrl:      "https://blog.cybozu.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "mixi",
			RssUrl:       "https://mixi-developers.mixi.co.jp/feed",
			SiteUrl:      "https://mixi-developers.mixi.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "GREE",
			RssUrl:       "https://labs.gree.jp/blog/feed/",
			SiteUrl:      "https://labs.gree.jp/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ZOZO",
			RssUrl:       "https://techblog.zozo.com/rss",
			SiteUrl:      "https://techblog.zozo.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "DeNA",
			RssUrl:       "https://engineering.dena.com/index.xml",
			SiteUrl:      "https://engineering.dena.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "リクルートテクノロジーズ",
			RssUrl:       "https://blog.recruit.co.jp/rtc/feed/",
			SiteUrl:      "https://blog.recruit.co.jp/rtc/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "dwango on GitHub",
			RssUrl:       "https://dwango.github.io/index.xml",
			SiteUrl:      "https://dwango.github.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "SanSan",
			RssUrl:       "https://buildersbox.corp-sansan.com/rss",
			SiteUrl:      "https://buildersbox.corp-sansan.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "HRBrain",
			RssUrl:       "https://times.hrbrain.co.jp/rss",
			SiteUrl:      "https://times.hrbrain.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Lineヤフー",
			RssUrl:       "https://techblog.lycorp.co.jp/ja/feed/index.xml",
			SiteUrl:      "https://techblog.lycorp.co.jp/ja",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Sony Music",
			RssUrl:       "https://tech.sme.co.jp/rss",
			SiteUrl:      "https://tech.sme.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "IBM",
			RssUrl:       "https://www.ibm.com/blogs/solutions/jp-ja/feed/atom/",
			SiteUrl:      "https://www.ibm.com/blogs/solutions/jp-ja/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "カミナシ",
			RssUrl:       "https://kaminashi-developer.hatenablog.jp/rss",
			SiteUrl:      "https://kaminashi-developer.hatenablog.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ANDPAD",
			RssUrl:       "https://tech.andpad.co.jp/rss",
			SiteUrl:      "https://tech.andpad.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "gaudiy",
			RssUrl:       "https://techblog.gaudiy.com/rss",
			SiteUrl:      "https://techblog.gaudiy.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws amazon web services",
			RssUrl:       "https://aws.amazon.com/jp/blogs/news/feed/",
			SiteUrl:      "https://aws.amazon.com/jp/blogs/news/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "aws startup",
			RssUrl:       "https://aws.amazon.com/jp/blogs/startup/feed/",
			SiteUrl:      "https://aws.amazon.com/jp/blogs/startup/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "LayerX",
			RssUrl:       "https://tech.layerx.co.jp/rss",
			SiteUrl:      "https://tech.layerx.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UPSIDER",
			RssUrl:       "https://tech.up-sider.com/rss",
			SiteUrl:      "https://tech.up-sider.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "CADDI",
			RssUrl:       "https://caddi.tech/rss",
			SiteUrl:      "https://caddi.tech/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "UZABASE",
			RssUrl:       "https://tech.uzabase.com/rss/category/Blog",
			SiteUrl:      "https://tech.uzabase.com/archive/category/Blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "BASE",
			RssUrl:       "https://devblog.thebase.in/rss",
			SiteUrl:      "https://devblog.thebase.in/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "タイミー",
			RssUrl:       "https://tech.timee.co.jp/rss",
			SiteUrl:      "https://tech.timee.co.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "はてな開発者ブログ",
			RssUrl:       "https://developer.hatenastaff.com/rss",
			SiteUrl:      "https://developer.hatenastaff.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Money Forward",
			RssUrl:       "https://tech.up-sider.com/rss",
			SiteUrl:      "https://moneyforward-dev.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "pixiv",
			RssUrl:       "https://inside.pixiv.blog/rss",
			SiteUrl:      "https://inside.pixiv.blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "speee",
			RssUrl:       "https://tech.speee.jp/rss",
			SiteUrl:      "https://tech.speee.jp/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Gunosy",
			RssUrl:       "https://tech.gunosy.io/rss",
			SiteUrl:      "https://tech.gunosy.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "クックパッド",
			RssUrl:       "https://techlife.cookpad.com/rss",
			SiteUrl:      "https://techlife.cookpad.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "wantedly",
			RssUrl:       "https://www.wantedly.com/stories/s/wantedly_engineers/rss.xml",
			SiteUrl:      "https://www.wantedly.com/stories/s/wantedly_engineers",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "ABEJA",
			RssUrl:       "https://tech-blog.abeja.asia/rss",
			SiteUrl:      "https://tech-blog.abeja.asia/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "AppBrew",
			RssUrl:       "https://tech.appbrew.io/rss",
			SiteUrl:      "https://tech.appbrew.io/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "エウレカ",
			RssUrl:       "https://medium.com/feed/eureka-engineering",
			SiteUrl:      "https://medium.com/eureka-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
		{
			Name:         "Airbnb",
			RssUrl:       "https://medium.com/feed/airbnb-engineering",
			SiteUrl:      "https://medium.com/airbnb-engineering",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Atlassian",
			RssUrl:       "https://blog.developer.atlassian.com/feed/",
			SiteUrl:      "https://blog.developer.atlassian.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Docker",
			RssUrl:       "https://www.docker.com/feed/",
			SiteUrl:      "https://www.docker.com/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Facebook",
			RssUrl:       "https://engineering.fb.com/feed/",
			SiteUrl:      "https://engineering.fb.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "GitHub",
			RssUrl:       "https://github.blog/category/engineering/feed/",
			SiteUrl:      "https://github.blog/category/engineering/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Google",
			RssUrl:       "https://www.blogger.com/feeds/596098824972435195/posts/default",
			SiteUrl:      "https://developers.googleblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Instagram",
			RssUrl:       "https://instagram-engineering.com/feed",
			SiteUrl:      "https://instagram-engineering.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Netflix",
			RssUrl:       "https://netflixtechblog.com/feed",
			SiteUrl:      "https://netflixtechblog.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "PayPal",
			RssUrl:       "https://medium.com/feed/paypal-tech",
			SiteUrl:      "https://medium.com/paypal-tech",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Salesforce",
			RssUrl:       "https://engineering.salesforce.com/feed/",
			SiteUrl:      "https://engineering.salesforce.com/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Zoom",
			RssUrl:       "https://medium.com/feed/zoom-developer-blog",
			SiteUrl:      "https://medium.com/zoom-developer-blog",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "Asana",
			RssUrl:       "https://blog.asana.com/category/eng/feed/",
			SiteUrl:      "https://blog.asana.com/category/eng/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        true,
		},
		{
			Name:         "mercari",
			RssUrl:       "https://engineering.mercari.com/en/blog/feed.xml",
			SiteUrl:      "https://engineering.mercari.com/en/blog/",
			PlatformType: domain.PlatformTypeCompany,
			IsEng:        false,
		},
	}
}
