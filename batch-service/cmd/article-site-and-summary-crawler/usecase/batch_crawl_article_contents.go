package usecase

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	"log"
	"strconv"
	"sync"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BatchCrawlArticleContentsInterface interface {
	BatchCrawlArticleContents(ctx context.Context, db *sql.DB) error
}

func (u *Usecase) BatchCrawlArticleContents(ctx context.Context) error {
	now := time.Now()
	platformTypes := make([]interface{}, 2)
	platformTypes[0] = strconv.Itoa(int(domain.PlatformTypeSite))
	platformTypes[1] = strconv.Itoa(int(domain.PlatformTypeSummary))
	log.Printf("【start BatchCreateArticles】")
	feeds, err := entity.Feeds(qm.Where("feeds.deleted_at IS NULL"), qm.And("feeds.trend_platform_type = ?", 0), qm.InnerJoin("platforms on feeds.platform_id = platforms.id"), qm.WhereIn("platforms.platform_type IN ?", platformTypes...), qm.OrderBy("feeds.created_at asc")).All(ctx, u.db)
	if err != nil {
		log.Printf("【error get feeds】: %s", err)
		return err
	}
	// for feeds
	for _, f := range feeds {
		log.Printf("【start create article】: %s", f.Name)
		aCount := 0
		farCount := 0
		// get rss
		rss, err := u.rr.GetRSS(f.RSSURL)
		if err != nil {
			log.Printf("【error get rss】: %s, %v", f.Name, err)
			continue
		}
		wg := new(sync.WaitGroup)
		for _, r := range rss {
			wg.Add(1)
			r := r
			go func() {
				defer wg.Done()
				// transaction
				tx, err := u.db.BeginTx(ctx, nil)
				if err != nil {
					log.Printf("【error begin transaction】: %s", err)
					return
				}
				res := createArticle(ctx, tx, f, r)
				if res.err != nil && res.isRollback {
					log.Printf("【error rollback transaction】: %s", res.err)
					err = tx.Rollback()
					if err != nil {
						log.Printf("【error rollback transaction】: %s", res.err)
						return
					}
				}
				if err != nil {
					log.Printf("【error create article】:feed: %s,  article: %s", f.Name, r.Title)
					return
				}
				if res.isCommit {
					if res.isCreatedArticle {
						aCount++
					}
					if res.isCreatedFeedArticleRelation {
						farCount++
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
		log.Printf("【end create article】: %s", f.Name)
		log.Printf("【add article count】: %d", aCount)
		log.Printf("【add feed_article_relationcount】: %d", farCount)

	}
	log.Printf("【end BatchCreateArticles】")
	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)

	return nil
}

type CreateArticleResponse struct {
	isCreatedArticle             bool
	isCreatedFeedArticleRelation bool
	isRollback                   bool
	isCommit                     bool
	err                          error
}

func createArticle(ctx context.Context, tx *sql.Tx, f *entity.Feed, r repository.RSS) CreateArticleResponse {

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
					return CreateArticleResponse{
						isCreatedArticle:             false,
						isCreatedFeedArticleRelation: false,
						isRollback:                   true,
						isCommit:                     false,
						err:                          err,
					}
				}
				isCreatedFeedArticleRelation = true
				break
			}
		}
		isSkip = true
	}
	if isSkip {
		return CreateArticleResponse{
			isCreatedArticle:             false,
			isCreatedFeedArticleRelation: isCreatedFeedArticleRelation,
			isRollback:                   false,
			isCommit:                     true,
			err:                          nil,
		}
	}
	// create article and feed_article_relation data
	// insert article
	articleID, _ := uuid.NewUUID()
	publishedAt := time.Unix(int64(r.PublishedAt), 0)
	articleTitle := r.Title
	if len(articleTitle) > 255 {
		articleTitle = articleTitle[:255]
	}
	article := entity.Article{
		ID:           articleID.String(),
		PlatformID:   f.PlatformID,
		Title:        articleTitle,
		Description:  r.Description,
		ThumbnailURL: r.ImageURL,
		ArticleURL:   r.Link,
		PublishedAt:  publishedAt,
		IsPrivate:    false,
	}
	err := article.Insert(ctx, tx, boil.Infer())
	if err != nil {
		log.Printf("【error insert article】: %s, err: %v", r.Title, err)
		return CreateArticleResponse{
			isCreatedArticle:             false,
			isCreatedFeedArticleRelation: false,
			isRollback:                   true,
			isCommit:                     false,
			err:                          err,
		}
	}

	// insert feed article relation
	err = createFeedArticleRelation(ctx, tx, f.ID, articleID.String())
	if err != nil {
		log.Printf("【error insert feed article relation】: %s", r.Title)
		return CreateArticleResponse{
			isCreatedArticle:             false,
			isCreatedFeedArticleRelation: false,
			isRollback:                   true,
			isCommit:                     false,
			err:                          err,
		}
	}
	log.Printf("【create article】: %s", r.Title)

	return CreateArticleResponse{
		isCreatedArticle:             true,
		isCreatedFeedArticleRelation: true,
		isRollback:                   false,
		isCommit:                     true,
		err:                          nil,
	}
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
