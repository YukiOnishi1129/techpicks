package seeders

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/firestore/repository"
	"github.com/google/uuid"
	"time"
)

type PlatformSeedInterface interface {
	SeedPlatform(ctx context.Context) error
}

type PlatformSeed struct {
	pr *repository.PlatformRepository
}

func NewPlatformSeed(pr *repository.PlatformRepository) *PlatformSeed {
	return &PlatformSeed{pr: pr}
}

type platformType struct {
	Name         string
	RssUrl       string
	SiteUrl      string
	PlatformType domain.PlatformType
	IsEng        bool
}

func (ps *PlatformSeed) SeedPlatform(ctx context.Context) error {
	batch := ps.pr.Client.BulkWriter(ctx)
	platforms := getPlatforms()
	for _, platform := range platforms {
		platformID, err := uuid.NewUUID()
		if err != nil {
			return err
		}
		createdAt := time.Now().Format("2006-01-02T15:04:05Z")

		ref := ps.pr.Client.Collection("platforms").Doc(platformID.String())
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
	}
}
