package usecase

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

type BatchCrawlTrendArticleContentsInterface interface {
	BatchCrawlTrendArticleContents(ctx context.Context) error
	ZennArticleCrawler(ctx context.Context, feed *entity.Feed) error
}

func (u *Usecase) BatchCrawlTrendArticleContents(ctx context.Context) error {
	now := time.Now()
	log.Printf("【start BatchCrawlTrendArticleContents】")
	feeds, err := entity.Feeds(
		qm.Where("feeds.deleted_at IS NULL"),
		qm.And("feeds.trend_platform_type != ?", 0),
		qm.OrderBy("feeds.created_at asc"),
	).All(ctx, u.db)
	if err != nil {
		log.Printf("【error get feeds】: %s", err)
		return err
	}

	for _, f := range feeds {
		log.Printf("【start BatchCrawlTrendArticle】: %s", f.Name)

		switch f.TrendPlatformType {
		case int(domain.TrendPlatformTypeZenn):
			// get zenn articles by api
			res, err := u.air.GetZennArticles()
			if err != nil {
				log.Printf("【error get zenn articles】: %s, %v", f.Name, err)
				continue
			}
			err = zennArticleCrawler(ctx, u.db, f, res.Articles)
			if err != nil {
				log.Printf("【error zenn article crawler】: %s", err)
				continue
			}
		case int(domain.TrendPlatformTypeQiita):
			// qiita
		case int(domain.TrendPlatformTypeHatena):
			// hatena
		case int(domain.TrendPlatformTypeDevCommunity):
		// dev community
		default:
			continue
		}

	}

	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)
	return nil
}
