package usecase

import (
	"context"
	"log"

	"github.com/Songmu/go-httpdate"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
)

func (u *Usecase) hashnodeArticleCrawler(ctx context.Context, feed *entity.Feed) error {
	log.Printf("【start hashnode article crawler】: %s", feed.Name)

	aCount := 0
	farCount := 0
	taCreatedCount := 0
	taUpdatedCount := 0
	// get hashnode articles by api
	hashRes, err := u.air.GetHashnodeArticles(repository.GetHashnodeArticlesArg{
		Tag: &feed.APIQueryParam.String,
	})
	if err != nil {
		log.Printf("【error get hashnode articles】: %s, %v", feed.Name, err)
		return err
	}
	for _, d := range hashRes.Feed.Edges {
		// transaction
		tx, err := u.db.Begin()
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		publishedAt, err := httpdate.Str2Time(d.Node.PublishedAt, nil)
		if err != nil {
			log.Printf("【error convert published at】: %s", err)
			return err
		}

		articleTags := ""
		for _, tag := range d.Node.Tags {
			articleTags += tag.Name + ","
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			FeedID:             feed.ID,
			PlatformID:         feed.PlatformID,
			ArticleTitle:       d.Node.Title,
			ArticleURL:         d.Node.URL,
			ArticleLikeCount:   d.Node.ReactionCount,
			ArticlePublishedAt: int(publishedAt.Unix()),
			ArticleAuthorName:  &d.Node.Author.Name,
			ArticleTags:        &articleTags,
			ArticleOGPImageURL: d.Node.CoverImage.URL,
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
			log.Printf("【error create article】:feed: %s,  article: %s", feed.Name, d.Node.Title)
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
				taCreatedCount++
			}
			if res.IsUpdatedTrendArticle {
				taUpdatedCount++
			}
			//commit
			err := tx.Commit()
			if err != nil {
				log.Printf("【error commit transaction】: %s", err)
				continue
			}
		}

	}
	log.Printf("【end hashnode article crawler】: %s", feed.Name)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCreatedCount)
	log.Printf("【update trend_article count】: %d", taUpdatedCount)

	return nil
}
