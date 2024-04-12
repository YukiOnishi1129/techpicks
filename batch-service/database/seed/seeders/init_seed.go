package seeders

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"time"

	"github.com/volatiletech/sqlboiler/v4/boil"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
)

type InitSeedInterface interface {
	InitSeed(ctx context.Context) error
}

type InitSeed struct {
	db *sql.DB
}

func NewInitSeed(db *sql.DB) *InitSeed {
	return &InitSeed{db: db}
}

func (is *InitSeed) SeedInitData(ctx context.Context) error {
	tx, err := is.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	seedCategories := getCategoryDatas()
	seedPlatformFeeds := getSeedPlatformAndFeeds()
	for _, s := range seedCategories {
		categoryID, _ := uuid.NewUUID()
		categoryIDStr := categoryID.String()
		c, _ := entity.Categories(qm.Where("name = ?", s.Name)).One(ctx, tx)
		if c != nil {
			categoryIDStr = c.ID
		}
		// create new category if it does not exist
		if c == nil {
			category := entity.Category{
				ID:   categoryID.String(),
				Name: s.Name,
				Type: int(s.Type),
			}
			err = category.Insert(ctx, tx, boil.Infer())
			if err != nil {
				return err
			}
		}

		for _, sp := range seedPlatformFeeds {
			if sp.seedCategoryID == s.seedCategoryID {
				p, _ := entity.Platforms(qm.Where("site_url = ?", sp.PlatformSiteURL)).One(ctx, tx)
				if p != nil {
					f, _ := entity.Feeds(qm.Where("rss_url = ?", sp.RssURL)).One(ctx, tx)
					if f == nil {

						err = createFeed(ctx, tx, createFeedArg{
							PlatformID:  p.ID,
							CategoryID:  categoryIDStr,
							FeedName:    sp.FeedName,
							RssURL:      sp.RssURL,
							FeedSiteURL: sp.FeedSiteURL,
							IsTrending:  sp.IsTrending,
							DeletedAt:   sp.DeletedAt,
						})
						if err != nil {
							return err
						}
					}
					continue
				}

				platformID, _ := uuid.NewUUID()
				err = createPlatform(ctx, tx, createPlatformArg{
					ID:           platformID.String(),
					Name:         sp.PlatformName,
					SiteURL:      sp.PlatformSiteURL,
					PlatformType: sp.PlatformType,
					FaviconURL:   sp.FaviconURL,
					IsEng:        sp.IsEng,
					DeletedAt:    sp.DeletedAt,
				})
				if err != nil {
					return err
				}

				err = createFeed(ctx, tx, createFeedArg{
					PlatformID:  platformID.String(),
					CategoryID:  categoryIDStr,
					FeedName:    sp.FeedName,
					RssURL:      sp.RssURL,
					FeedSiteURL: sp.FeedSiteURL,
					IsTrending:  sp.IsTrending,
					DeletedAt:   sp.DeletedAt,
				})
				if err != nil {
					return err
				}
			}
		}
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

type createPlatformArg struct {
	ID           string
	Name         string
	SiteURL      string
	PlatformType domain.PlatformType
	FaviconURL   string
	IsEng        bool
	DeletedAt    *time.Time
}

func createPlatform(ctx context.Context, tx *sql.Tx, arg createPlatformArg) error {
	platform := entity.Platform{
		ID:           arg.ID,
		Name:         arg.Name,
		SiteURL:      arg.SiteURL,
		PlatformType: int(arg.PlatformType),
		FaviconURL:   arg.FaviconURL,
		IsEng:        arg.IsEng,
	}
	if arg.DeletedAt != nil {
		platform.DeletedAt = null.TimeFromPtr(arg.DeletedAt)
	}
	err := platform.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}

type createFeedArg struct {
	PlatformID  string
	CategoryID  string
	FeedName    string
	RssURL      string
	FeedSiteURL string
	IsTrending  bool
	DeletedAt   *time.Time
}

func createFeed(ctx context.Context, tx *sql.Tx, arg createFeedArg) error {
	feedID, _ := uuid.NewUUID()
	feed := entity.Feed{
		ID:         feedID.String(),
		Name:       arg.FeedName,
		RSSURL:     arg.RssURL,
		SiteURL:    arg.FeedSiteURL,
		IsTrending: arg.IsTrending,
		PlatformID: arg.PlatformID,
		CategoryID: arg.CategoryID,
	}
	if arg.DeletedAt != nil {
		feed.DeletedAt = null.TimeFromPtr(arg.DeletedAt)
	}
	err := feed.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
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

type seedCategory struct {
	Name           string
	Type           domain.CategoryType
	seedCategoryID int
}

func getCategoryDatas() []seedCategory {
	return []seedCategory{
		{
			Name:           "All",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 1,
		},
		{
			Name:           "Trend",
			Type:           domain.CategoryTypeTrend,
			seedCategoryID: 2,
		},
		{
			Name:           "Technology",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 3,
		},
		{
			Name:           "Programming",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 4,
		},
		{
			Name:           "JavaScript",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 5,
		},
		{
			Name:           "TypeScript",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 6,
		},
		{
			Name:           "Python",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 7,
		},
		{
			Name:           "Ruby",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 8,
		},
		{
			Name:           "Golang",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 9,
		},
		{
			Name:           "Java",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 10,
		},
		{
			Name:           "Kotlin",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 11,
		},
		{
			Name:           "Swift",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 12,
		},
		{
			Name:           "PHP",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 13,
		},
		{
			Name:           "C",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 14,
		},
		{
			Name:           "C++",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 15,
		},
		{
			Name:           "Rust",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 16,
		},
		{
			Name:           "Scala",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 17,
		},
		{
			Name:           "React",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 18,
		},
		{
			Name:           "Vue",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 19,
		},
		{
			Name:           "Next.js",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 20,
		},
		{
			Name:           "Nuxt.js",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 21,
		},
		{
			Name:           "Node.js",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 22,
		},
		{
			Name:           "express",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 23,
		},
		{
			Name:           "Nestjs",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 24,
		},
		{
			Name:           "Infrastructure",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 25,
		},
		{
			Name:           "React Native",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 26,
		},
		{
			Name:           "Flutter",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 27,
		},
		{
			Name:           "AWS",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 28,
		},
		{
			Name:           "GCP",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 29,
		},
		{
			Name:           "Azure",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 30,
		},
		{
			Name:           "Docker",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 31,
		},
		{
			Name:           "Kubernetes",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 32,
		},
		{
			Name:           "Machine Learning",
			Type:           domain.CategoryTypeMachineLearning,
			seedCategoryID: 33,
		},
		{
			Name:           "Deep Learning",
			Type:           domain.CategoryTypeMachineLearning,
			seedCategoryID: 34,
		},
		{
			Name:           "Security",
			Type:           domain.CategoryTypeSecurity,
			seedCategoryID: 35,
		},
		{
			Name:           "GraphQL",
			Type:           domain.CategoryTypeLibrary,
			seedCategoryID: 36,
		},
		{
			Name:           "GitHub",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 37,
		},
		{
			Name:           "Git",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 38,
		},
		{
			Name:           "VSCode",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 39,
		},
		{
			Name:           "GitHub Actions",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 40,
		},
		{
			Name:           "ChatGPT",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 41,
		},
		{
			Name:           "個人開発",
			Type:           domain.CategoryTypeOthers,
			seedCategoryID: 42,
		},
		{
			Name:           "Frontend",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 43,
		},
		{
			Name:           "Test",
			Type:           domain.CategoryTypeOthers,
			seedCategoryID: 44,
		},
		{
			Name:           "Expo",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 45,
		},
		{
			Name:           "Devops",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 46,
		},
		{
			Name:           "Engineering",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 47,
		},
		{
			Name:           "Design",
			Type:           domain.CategoryTypeDesign,
			seedCategoryID: 48,
		},
		{
			Name:           "Finance",
			Type:           domain.CategoryTypeFinance,
			seedCategoryID: 49,
		},
		{
			Name:           "Project",
			Type:           domain.CategoryTypeManagement,
			seedCategoryID: 50,
		},
		{
			Name:           "Product",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 51,
		},
	}
}

type seedPlatformFeed struct {
	PlatformName    string
	FeedName        string
	seedCategoryID  int
	PlatformSiteURL string
	FeedSiteURL     string
	PlatformType    domain.PlatformType
	FaviconURL      string
	IsEng           bool
	IsTrending      bool
	RssURL          string
	DeletedAt       *time.Time
}

func getSeedPlatformAndFeeds() []seedPlatformFeed {
	deletedAt := time.Now()
	return []seedPlatformFeed{
		{
			PlatformName:    "Qiita",
			FeedName:        "Qiitaのトレンド",
			seedCategoryID:  2,
			RssURL:          "https://qiita.com/popular-items/feed.atom",
			PlatformSiteURL: "https://qiita.com/",
			FeedSiteURL:     "https://qiita.com/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png",
			IsEng:           false,
			IsTrending:      true,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zennのトレンド",
			seedCategoryID:  2,
			RssURL:          "https://zenn.dev/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
			IsTrending:      true,
		},
		{
			PlatformName:    "はてなブックマーク",
			FeedName:        "はてなブックマークのテクノロジー",
			seedCategoryID:  2,
			RssURL:          "https://b.hatena.ne.jp/hotentry/it.rss",
			PlatformSiteURL: "https://b.hatena.ne.jp/",
			FeedSiteURL:     "https://b.hatena.ne.jp/hotentry/it",
			PlatformType:    domain.PlatformTypeSummary,
			FaviconURL:      "https://b.st-hatena.com/9912ec0e0fc8f818cf97c46ebfa93196dc945692/images/v4/public/gh-logo@2x.png",
			IsEng:           false,
			IsTrending:      true,
		},
		{
			PlatformName:    "dev.to",
			FeedName:        "dev.to",
			seedCategoryID:  1,
			RssURL:          "https://dev.to/feed",
			PlatformSiteURL: "https://dev.to/",
			FeedSiteURL:     "https://dev.to/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico",
			IsEng:           true,
		},
		{
			PlatformName:    "A List Apart",
			FeedName:        "A List Apart",
			seedCategoryID:  1,
			RssURL:          "https://alistapart.com/main/feed/",
			PlatformSiteURL: "https://alistapart.com/",
			FeedSiteURL:     "https://alistapart.com/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=32%2C32&ssl=1",
			IsEng:           true,
			DeletedAt:       &deletedAt,
		},
		{
			PlatformName:    "David Walsh Blog",
			FeedName:        "David Walsh Blog",
			seedCategoryID:  1,
			RssURL:          "https://davidwalsh.name/feed/atom",
			PlatformSiteURL: "https://davidwalsh.name/",
			FeedSiteURL:     "https://davidwalsh.name/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://davidwalsh.name/wp-content/themes/punky/images/logo.png",
			IsEng:           true,
		},
		{
			PlatformName:    "JavaScript Playground",
			FeedName:        "JavaScript Playground",
			seedCategoryID:  1,
			RssURL:          "https://www.jackfranklin.co.uk/feed.xml",
			PlatformSiteURL: "https://www.jackfranklin.co.uk/",
			FeedSiteURL:     "https://www.jackfranklin.co.uk/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://www.jackfranklin.co.uk/images/favicon/apple-touch-icon.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Stack Overflow",
			FeedName:        "Stack Overflow",
			seedCategoryID:  1,
			RssURL:          "https://stackoverflow.com/feeds",
			PlatformSiteURL: "https://stackoverflow.com/",
			FeedSiteURL:     "https://stackoverflow.com/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
			IsEng:           true,
			DeletedAt:       &deletedAt,
		},
		{
			PlatformName:    "free code camp",
			FeedName:        "free code camp",
			seedCategoryID:  1,
			RssURL:          "https://www.freecodecamp.org/news/rss/",
			PlatformSiteURL: "https://www.freecodecamp.org/",
			FeedSiteURL:     "https://www.freecodecamp.org/news/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
			IsEng:           true,
		},
		{
			PlatformName:    "Developer.io",
			FeedName:        "Developer.io",
			seedCategoryID:  1,
			RssURL:          "https://dev.classmethod.jp/feed/",
			PlatformSiteURL: "https://dev.classmethod.jp/",
			FeedSiteURL:     "https://dev.classmethod.jp/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://dev.classmethod.jp/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "google japan",
			FeedName:        "google japan",
			seedCategoryID:  1,
			RssURL:          "https://developers-jp.googleblog.com/atom.xml",
			PlatformSiteURL: "https://developers-jp.googleblog.com/",
			FeedSiteURL:     "https://developers-jp.googleblog.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://developers-jp.googleblog.com/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "楽天　ラクマ事業部",
			FeedName:        "楽天　ラクマ事業部",
			seedCategoryID:  1,
			RssURL:          "https://www.wantedly.com/stories/s/rakuma/rss.xml",
			PlatformSiteURL: "https://www.wantedly.com/stories/s/rakuma",
			FeedSiteURL:     "https://www.wantedly.com/stories/s/rakuma",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://www.wantedly.com//favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "CyberAgent",
			FeedName:        "CyberAgent",
			seedCategoryID:  1,
			RssURL:          "https://developers.cyberagent.co.jp/blog/feed/",
			PlatformSiteURL: "https://developers.cyberagent.co.jp/",
			FeedSiteURL:     "https://developers.cyberagent.co.jp/blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://developers.cyberagent.co.jp/blog/wp-content/uploads/2016/09/cropped-ca-32x32.png",
			IsEng:           false,
		},
		{
			PlatformName:    "paypay",
			FeedName:        "paypay",
			seedCategoryID:  1,
			RssURL:          "https://blog.paypay.ne.jp/category/engineering/feed/",
			PlatformSiteURL: "https://blog.paypay.ne.jp/",
			FeedSiteURL:     "https://blog.paypay.ne.jp/category/engineering/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.paypay.ne.jp/wp-content/uploads/2020/06/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "メルカリ",
			FeedName:        "メルカリ",
			seedCategoryID:  1,
			RssURL:          "https://engineering.mercari.com/blog/feed.xml",
			PlatformSiteURL: "https://engineering.mercari.com/",
			FeedSiteURL:     "https://engineering.mercari.com/blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineering.mercari.com/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "NTT",
			FeedName:        "NTT",
			seedCategoryID:  1,
			RssURL:          "https://engineers.ntt.com/feed",
			PlatformSiteURL: "https://engineers.ntt.com/",
			FeedSiteURL:     "https://engineers.ntt.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineers.ntt.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "Qiita (企業)",
			FeedName:        "Qiita (企業)",
			seedCategoryID:  1,
			RssURL:          "https://blog.qiita.com/feed/",
			PlatformSiteURL: "https://blog.qiita.com/",
			FeedSiteURL:     "https://blog.qiita.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.qiita.com/wp-content/uploads/fbrfg/apple-touch-icon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Cybozu",
			FeedName:        "Cybozu",
			seedCategoryID:  1,
			RssURL:          "https://blog.cybozu.io/feed",
			PlatformSiteURL: "https://blog.cybozu.io/",
			FeedSiteURL:     "https://blog.cybozu.io/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.cybozu.io/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "mixi",
			FeedName:        "mixi",
			seedCategoryID:  1,
			RssURL:          "https://mixi-developers.mixi.co.jp/feed",
			PlatformSiteURL: "https://mixi-developers.mixi.co.jp/",
			FeedSiteURL:     "https://mixi-developers.mixi.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/v2/resize:fill:256:256/1*lNHpX-0s-NUfCc6OxYFXLQ.png",
			IsEng:           false,
		},
		{
			PlatformName:    "GREE",
			FeedName:        "GREE",
			seedCategoryID:  1,
			RssURL:          "https://labs.gree.jp/blog/feed/",
			PlatformSiteURL: "https://labs.gree.jp/",
			FeedSiteURL:     "https://labs.gree.jp/blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://labs.gree.jp/blog/wp-content/uploads/2015/01/favicon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "ZOZO",
			FeedName:        "ZOZO",
			seedCategoryID:  1,
			RssURL:          "https://techblog.zozo.com/rss",
			PlatformSiteURL: "https://techblog.zozo.com/",
			FeedSiteURL:     "https://techblog.zozo.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://techblog.zozo.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "DeNA",
			FeedName:        "DeNA",
			seedCategoryID:  1,
			RssURL:          "https://engineering.dena.com/index.xml",
			PlatformSiteURL: "https://engineering.dena.com/",
			FeedSiteURL:     "https://engineering.dena.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineering.dena.com/favicon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "リクルートテクノロジーズ",
			FeedName:        "リクルートテクノロジーズ",
			seedCategoryID:  1,
			RssURL:          "https://blog.recruit.co.jp/rtc/feed/",
			PlatformSiteURL: "https://blog.recruit.co.jp/",
			FeedSiteURL:     "https://blog.recruit.co.jp/rtc/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.recruit.co.jp/rtc/wp-content/themes/pc-rtc-blog.git/library/images/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "dwango on GitHub",
			FeedName:        "dwango on GitHub",
			seedCategoryID:  1,
			RssURL:          "https://dwango.github.io/index.xml",
			PlatformSiteURL: "https://dwango.github.io/",
			FeedSiteURL:     "https://dwango.github.io/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://dwango.github.io/apple-touch-icon-144-precomposed.png",
			IsEng:           false,
		},
		{
			PlatformName:    "SanSan",
			FeedName:        "SanSan",
			seedCategoryID:  1,
			RssURL:          "https://buildersbox.corp-sansan.com/rss",
			PlatformSiteURL: "https://buildersbox.corp-sansan.com/",
			FeedSiteURL:     "https://buildersbox.corp-sansan.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://buildersbox.corp-sansan.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "HRBrain",
			FeedName:        "HRBrain",
			seedCategoryID:  1,
			RssURL:          "https://times.hrbrain.co.jp/rss",
			PlatformSiteURL: "https://times.hrbrain.co.jp/",
			FeedSiteURL:     "https://times.hrbrain.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://times.hrbrain.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "Lineヤフー",
			FeedName:        "Lineヤフー",
			seedCategoryID:  1,
			RssURL:          "https://techblog.lycorp.co.jp/ja/feed/index.xml",
			PlatformSiteURL: "https://techblog.lycorp.co.jp/",
			FeedSiteURL:     "https://techblog.lycorp.co.jp/ja",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://www.lycorp.co.jp/assets/images/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "Sony Music",
			FeedName:        "Sony Music",
			seedCategoryID:  1,
			RssURL:          "https://tech.sme.co.jp/rss",
			PlatformSiteURL: "https://tech.sme.co.jp/",
			FeedSiteURL:     "https://tech.sme.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.sme.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "IBM",
			FeedName:        "IBM",
			seedCategoryID:  1,
			RssURL:          "https://www.ibm.com/blogs/solutions/jp-ja/feed/atom/",
			PlatformSiteURL: "https://www.ibm.com/",
			FeedSiteURL:     "https://www.ibm.com/blogs/solutions/jp-ja/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://www.ibm.com/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "カミナシ",
			FeedName:        "カミナシ",
			seedCategoryID:  1,
			RssURL:          "https://kaminashi-developer.hatenablog.jp/rss",
			PlatformSiteURL: "https://kaminashi-developer.hatenablog.jp/",
			FeedSiteURL:     "https://kaminashi-developer.hatenablog.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://kaminashi-developer.hatenablog.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "ANDPAD",
			FeedName:        "ANDPAD",
			seedCategoryID:  1,
			RssURL:          "https://tech.andpad.co.jp/rss",
			PlatformSiteURL: "https://tech.andpad.co.jp/",
			FeedSiteURL:     "https://tech.andpad.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.andpad.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "gaudiy",
			FeedName:        "gaudiy",
			seedCategoryID:  1,
			RssURL:          "https://techblog.gaudiy.com/rss",
			PlatformSiteURL: "https://techblog.gaudiy.com/",
			FeedSiteURL:     "https://techblog.gaudiy.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://techblog.gaudiy.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "aws amazon web services",
			FeedName:        "aws amazon web services",
			seedCategoryID:  1,
			RssURL:          "https://aws.amazon.com/jp/blogs/news/feed/",
			PlatformSiteURL: "https://aws.amazon.com/",
			FeedSiteURL:     "https://aws.amazon.com/jp/blogs/news/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://a0.awsstatic.com/main/images/site/fav/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "aws startup",
			FeedName:        "aws startup",
			seedCategoryID:  1,
			RssURL:          "https://aws.amazon.com/jp/blogs/startup/feed/",
			PlatformSiteURL: "https://aws.amazon.com/",
			FeedSiteURL:     "https://aws.amazon.com/jp/blogs/startup/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://a0.awsstatic.com/main/images/site/fav/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "LayerX",
			FeedName:        "LayerX",
			seedCategoryID:  1,
			RssURL:          "https://tech.layerx.co.jp/rss",
			PlatformSiteURL: "https://tech.layerx.co.jp/",
			FeedSiteURL:     "https://tech.layerx.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.layerx.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "UPSIDER",
			FeedName:        "UPSIDER",
			seedCategoryID:  1,
			RssURL:          "https://tech.up-sider.com/rss",
			PlatformSiteURL: "https://tech.up-sider.com/",
			FeedSiteURL:     "https://tech.up-sider.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.up-sider.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "CADDI",
			FeedName:        "CADDI",
			seedCategoryID:  1,
			RssURL:          "https://caddi.tech/rss",
			PlatformSiteURL: "https://caddi.tech/",
			FeedSiteURL:     "https://caddi.tech/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://caddi.tech/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "UZABASE",
			FeedName:        "UZABASE",
			seedCategoryID:  1,
			RssURL:          "https://tech.uzabase.com/rss/category/Blog",
			PlatformSiteURL: "https://tech.uzabase.com/",
			FeedSiteURL:     "https://tech.uzabase.com/archive/category/Blog",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.uzabase.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "BASE",
			FeedName:        "BASE",
			seedCategoryID:  1,
			RssURL:          "https://devblog.thebase.in/rss",
			PlatformSiteURL: "https://devblog.thebase.in/",
			FeedSiteURL:     "https://devblog.thebase.in/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://devblog.thebase.in/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "タイミー",
			FeedName:        "タイミー",
			seedCategoryID:  1,
			RssURL:          "https://tech.timee.co.jp/rss",
			PlatformSiteURL: "https://tech.timee.co.jp/",
			FeedSiteURL:     "https://tech.timee.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.timee.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "はてな開発者ブログ",
			FeedName:        "はてな開発者ブログ",
			seedCategoryID:  1,
			RssURL:          "https://developer.hatenastaff.com/rss",
			PlatformSiteURL: "https://developer.hatenastaff.com/",
			FeedSiteURL:     "https://developer.hatenastaff.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://developer.hatenastaff.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "Money Forward",
			FeedName:        "Money Forward",
			seedCategoryID:  1,
			RssURL:          "https://moneyforward-dev.jp/rss",
			PlatformSiteURL: "https://moneyforward-dev.jp/",
			FeedSiteURL:     "https://moneyforward-dev.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://moneyforward-dev.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "pixiv",
			FeedName:        "pixiv",
			seedCategoryID:  1,
			RssURL:          "https://inside.pixiv.blog/rss",
			PlatformSiteURL: "https://inside.pixiv.blog/",
			FeedSiteURL:     "https://inside.pixiv.blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://inside.pixiv.blog/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "speee",
			FeedName:        "speee",
			seedCategoryID:  1,
			RssURL:          "https://tech.speee.jp/rss",
			PlatformSiteURL: "https://tech.speee.jp/",
			FeedSiteURL:     "https://tech.speee.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.speee.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "Gunosy",
			FeedName:        "Gunosy",
			seedCategoryID:  1,
			RssURL:          "https://tech.gunosy.io/rss",
			PlatformSiteURL: "https://tech.gunosy.io/",
			FeedSiteURL:     "https://tech.gunosy.io/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.gunosy.io/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "クックパッド",
			FeedName:        "クックパッド",
			seedCategoryID:  1,
			RssURL:          "https://techlife.cookpad.com/rss",
			PlatformSiteURL: "https://techlife.cookpad.com/",
			FeedSiteURL:     "https://techlife.cookpad.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://techlife.cookpad.com/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "wantedly",
			FeedName:        "wantedly",
			seedCategoryID:  1,
			RssURL:          "https://www.wantedly.com/stories/s/wantedly_engineers/rss.xml",
			PlatformSiteURL: "https://www.wantedly.com/",
			FeedSiteURL:     "https://www.wantedly.com/stories/s/wantedly_engineers",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://www.wantedly.com//favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "ABEJA",
			FeedName:        "ABEJA",
			seedCategoryID:  1,
			RssURL:          "https://tech-blog.abeja.asia/rss",
			PlatformSiteURL: "https://tech-blog.abeja.asia/",
			FeedSiteURL:     "https://tech-blog.abeja.asia/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech-blog.abeja.asia/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "AppBrew",
			FeedName:        "AppBrew",
			seedCategoryID:  1,
			RssURL:          "https://tech.appbrew.io/rss",
			PlatformSiteURL: "https://tech.appbrew.io/",
			FeedSiteURL:     "https://tech.appbrew.io/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.appbrew.io/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "エウレカ",
			FeedName:        "エウレカ",
			seedCategoryID:  1,
			RssURL:          "https://medium.com/feed/eureka-engineering",
			PlatformSiteURL: "https://medium.com/eureka-engineering/",
			FeedSiteURL:     "https://medium.com/eureka-engineering/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Airbnb",
			FeedName:        "Airbnb",
			seedCategoryID:  1,
			RssURL:          "https://medium.com/feed/airbnb-engineering",
			PlatformSiteURL: "https://medium.com/airbnb-engineering/",
			FeedSiteURL:     "https://medium.com/airbnb-engineering",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Atlassian",
			FeedName:        "Atlassian",
			seedCategoryID:  1,
			RssURL:          "https://blog.developer.atlassian.com/feed/",
			PlatformSiteURL: "https://blog.developer.atlassian.com/",
			FeedSiteURL:     "https://blog.developer.atlassian.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.developer.atlassian.com/wp-content/uploads/2019/02/cropped-Atlassian-Developer@2x-blue-rgb-32x32.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Docker",
			FeedName:        "Docker",
			seedCategoryID:  1,
			RssURL:          "https://www.docker.com/feed/",
			PlatformSiteURL: "https://www.docker.com/",
			FeedSiteURL:     "https://www.docker.com/blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://www.docker.com/wp-content/uploads/2024/02/cropped-docker-logo-favicon-32x32.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Facebook",
			FeedName:        "Facebook",
			seedCategoryID:  1,
			RssURL:          "https://engineering.fb.com/feed/",
			PlatformSiteURL: "https://engineering.fb.com/",
			FeedSiteURL:     "https://engineering.fb.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineering.fb.com/wp-content/themes/code-fb-com/favicon.ico",
			IsEng:           true,
		},
		{
			PlatformName:    "GitHub",
			FeedName:        "GitHub",
			seedCategoryID:  1,
			RssURL:          "https://github.blog/category/engineering/feed/",
			PlatformSiteURL: "https://github.blog/",
			FeedSiteURL:     "https://github.blog/category/engineering/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://github.githubassets.com/favicon.ico",
			IsEng:           true,
		},
		{
			PlatformName:    "Google",
			FeedName:        "Google",
			seedCategoryID:  1,
			RssURL:          "https://www.blogger.com/feeds/596098824972435195/posts/default",
			PlatformSiteURL: "https://developers.googleblog.com/",
			FeedSiteURL:     "https://developers.googleblog.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://developers.googleblog.com/favicon.ico",
			IsEng:           true,
		},
		{
			PlatformName:    "Instagram",
			FeedName:        "Instagram",
			seedCategoryID:  1,
			RssURL:          "https://instagram-engineering.com/feed",
			PlatformSiteURL: "https://instagram-engineering.com/",
			FeedSiteURL:     "https://instagram-engineering.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Netflix",
			FeedName:        "Netflix",
			seedCategoryID:  1,
			RssURL:          "https://netflixtechblog.com/feed",
			PlatformSiteURL: "https://netflixtechblog.com/",
			FeedSiteURL:     "https://netflixtechblog.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           true,
		},
		{
			PlatformName:    "PayPal",
			FeedName:        "PayPal",
			seedCategoryID:  1,
			RssURL:          "https://medium.com/feed/paypal-tech",
			PlatformSiteURL: "https://medium.com/paypal-tech/",
			FeedSiteURL:     "https://medium.com/paypal-tech/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Salesforce",
			FeedName:        "Salesforce",
			seedCategoryID:  1,
			RssURL:          "https://engineering.salesforce.com/feed/",
			PlatformSiteURL: "https://engineering.salesforce.com/",
			FeedSiteURL:     "https://engineering.salesforce.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineering.salesforce.com/wp-content/uploads/2022/05/salesforce-icon.png?w=32",
			IsEng:           true,
		},
		{
			PlatformName:    "Zoom",
			FeedName:        "Zoom",
			seedCategoryID:  1,
			RssURL:          "https://medium.com/feed/zoom-developer-blog",
			PlatformSiteURL: "https://medium.com/zoom-developer-blog/",
			FeedSiteURL:     "https://medium.com/zoom-developer-blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Asana",
			FeedName:        "Asana",
			seedCategoryID:  1,
			RssURL:          "https://blog.asana.com/category/eng/feed/",
			PlatformSiteURL: "https://blog.asana.com/category/eng/",
			FeedSiteURL:     "https://blog.asana.com/category/eng/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://d1gwm4cf8hecp4.cloudfront.net/images/favicons/apple-touch-icon-57x57.png",
			IsEng:           true,
		},
		{
			PlatformName:    "mercari",
			FeedName:        "mercari",
			seedCategoryID:  1,
			RssURL:          "https://engineering.mercari.com/en/blog/feed.xml",
			PlatformSiteURL: "https://engineering.mercari.com/en/blog/",
			FeedSiteURL:     "https://engineering.mercari.com/en/blog/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://engineering.mercari.com/favicon.ico/",
			IsEng:           true,
		},
		{
			PlatformName:    "ROUTE 06",
			FeedName:        "ROUTE 06",
			seedCategoryID:  1,
			RssURL:          "https://tech.route06.co.jp/feed",
			PlatformSiteURL: "https://tech.route06.co.jp/",
			FeedSiteURL:     "https://tech.route06.co.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://tech.route06.co.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "スタディサプリ",
			FeedName:        "スタディサプリ",
			seedCategoryID:  1,
			RssURL:          "https://blog.studysapuri.jp/rss",
			PlatformSiteURL: "https://blog.studysapuri.jp/",
			FeedSiteURL:     "https://blog.studysapuri.jp/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.studysapuri.jp/icon/favicon",
			IsEng:           false,
		},
		{
			PlatformName:    "Menthas",
			FeedName:        "Menthas",
			seedCategoryID:  2,
			RssURL:          "https://menthas.com/all/rss",
			PlatformSiteURL: "https://menthas.com/",
			FeedSiteURL:     "https://menthas.com/",
			PlatformType:    domain.PlatformTypeSummary,
			FaviconURL:      "https://menthas.com/apple-touch-icon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Menthas",
			FeedName:        "Menthas programing",
			seedCategoryID:  4,
			RssURL:          "https://menthas.com/programming/rss",
			PlatformSiteURL: "https://menthas.com/",
			FeedSiteURL:     "https://menthas.com/programming/",
			PlatformType:    domain.PlatformTypeSummary,
			FaviconURL:      "https://menthas.com/apple-touch-icon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Menthas",
			FeedName:        "Menthas javascript",
			seedCategoryID:  5,
			RssURL:          "https://menthas.com/javascript/rss",
			PlatformSiteURL: "https://menthas.com/",
			FeedSiteURL:     "https://menthas.com/javascript/",
			PlatformType:    domain.PlatformTypeSummary,
			FaviconURL:      "https://menthas.com/apple-touch-icon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Menthas",
			FeedName:        "Menthas infrastructure",
			seedCategoryID:  25,
			RssURL:          "https://menthas.com/infrastructure/rss",
			PlatformSiteURL: "https://menthas.com/",
			FeedSiteURL:     "https://menthas.com/infrastructure/",
			PlatformType:    domain.PlatformTypeSummary,
			FaviconURL:      "https://menthas.com/apple-touch-icon.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn React",
			seedCategoryID:  18,
			RssURL:          "https://zenn.dev/topics/react/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/react/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Next.js",
			seedCategoryID:  18,
			RssURL:          "https://zenn.dev/topics/nextjs/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/nextjs/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn React Native",
			seedCategoryID:  26,
			RssURL:          "https://zenn.dev/topics/reactnative/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/reactnative/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn JavaScript",
			seedCategoryID:  5,
			RssURL:          "https://zenn.dev/topics/javascript/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/javascript/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn TypeScript",
			seedCategoryID:  6,
			RssURL:          "https://zenn.dev/topics/typescript/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/typescript/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Node.js",
			seedCategoryID:  22,
			RssURL:          "https://zenn.dev/topics/nodejs/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/nodejs/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Golang",
			seedCategoryID:  9,
			RssURL:          "https://zenn.dev/topics/go/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/go/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn AWS",
			seedCategoryID:  28,
			RssURL:          "https://zenn.dev/topics/aws/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/aws/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn GCP",
			seedCategoryID:  29,
			RssURL:          "https://zenn.dev/topics/gcp/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/gcp/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Docker",
			seedCategoryID:  31,
			RssURL:          "https://zenn.dev/topics/docker/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/docker/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn GraphQL",
			seedCategoryID:  36,
			RssURL:          "https://zenn.dev/topics/graphql/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/graphql/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn GitHub",
			seedCategoryID:  37,
			RssURL:          "https://zenn.dev/topics/github/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/github/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn GitHub Actions",
			seedCategoryID:  40,
			RssURL:          "https://zenn.dev/topics/githubactions/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/githubactions/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn GitHub Actions",
			seedCategoryID:  41,
			RssURL:          "https://zenn.dev/topics/chatgpt/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/chatgpt/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn 個人開発",
			seedCategoryID:  42,
			RssURL:          "https://zenn.dev/topics/個人開発/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/個人開発/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Frontend",
			seedCategoryID:  43,
			RssURL:          "https://zenn.dev/topics/frontend/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/frontend/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Zenn",
			FeedName:        "Zenn Test",
			seedCategoryID:  44,
			RssURL:          "https://zenn.dev/topics/test/feed",
			PlatformSiteURL: "https://zenn.dev/",
			FeedSiteURL:     "https://zenn.dev/topics/test/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://static.zenn.studio/images/logo-transparent.png",
			IsEng:           false,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode React",
			seedCategoryID:  18,
			RssURL:          "https://hashnode.com/n/reactjs/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/reactjs/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Next.js",
			seedCategoryID:  20,
			RssURL:          "https://hashnode.com/n/nextjs/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/nextjs/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode React Native",
			seedCategoryID:  26,
			RssURL:          "https://hashnode.com/n/react-native/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/react-native/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Expo",
			seedCategoryID:  45,
			RssURL:          "https://hashnode.com/n/expo/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/expo/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Node.js",
			seedCategoryID:  22,
			RssURL:          "https://hashnode.com/n/nodejs/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/nodejs/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode TypeScript",
			seedCategoryID:  6,
			RssURL:          "https://hashnode.com/n/typescript/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/typescript/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Golang",
			seedCategoryID:  9,
			RssURL:          "https://hashnode.com/n/go/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/go/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},

		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode AWS",
			seedCategoryID:  28,
			RssURL:          "https://hashnode.com/n/aws/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/aws/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode GCP",
			seedCategoryID:  29,
			RssURL:          "https://hashnode.com/n/gcp/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/gcp/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Docker",
			seedCategoryID:  31,
			RssURL:          "https://hashnode.com/n/docker/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/docker/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Testing",
			seedCategoryID:  44,
			RssURL:          "https://hashnode.com/n/testing/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/testing/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode GraphQL",
			seedCategoryID:  36,
			RssURL:          "https://hashnode.com/n/graphql/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/graphql/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Frontend Development",
			seedCategoryID:  43,
			RssURL:          "https://hashnode.com/n/frontend-development/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/frontend-development/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Web Development",
			seedCategoryID:  4,
			RssURL:          "https://hashnode.com/n/web-development/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/web-development/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode ChatGPT",
			seedCategoryID:  41,
			RssURL:          "https://hashnode.com/n/chatgpt/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/chatgpt/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Developer",
			seedCategoryID:  4,
			RssURL:          "https://hashnode.com/n/developer/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/developer/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "Hashnode",
			FeedName:        "Hashnode Devops",
			seedCategoryID:  46,
			RssURL:          "https://hashnode.com/n/devops/rss",
			PlatformSiteURL: "https://hashnode.com/",
			FeedSiteURL:     "https://hashnode.com/n/devops/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png",
			IsEng:           true,
		},
		{
			PlatformName:    "LogRocket",
			FeedName:        "LogRocket",
			seedCategoryID:  1,
			RssURL:          "https://blog.logrocket.com/feed/",
			PlatformSiteURL: "https://blog.logrocket.com/",
			FeedSiteURL:     "https://blog.logrocket.com/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://blog.logrocket.com/wp-content/uploads/2019/06/cropped-cropped-favicon-196x196.png?w=192",
			IsEng:           true,
		},
		{
			PlatformName:    "フューチャー技術ブログ",
			FeedName:        "フューチャー技術ブログ",
			seedCategoryID:  1,
			RssURL:          "https://future-architect.github.io/atom.xml",
			PlatformSiteURL: "https://future-architect.github.io/",
			FeedSiteURL:     "https://future-architect.github.io/",
			PlatformType:    domain.PlatformTypeCompany,
			FaviconURL:      "https://future-architect.github.io/favicon.ico",
			IsEng:           false,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal",
			seedCategoryID:  1,
			RssURL:          "https://www.toptal.com/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal engineering",
			seedCategoryID:  47,
			RssURL:          "https://www.toptal.com/developers/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/developers/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal design",
			seedCategoryID:  48,
			RssURL:          "https://www.toptal.com/designers/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/designers/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal finance",
			seedCategoryID:  49,
			RssURL:          "https://www.toptal.com/finance/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/finance/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal project",
			seedCategoryID:  50,
			RssURL:          "https://www.toptal.com/project-managers/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/project-managers/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
		{
			PlatformName:    "toptal",
			FeedName:        "toptal product",
			seedCategoryID:  51,
			RssURL:          "https://www.toptal.com/product-managers/blog.rss",
			PlatformSiteURL: "https://www.toptal.com/",
			FeedSiteURL:     "https://www.toptal.com/product-managers/blog/",
			PlatformType:    domain.PlatformTypeSite,
			FaviconURL:      "https://frontier-assets.toptal.com/1fafc84237661afb2281.png",
			IsEng:           true,
		},
	}
}
