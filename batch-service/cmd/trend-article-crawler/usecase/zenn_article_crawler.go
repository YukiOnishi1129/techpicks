package usecase

import (
	"context"
	"fmt"
	"log"

	"github.com/Songmu/go-httpdate"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/ogp"
)

type zennArticleCrawlerArg struct {
	FeedID     string
	PlatformID string
	FeedName   string
	IsEng      bool
}

func (u *Usecase) zennArticleCrawler(ctx context.Context, arg zennArticleCrawlerArg) error {
	log.Printf("【start zenn article crawler】: %s", arg.FeedName)
	aCount := 0
	farCount := 0
	taCreatedCount := 0
	taUpdatedCount := 0
	// get zenn articles by api
	res, err := u.air.GetZennArticles()
	if err != nil {
		log.Printf("【error get zenn articles】: %s, %v", arg.FeedName, err)
		return err
	}

	for _, z := range res.Articles {
		// transaction
		tx, err := u.db.Begin()
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		articleURL := fmt.Sprintf("https://zenn.dev%s", z.Path)
		publishedAt, err := httpdate.Str2Time(z.PublishedAt, nil)
		if err != nil {
			log.Printf("【error convert published at】: %s", err)
			return err
		}
		ogpImageURL, err := ogp.GetOgpImage(articleURL)
		if err != nil {
			log.Printf("【error get ogp image】: %s", err)
			return err
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			FeedID:             arg.FeedID,
			PlatformID:         arg.PlatformID,
			ArticleTitle:       z.Title,
			ArticleURL:         articleURL,
			ArticleLikeCount:   z.LikedCount,
			ArticlePublishedAt: int(publishedAt.Unix()),
			ArticleAuthorName:  nil,
			ArticleTags:        nil,
			ArticleOGPImageURL: ogpImageURL,
			IsEng:              arg.IsEng,
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
			log.Printf("【error create article】:feed: %s,  article: %s", arg.FeedName, z.Title)
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
	log.Printf("【end zenn article crawler】: %s", arg.FeedName)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCreatedCount)
	log.Printf("【update trend_article count】: %d", taUpdatedCount)

	return nil
}
