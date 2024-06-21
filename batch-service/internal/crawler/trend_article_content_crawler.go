package crawler

import (
	"context"
	"database/sql"
	"log"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type TrendArticleContentsCrawlerArg struct {
	FeedID             string
	PlatformID         string
	ArticleTitle       string
	ArticleURL         string
	ArticleLikeCount   int
	ArticlePublishedAt int
	ArticleAuthorName  *string
	ArticleTags        *string
	ArticleOGPImageURL string
	IsEng              bool
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
		qm.Where("platform_id = ?", arg.PlatformID),
	).One(ctx, tx)
	if article != nil {
		// 2. check trend_article table at article_id
		trendArticle, _ := entity.TrendArticles(
			qm.Where("article_id = ?", article.ID),
			qm.Where("platform_id = ?", arg.PlatformID),
		).One(ctx, tx)
		if trendArticle == nil {
			// insert trend_article
			err := CreateTrendArticle(ctx, tx, CreateTrendArticleArg{
				ArticleID:  article.ID,
				PlatformID: arg.PlatformID,
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

		if trendArticle != nil && trendArticle.UpdatedAt.Before(oneHoursAgo) && trendArticle.LikeCount < arg.ArticleLikeCount {
			// update trend_article
			trendArticle.LikeCount = arg.ArticleLikeCount
			_, err := trendArticle.Update(ctx, tx, boil.Infer())
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
			qm.Where("feed_id = ?", arg.FeedID),
			qm.Where("article_id = ?", article.ID),
		).One(ctx, tx)
		if feedArticleRelation == nil {
			err := CreateFeedArticleRelation(ctx, tx, CreateFeedArticleRelationArg{
				FeedID:    arg.FeedID,
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
		PlatformID:   arg.PlatformID,
		Title:        arg.ArticleTitle,
		Description:  "",
		ThumbnailURL: arg.ArticleOGPImageURL,
		ArticleURL:   arg.ArticleURL,
		PublishedAt:  arg.ArticlePublishedAt,
		AuthorName:   arg.ArticleAuthorName,
		Tags:         arg.ArticleTags,
		IsEng:        arg.IsEng,
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
		FeedID:    arg.FeedID,
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
		PlatformID: arg.PlatformID,
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
