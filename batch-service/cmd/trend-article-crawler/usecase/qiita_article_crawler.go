package usecase

import (
	"context"
	"log"
	"strings"

	"github.com/YukiOnishi1129/techpicks/batch-service/internal"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"
)

const removePath = "/items/"

type qiitaArticleCrawlerArg struct {
	FeedID     string
	PlatformID string
	FeedName   string
	RSSURL     string
	IsEng      bool
}

func (u *Usecase) qiitaArticleCrawler(ctx context.Context, arg qiitaArticleCrawlerArg) error {
	log.Printf("【start qiita article crawler】: %s", arg.FeedName)
	aCount := 0
	farCount := 0
	taCreatedCount := 0
	taUpdatedCount := 0
	// get rss
	rss, err := u.rr.GetRSS(arg.RSSURL)
	if err != nil {
		log.Printf("【error get rss】: %s, %v", arg.FeedName, err)
		return err
	}

	for _, r := range rss {
		// transaction
		tx, err := u.db.BeginTx(ctx, nil)
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			continue
		}
		path, err := internal.GetURLPath(r.Link)
		if err != nil {
			log.Printf("【error get url path】: %s", err)
			continue
		}
		_, qiitaArticleID, ok := strings.Cut(path, removePath)
		if !ok {
			log.Printf("【error cut url path】: %s, %s", err, qiitaArticleID)
			continue
		}

		q, err := u.air.GetQiitaArticles(qiitaArticleID)
		if err != nil {
			log.Printf("【error get qiita articles api】: %s, %v", arg.FeedName, err)
			continue
		}
		res, err := crawler.TrendArticleContentsCrawler(ctx, tx, crawler.TrendArticleContentsCrawlerArg{
			FeedID:             arg.FeedID,
			PlatformID:         arg.PlatformID,
			ArticleTitle:       r.Title,
			ArticleURL:         r.Link,
			ArticleLikeCount:   q.LikesCount,
			ArticlePublishedAt: r.PublishedAt,
			ArticleAuthorName:  &r.AuthorName,
			ArticleTags:        &r.Tags,
			ArticleOGPImageURL: r.ImageURL,
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
			log.Printf("【error create article】:feed: %s,  article: %s", arg.FeedName, r.Title)
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
	log.Printf("【end qiita article crawler】: %s", arg.FeedName)
	log.Printf("【add article count】: %d", aCount)
	log.Printf("【add feed_article_relationcount】: %d", farCount)
	log.Printf("【add trend_article count】: %d", taCreatedCount)
	log.Printf("【update trend_article count】: %d", taUpdatedCount)

	return nil
}
