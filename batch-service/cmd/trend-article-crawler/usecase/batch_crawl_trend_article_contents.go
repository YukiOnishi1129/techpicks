package usecase

import (
	"context"
	"log"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

func (u *Usecase) BatchCrawlTrendArticleContents(ctx context.Context) error {
	now := time.Now()
	log.Printf("【start BatchCrawlTrendArticleContents】")
	feeds, err := entity.Feeds(
		qm.Where("feeds.deleted_at IS NULL"),
		qm.And("feeds.trend_platform_type != ?", 0),
		qm.OrderBy("feeds.created_at asc"),
		qm.Load("Platform"),
	).All(ctx, u.db)
	if err != nil {
		log.Printf("【error get feeds】: %s", err)
		return err
	}
	if len(feeds) == 0 {
		log.Printf("【no feeds】")
		return nil
	}
	// MEMO: If there is data 5 hours ago, do not run the crawler
	//fiveHoursAgo := time.Now().Add(-5 * time.Hour).Format("2006-01-02 15:04:05")
	//// idempotency check
	//trendCount, err := entity.TrendArticles(
	//	qm.Where("platform_id = ?", feeds[0].PlatformID),
	//	qm.And("created_at >= ?", fiveHoursAgo),
	//).Count(ctx, u.db)
	//if err != nil {
	//	log.Printf("【error get trend article count】: %s", err)
	//	return err
	//}
	//if trendCount != 0 {
	//	log.Printf("【stop article crawler, because there was data 5 hours ago】")
	//	log.Printf("【end BatchCrawlTrendArticleContents】")
	//	return nil
	//}

	for _, f := range feeds {
		log.Printf("【start BatchCrawlTrendArticle】: %s", f.Name)
		switch f.TrendPlatformType {
		case int(domain.TrendPlatformTypeZenn):
			err = u.zennArticleCrawler(ctx, zennArticleCrawlerArg{
				FeedID:     f.ID,
				PlatformID: f.PlatformID,
				FeedName:   f.Name,
				IsEng:      f.R.Platform.IsEng,
			})
			if err != nil {
				log.Printf("【error zenn article crawler】: %s", err)
				continue
			}
		case int(domain.TrendPlatformTypeQiita):
			err = u.qiitaArticleCrawler(ctx, qiitaArticleCrawlerArg{
				FeedID:     f.ID,
				PlatformID: f.PlatformID,
				FeedName:   f.Name,
				RSSURL:     f.RSSURL,
				IsEng:      f.R.Platform.IsEng,
			})
			if err != nil {
				log.Printf("【error qiita article crawler】: %s", err)
				continue
			}
		case int(domain.TrendPlatformTypeHatena):
			err = u.hatenaArticleCrawler(ctx, hatenaArticleCrawlerArg{
				FeedID:     f.ID,
				PlatformID: f.PlatformID,
				FeedName:   f.Name,
				RSSURL:     f.RSSURL,
				IsEng:      f.R.Platform.IsEng,
			})
			if err != nil {
				log.Printf("【error hatena article crawler】: %s", err)
				continue
			}
		case int(domain.TrendPlatformTypeDevCommunity):
			err = u.devCommunityArticleCrawler(ctx, devCommunityArticleCrawlerArg{
				FeedID:        f.ID,
				PlatformID:    f.PlatformID,
				FeedName:      f.Name,
				APIQueryParam: &f.APIQueryParam.String,
				IsEng:         f.R.Platform.IsEng,
			})
			if err != nil {
				log.Printf("【error dev community article crawler】: %s", err)
				continue
			}
		case int(domain.TrendPlatformTypeHashnode):
			err = u.hashnodeArticleCrawler(ctx, hashnodeArticleCrawlerArg{
				FeedID:        f.ID,
				PlatformID:    f.PlatformID,
				FeedName:      f.Name,
				APIQueryParam: &f.APIQueryParam.String,
				IsEng:         f.R.Platform.IsEng,
			})
			if err != nil {
				log.Printf("【error hashnode article crawler】: %s", err)
				continue
			}
		default:
			continue
		}

	}

	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)
	return nil
}
