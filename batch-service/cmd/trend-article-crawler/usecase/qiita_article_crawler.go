package usecase

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"strings"
	"sync"
	"time"
)

const removePath = "/items/"

func (u *Usecase) qiitaArticleCrawler(ctx context.Context, feed *entity.Feed) error {
	log.Printf("【start qiita article crawler】: %s", feed.Name)

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
		log.Printf("【skip qiita article crawler, because there was data 5 hours ago】")
		log.Printf("【end qiita article crawler】: %s", feed.Name)
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

	wg := new(sync.WaitGroup)

	for _, r := range rss {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// transaction
			tx, err := u.db.BeginTx(ctx, nil)
			if err != nil {
				log.Printf("【error begin transaction】: %s", err)
				return
			}
			path, err := internal.GetURLPath(r.Link)
			if err != nil {
				log.Printf("【error get url path】: %s", err)
				return
			}
			_, qiitaArticleID, ok := strings.Cut(path, removePath)
			if !ok {
				log.Printf("【error cut url path】: %s, %s", err, qiitaArticleID)
				return
			}

			q, err := u.air.GetQiitaArticles(qiitaArticleID)
			if err != nil {
				log.Printf("【error get qiita articles api】: %s, %v", feed.Name, err)
				return
			}
			res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
				Feed:               feed,
				ArticleTitle:       r.Title,
				ArticleURL:         r.Link,
				ArticleLikeCount:   q.LikesCount,
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
					return
				}
			}

			if err != nil {
				log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, r.Title)
				return
			}
			if res.IsCommit {
				if res.IsCreatedArticle {
					aCount++
				}
				if res.IsCreatedFeedArticleRelation {
					farCount++
				}
				if res.IsTrendArticle {
					taCount++
				}
				//commit
				err := tx.Commit()
				if err != nil {
					log.Printf("【error commit transaction】: %s", err)
					return
				}
			}
		}()
	}
	wg.Wait()
	log.Printf("【end qiita article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCount)

	return nil
}
