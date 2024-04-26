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
	article, _ := entity.Articles(qm.Where("article_url = ?", r.Link), qm.Where("platform_id = ?", f.PlatformID)).One(ctx, tx)
	if article != nil {
		feedArticleRelation, _ := entity.FeedArticleRelations(qm.Where("feed_id = ?", f.ID), qm.Where("article_id = ?", article.ID)).One(ctx, tx)
		if feedArticleRelation == nil {
			err := CreateFeedArticleRelation(ctx, tx, CreateFeedArticleRelationArg{
				FeedID:    f.ID,
				ArticleID: article.ID,
			})
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

	err := CreateArticle(ctx, tx, CreateArticleArg{
		ID:           articleID.String(),
		PlatformID:   f.PlatformID,
		Title:        r.Title,
		Description:  r.Description,
		ThumbnailURL: r.ImageURL,
		ArticleURL:   r.Link,
		PublishedAt:  r.PublishedAt,
		AuthorName:   &r.AuthorName,
		Tags:         &r.Tags,
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
	err = CreateFeedArticleRelation(ctx, tx, CreateFeedArticleRelationArg{
		FeedID:    f.ID,
		ArticleID: articleID.String(),
	})
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

type CreateArticleArg struct {
	ID           string
	PlatformID   string
	Title        string
	Description  string
	ThumbnailURL string
	ArticleURL   string
	PublishedAt  int
	AuthorName   *string
	Tags         *string
}

func CreateArticle(ctx context.Context, tx *sql.Tx, arg CreateArticleArg) error {
	publishedAt := time.Unix(int64(arg.PublishedAt), 0)
	articleTitle := arg.Title
	if len(articleTitle) > 255 {
		articleTitle = articleTitle[:255]
	}
	article := entity.Article{
		ID:           arg.ID,
		PlatformID:   arg.PlatformID,
		Title:        articleTitle,
		Description:  arg.Description,
		ThumbnailURL: arg.ThumbnailURL,
		ArticleURL:   arg.ArticleURL,
		PublishedAt:  publishedAt,
		IsPrivate:    false,
	}
	if arg.AuthorName != nil {
		article.AuthorName = null.StringFromPtr(arg.AuthorName)
	}
	if arg.Tags != nil {
		article.Tags = null.StringFromPtr(arg.Tags)
	}
	err := article.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}

type CreateFeedArticleRelationArg struct {
	FeedID    string
	ArticleID string
}

func CreateFeedArticleRelation(ctx context.Context, tx *sql.Tx, arg CreateFeedArticleRelationArg) error {
	feedArticleRelationID, _ := uuid.NewUUID()
	feedArticleRelation := entity.FeedArticleRelation{
		ID:        feedArticleRelationID.String(),
		FeedID:    arg.FeedID,
		ArticleID: arg.ArticleID,
	}
	err := feedArticleRelation.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}
