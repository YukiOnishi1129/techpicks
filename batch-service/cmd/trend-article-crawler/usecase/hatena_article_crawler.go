package usecase

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

func (u *Usecase) hatenaArticleCrawler(ctx context.Context, feed *entity.Feed) error {
	log.Printf("【start haneta article crawler】: %s", feed.Name)
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
		log.Printf("【skip hantena article crawler, because there was data 5 hours ago】")
		log.Printf("【end hantena article crawler】: %s", feed.Name)
		return nil
	}
	aCount := 0
	farCount := 0
	taCount := 0
	// get rss
	rss, err := u.rr.GetRSS(feed.RSSURL)
	if err != nil {
		log.Printf("【error get rss】: %s, %v", feed.Name, err)
		return err
	}

	for _, r := range rss {
		// transaction
		tx, err := u.db.BeginTx(ctx, nil)
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			continue
		}

		count, err := u.air.GetHatenaArticles(r.Link)
		if err != nil {
			log.Printf("【error get hatena articles api】: %s, %v", feed.Name, err)
			continue
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			Feed:               feed,
			ArticleTitle:       r.Title,
			ArticleURL:         r.Link,
			ArticleLikeCount:   count,
			ArticlePublishedAt: r.PublishedAt,
			ArticleAuthorName:  &r.AuthorName,
			ArticleTags:        &r.Tags,
			ArticleOGPImageURL: r.ImageURL,
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
			log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, r.Title)
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
	log.Printf("【end haneta article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCount)

	return nil
}