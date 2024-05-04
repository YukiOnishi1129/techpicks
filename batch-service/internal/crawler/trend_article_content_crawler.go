package crawler

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

type TrendArticleContentsCrawlerArg struct {
	Feed               *entity.Feed
	ArticleTitle       string
	ArticleURL         string
	ArticleLikeCount   int
	ArticlePublishedAt int
	ArticleAuthorName  *string
	ArticleTags        *string
	ArticleOGPImageURL string
}

type TrendArticleContentsCrawlerResponse struct {
	IsCreatedTrendArticle        bool
	IsUpdatedTrendArticle        bool
	IsCreatedArticle             bool
	IsCreatedFeedArticleRelation bool
	IsRollback                   bool
	IsCommit                     bool
}

func TrendArticleContentsCrawler(ctx context.Context, tx *sql.Tx, arg TrendArticleContentsCrawlerArg) (TrendArticleContentsCrawlerResponse, error) {
	isCreatedFeedArticleRelation := false
	IsCreatedTrendArticle := false
	IsUpdatedTrendArticle := false
	oneHoursAgo := time.Now().Add(-1 * time.Hour)
	// 1. check article table at article_url
	article, _ := entity.Articles(
		qm.Where("article_url = ?", arg.ArticleURL),
		qm.Where("platform_id = ?", arg.Feed.PlatformID),
	).One(ctx, tx)
	if article != nil {
		// 2. check trend_article table at article_id
		trandArticle, _ := entity.TrendArticles(
			qm.Where("article_id = ?", article.ID),
			qm.Where("platform_id = ?", arg.Feed.PlatformID),
		).One(ctx, tx)
		if trandArticle == nil {
			// insert trend_article
			err := CreateTrendArticle(ctx, tx, CreateTrendArticleArg{
				ArticleID:  article.ID,
				PlatformID: arg.Feed.PlatformID,
				LikeCount:  arg.ArticleLikeCount,
			})
			if err != nil {
				log.Printf("【error insert trend article】: %s", arg.ArticleTitle)
				return TrendArticleContentsCrawlerResponse{
					IsCreatedTrendArticle:        false,
					IsUpdatedTrendArticle:        false,
					IsCreatedArticle:             false,
					IsCreatedFeedArticleRelation: false,
					IsRollback:                   true,
					IsCommit:                     false,
				}, err
			}
			IsCreatedTrendArticle = true
		}

		if trandArticle != nil && trandArticle.UpdatedAt.Before(oneHoursAgo) {
			// update trend_article
			trandArticle.LikeCount = arg.ArticleLikeCount
			_, err := trandArticle.Update(ctx, tx, boil.Infer())
			if err != nil {
				log.Printf("【error update trend article】: %s", arg.ArticleTitle)
				return TrendArticleContentsCrawlerResponse{
					IsCreatedTrendArticle:        false,
					IsUpdatedTrendArticle:        false,
					IsCreatedArticle:             false,
					IsCreatedFeedArticleRelation: false,
					IsRollback:                   true,
					IsCommit:                     false,
				}, err
			}
			IsUpdatedTrendArticle = true
		}

		// check feed_article_relation table at article_url
		feedArticleRelation, _ := entity.FeedArticleRelations(
			qm.Where("feed_id = ?", arg.Feed.ID),
			qm.Where("article_id = ?", article.ID),
		).One(ctx, tx)
		if feedArticleRelation == nil {
			err := CreateFeedArticleRelation(ctx, tx, CreateFeedArticleRelationArg{
				FeedID:    arg.Feed.ID,
				ArticleID: article.ID,
			})
			if err != nil {
				log.Printf("【error insert feed article relation】: %s", article.Title)
				return TrendArticleContentsCrawlerResponse{
					IsCreatedTrendArticle:        false,
					IsUpdatedTrendArticle:        false,
					IsCreatedArticle:             false,
					IsCreatedFeedArticleRelation: false,
					IsRollback:                   true,
					IsCommit:                     false,
				}, err
			}
			isCreatedFeedArticleRelation = true
		}
		return TrendArticleContentsCrawlerResponse{
			IsCreatedTrendArticle:        IsCreatedTrendArticle,
			IsUpdatedTrendArticle:        IsUpdatedTrendArticle,
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: isCreatedFeedArticleRelation,
			IsRollback:                   false,
			IsCommit:                     true,
		}, nil
	}

	// create article and feed_article_relation data
	// insert article
	articleID, _ := uuid.NewUUID()
	// insert article table
	err := CreateArticle(ctx, tx, CreateArticleArg{
		ID:           articleID.String(),
		PlatformID:   arg.Feed.PlatformID,
		Title:        arg.ArticleTitle,
		Description:  "",
		ThumbnailURL: arg.ArticleOGPImageURL,
		ArticleURL:   arg.ArticleURL,
		PublishedAt:  arg.ArticlePublishedAt,
		AuthorName:   arg.ArticleAuthorName,
		Tags:         arg.ArticleTags,
		IsEng:        arg.Feed.R.Platform.IsEng,
	})
	if err != nil {
		log.Printf("【error insert article】: %s, err: %v", arg.ArticleTitle, err)
		return TrendArticleContentsCrawlerResponse{
			IsCreatedTrendArticle:        false,
			IsUpdatedTrendArticle:        false,
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: false,
			IsRollback:                   true,
			IsCommit:                     false,
		}, err
	}

	// insert feed article relation table
	err = CreateFeedArticleRelation(ctx, tx, CreateFeedArticleRelationArg{
		FeedID:    arg.Feed.ID,
		ArticleID: articleID.String(),
	})
	if err != nil {
		log.Printf("【error insert feed article relation】: %s", arg.ArticleTitle)
		return TrendArticleContentsCrawlerResponse{
			IsCreatedTrendArticle:        false,
			IsUpdatedTrendArticle:        false,
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: false,
			IsRollback:                   true,
			IsCommit:                     false,
		}, err
	}

	// insert trend_article table
	err = CreateTrendArticle(ctx, tx, CreateTrendArticleArg{
		ArticleID:  articleID.String(),
		PlatformID: arg.Feed.PlatformID,
		LikeCount:  arg.ArticleLikeCount,
	})
	if err != nil {
		log.Printf("【error insert trend article】: %s", arg.ArticleTitle)
		return TrendArticleContentsCrawlerResponse{
			IsCreatedTrendArticle:        false,
			IsUpdatedTrendArticle:        false,
			IsCreatedArticle:             false,
			IsCreatedFeedArticleRelation: false,
			IsRollback:                   true,
			IsCommit:                     false,
		}, err
	}

	log.Printf("【create article】: %s", arg.ArticleTitle)

	return TrendArticleContentsCrawlerResponse{
		IsCreatedTrendArticle:        true,
		IsUpdatedTrendArticle:        false,
		IsCreatedArticle:             true,
		IsCreatedFeedArticleRelation: true,
		IsRollback:                   false,
		IsCommit:                     true,
	}, nil
}

type CreateTrendArticleArg struct {
	ArticleID  string
	PlatformID string
	LikeCount  int
}

func CreateTrendArticle(ctx context.Context, tx *sql.Tx, arg CreateTrendArticleArg) error {
	trendArticleID, _ := uuid.NewUUID()
	trendArticle := entity.TrendArticle{
		ID:         trendArticleID.String(),
		ArticleID:  arg.ArticleID,
		PlatformID: arg.PlatformID,
		LikeCount:  arg.LikeCount,
	}
	err := trendArticle.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}
