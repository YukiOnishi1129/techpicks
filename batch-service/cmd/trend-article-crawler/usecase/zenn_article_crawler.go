package usecase

import (
	"context"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/ogp"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

func (u *Usecase) zennArticleCrawler(ctx context.Context, feed *entity.Feed) error {
	log.Printf("【start zenn article crawler】: %s", feed.Name)
	fiveHoursAgo := time.Now().Add(-5 * time.Hour).Format("2006-01-02 15:04:05")
	// idempotency check
	trendCount, err := entity.TrendArticles(
		qm.Where("platform_id = ?", feed.PlatformID),
		qm.And("created_at >= ?", fiveHoursAgo),
	).Count(ctx, u.db)
	if err != nil {
		log.Printf("【error get trend article count】: %s", err)
		return err
	}
	if trendCount != 0 {
		log.Printf("【skip zenn article crawler, because there was data 5 hours ago】")
		log.Printf("【end zenn article crawler】: %s", feed.Name)
		return nil
	}
	aCount := 0
	farCount := 0
	taCount := 0
	// get zenn articles by api
	res, err := u.air.GetZennArticles()
	if err != nil {
		log.Printf("【error get zenn articles】: %s, %v", feed.Name, err)
		return err
	}

	for _, z := range res.Articles {
		// transaction
		tx, err := u.db.Begin()
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		articleURL := fmt.Sprintf("https://zenn.dev/articles%s", z.Path)
		publishedAt := int(time.Time.Unix(internal.StringToTime(z.PublishedAt)))
		ogpImageURL, err := ogp.GetOgpImage(articleURL)
		if err != nil {
			log.Printf("【error get ogp image】: %s", err)
			return err
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			Feed:               feed,
			ArticleTitle:       z.Title,
			ArticleURL:         articleURL,
			ArticleLikeCount:   z.LikedCount,
			ArticlePublishedAt: publishedAt,
			ArticleAuthorName:  nil,
			ArticleTags:        nil,
			ArticleOGPImageURL: ogpImageURL,
		})
		if err != nil && res.IsRollback {
			log.Printf("【error rollback transaction】: %s", err)
			err = tx.Rollback()
			if err != nil {
				log.Printf("【error rollback transaction】: %s", err)
				continue
			}
		}

		if err != nil {
			log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, z.Title)
			continue
		}
		if res.IsCommit {
			if res.IsCreatedArticle {
				aCount++
			}
			if res.IsCreatedFeedArticleRelation {
				farCount++
			}
			if res.IsCreatedTrendArticle {
				taCount++
			}
			//commit
			err := tx.Commit()
			if err != nil {
				log.Printf("【error commit transaction】: %s", err)
				continue
			}
		}
	}
	log.Printf("【end zenn article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCount)

	return nil
}
