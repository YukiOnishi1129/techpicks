package usecase

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/ogp"
	"log"
	"sync"
	"time"
)

type ArticleContentsCrawlerResponse struct {
	IsCreatedArticle             bool
	IsCreatedFeedArticleRelation bool
	IsRollback                   bool
	IsCommit                     bool
}

func zennArticleCrawler(ctx context.Context, db *sql.DB, feed *entity.Feed, zeeArticles []repository.ZennItem) error {
	log.Printf("【start zenn article crawler】: %s", feed.Name)
	aCount := 0
	farCount := 0
	taCount := 0

	wg := new(sync.WaitGroup)
	for _, z := range zeeArticles {
		wg.Add(1)
		// transaction
		tx, err := db.Begin()
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
		go func() {
			defer wg.Done()
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
					return
				}
			}

			if err != nil {
				log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, z.Title)
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
	log.Printf("【end zenn article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCount)

	return nil
}
