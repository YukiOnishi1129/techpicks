package crawler

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

type ArticleContentsCrawlerResponse struct {
	IsCreatedArticle             bool
	IsCreatedFeedArticleRelation bool
	IsRollback                   bool
	IsCommit                     bool
}

func ArticleContentsCrawler(ctx context.Context, tx *sql.Tx, f *entity.Feed, r repository.RSS) (ArticleContentsCrawlerResponse, error) {
	isSkip := false
	isCreatedFeedArticleRelation := false
	// 1. check article table at article_url
	articles, _ := entity.Articles(qm.Where("article_url = ?", r.Link), qm.Where("platform_id = ?", f.PlatformID)).All(ctx, tx)
	if articles != nil {
		for _, a := range articles {
			feedArticleRelation, _ := entity.FeedArticleRelations(qm.Where("feed_id = ?", f.ID), qm.Where("article_id = ?", a.ID)).One(ctx, tx)
			if feedArticleRelation == nil {
				err := createFeedArticleRelation(ctx, tx, f.ID, a.ID)
				if err != nil {
					log.Printf("【error insert feed article relation】: %s", r.Title)
					return ArticleContentsCrawlerResponse{
						IsCreatedArticle:             false,
						IsCreatedFeedArticleRelation: false,
						IsRollback:                   true,
						IsCommit:                     false,
					}, err
				}
				isCreatedFeedArticleRelation = true
				break
			}
		}
		isSkip = true
	}
	if isSkip {
		return ArticleContentsCrawlerResponse{
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: isCreatedFeedArticleRelation,
			IsRollback:                   false,
			IsCommit:                     true,
		}, nil
	}
	// create article and feed_article_relation data
	// insert article
	articleID, _ := uuid.NewUUID()
	err := createArticle(ctx, tx, createArticleArg{
		ID: articleID.String(),
		f:  f,
		r:  r,
	})
	if err != nil {
		log.Printf("【error insert article】: %s, err: %v", r.Title, err)
		return ArticleContentsCrawlerResponse{
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: false,
			IsRollback:                   true,
			IsCommit:                     false,
		}, err
	}

	// insert feed article relation
	err = createFeedArticleRelation(ctx, tx, f.ID, articleID.String())
	if err != nil {
		log.Printf("【error insert feed article relation】: %s", r.Title)
		return ArticleContentsCrawlerResponse{
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: false,
			IsRollback:                   true,
			IsCommit:                     false,
		}, err
	}
	log.Printf("【create article】: %s", r.Title)

	return ArticleContentsCrawlerResponse{
		IsCreatedArticle:             true,
		IsCreatedFeedArticleRelation: true,
		IsRollback:                   false,
		IsCommit:                     true,
	}, nil
}

type createArticleArg struct {
	ID string
	f  *entity.Feed
	r  repository.RSS
}

func createArticle(ctx context.Context, tx *sql.Tx, arg createArticleArg) error {
	publishedAt := time.Unix(int64(arg.r.PublishedAt), 0)
	articleTitle := arg.r.Title
	if len(articleTitle) > 255 {
		articleTitle = articleTitle[:255]
	}
	article := entity.Article{
		ID:           arg.ID,
		PlatformID:   arg.f.PlatformID,
		Title:        articleTitle,
		Description:  arg.r.Description,
		ThumbnailURL: arg.r.ImageURL,
		ArticleURL:   arg.r.Link,
		PublishedAt:  publishedAt,
		IsPrivate:    false,
	}
	if arg.r.AuthorName != "" {
		article.AuthorName = null.StringFrom(arg.r.AuthorName)
	}
	if arg.r.Tags != "" {
		article.Tags = null.StringFrom(arg.r.Tags)
	}
	err := article.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}

func createFeedArticleRelation(ctx context.Context, tx *sql.Tx, feedID, articleID string) error {
	feedArticleRelationID, _ := uuid.NewUUID()
	feedArticleRelation := entity.FeedArticleRelation{
		ID:        feedArticleRelationID.String(),
		FeedID:    feedID,
		ArticleID: articleID,
	}
	err := feedArticleRelation.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}
