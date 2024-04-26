package usecase

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"log"
	"time"
)

func (u *Usecase) DevCommunityArticleCrawler(ctx context.Context, feed *entity.Feed) error {
	log.Printf("【start dev community article crawler】: %s", feed.Name)

	aCount := 0
	farCount := 0
	taCount := 0
	// get dev community articles by api
	res, err := u.air.GetDevCommunityArticles(&feed.APIQueryParam.String)
	if err != nil {
		log.Printf("【error get dev community articles】: %s, %v", feed.Name, err)
		return err
	}
	for _, d := range res {
		// transaction
		tx, err := u.db.Begin()
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		publishedAt := int(time.Time.Unix(internal.StringToTime(d.PublishedTimestamp)))
		if err != nil {
			log.Printf("【error get ogp image】: %s", err)
			return err
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			Feed:               feed,
			ArticleTitle:       d.Title,
			ArticleURL:         d.URL,
			ArticleLikeCount:   d.PublicReactionsCount,
			ArticlePublishedAt: publishedAt,
			ArticleAuthorName:  &d.User.UserName,
			ArticleTags:        &d.Tags,
			ArticleOGPImageURL: d.CoverImage,
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
			log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, d.Title)
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
	log.Printf("【end dev community article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCount)

	return nil
}
