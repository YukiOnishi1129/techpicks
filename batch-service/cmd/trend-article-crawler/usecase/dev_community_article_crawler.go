package usecase

import (
	"context"
	"log"

	"github.com/Songmu/go-httpdate"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
)

type devCommunityArticleCrawlerArg struct {
	FeedID        string
	PlatformID    string
	FeedName      string
	APIQueryParam *string
	IsEng         bool
}

func (u *Usecase) devCommunityArticleCrawler(ctx context.Context, arg devCommunityArticleCrawlerArg) error {
	log.Printf("【start dev community article crawler】: %s", arg.FeedName)

	aCount := 0
	farCount := 0
	taCreatedCount := 0
	taUpdatedCount := 0
	// get dev community articles by api
	res, err := u.air.GetDevCommunityArticles(arg.APIQueryParam)
	if err != nil {
		log.Printf("【error get dev community articles】: %s, %v", arg.FeedName, err)
		return err
	}
	for _, d := range res {
		// transaction
		tx, err := u.db.Begin()
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		publishedAt, err := httpdate.Str2Time(d.PublishedTimestamp, nil)
		if err != nil {
			log.Printf("【error convert published at】: %s", err)
			return err
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			FeedID:             arg.FeedID,
			PlatformID:         arg.PlatformID,
			ArticleTitle:       d.Title,
			ArticleURL:         d.URL,
			ArticleLikeCount:   d.PublicReactionsCount,
			ArticlePublishedAt: int(publishedAt.Unix()),
			ArticleAuthorName:  &d.User.UserName,
			ArticleTags:        &d.Tags,
			ArticleOGPImageURL: d.CoverImage,
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
			log.Printf("【error create article】:feed: %s,  article: %s", arg.FeedName, d.Title)
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
	log.Printf("【end dev community article crawler】: %s", arg.FeedName)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCreatedCount)
	log.Printf("【update trend_article count】: %d", taUpdatedCount)

	return nil
}
