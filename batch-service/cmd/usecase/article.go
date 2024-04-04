package usecase

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

type ArticleUsecaseInterface interface {
	CreateArticles(ctx context.Context, db *sql.DB) error
}

type ArticleUsecase struct {
	db *sql.DB
}

func NewArticleUsecase(db *sql.DB) *ArticleUsecase {
	return &ArticleUsecase{
		db: db,
	}
}

func (au *ArticleUsecase) BatchCreateArticles(ctx context.Context) error {
	now := time.Now()
	log.Printf("【start BatchCreateArticles】")
	feeds, err := entity.Feeds(qm.Where("deleted_at IS NULL"), qm.OrderBy("created_at")).All(ctx, au.db)
	if err != nil {
		log.Printf("【error get feeds】: %s", err)
		return err
	}
	// for feeds
	for _, f := range feeds {
		// transaction
		tx, err := au.db.BeginTx(ctx, nil)
		if err != nil {
			log.Printf("【error begin transaction】: %s", err)
			return err
		}
		log.Printf("【begin transaction】")

		log.Printf("【start create article】: %s", f.Name)
		aCount := 0
		// get rss
		rss, err := GetRSS(f.RSSURL)
		if err != nil {
			log.Printf("【error get rss】: %s", f.Name)
			continue
		}

		for _, r := range rss {
			isSkip := false
			// 1. check article table at article_url
			articles, _ := entity.Articles(qm.Where("article_url = ?", r.Link)).All(ctx, tx)
			if articles != nil {
				for _, a := range articles {
					feedArticleRelation, _ := entity.FeedArticleRelations(qm.Where("feed_id = ?", f.ID), qm.Where("article_id = ?", a.ID)).One(ctx, tx)
					if feedArticleRelation == nil {
						print("🔥🔥🔥🔥🔥🔥🔥🔥")
						err = createFeedArticleRelation(ctx, tx, f.ID, a.ID)
						if err != nil {
							log.Printf("【error insert feed article relation】: %s", r.Title)
							continue
						}
						aCount++
						break
					}
				}
				isSkip = true
			}

			if isSkip {
				log.Printf("【skip create article】: %s", r.Title)
				continue
			}

			// create article and feed_article_relation data
			// insert article
			articleID, _ := uuid.NewUUID()
			publishedAt := time.Unix(int64(r.PublishedAt), 0)
			article := entity.Article{
				ID:           articleID.String(),
				Title:        r.Title,
				Description:  r.Description,
				ThumbnailURL: r.ImageURL,
				ArticleURL:   r.Link,
				PublishedAt:  publishedAt,
				IsPrivate:    false,
			}
			err = article.Insert(ctx, tx, boil.Infer())
			if err != nil {
				log.Printf("【error insert article】: %s, err: %v", r.Title, err)
				continue
			}

			// insert feed article relation
			err = createFeedArticleRelation(ctx, tx, f.ID, articleID.String())
			if err != nil {
				log.Printf("【error insert feed article relation】: %s", r.Title)
				continue
			}
			aCount++
		}

		err = tx.Commit()
		if err != nil {
			log.Printf("【error commit transaction】: %s", err)
			return err
		}
		log.Printf("【commit transaction】")
		log.Printf("【end create article】: %s", f.Name)
		log.Printf("【article count】: %d", aCount)
	}
	log.Printf("【end BatchCreateArticles】")
	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)

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

//func (au *ArticleUsecase) CreateArticles(ctx context.Context) error {
//	now := time.Now()
//	// get platforms
//	platforms, err := au.pr.GetPlatforms(ctx)
//	if err != nil {
//		return err
//	}
//	for _, p := range platforms {
//		var wg sync.WaitGroup
//		rss, err := GetRSS(p.RssURL)
//		if err != nil {
//			log.Printf("【error get rss】: %s", p.Name)
//			continue
//		}
//		articles, err := au.ar.GetArticlesByPlatform(ctx, p.ID)
//		if err != nil {
//			log.Printf("【error get articles by platform】: %s", p.Name)
//			continue
//		}
//		if err != nil {
//			return err
//		}
//		wg.Add(1)
//		go createArticles(ctx, client, &wg, articles, rss, p)
//		wg.Wait()
//	}
//
//	end := time.Now()
//	diff := end.Sub(now)
//	log.Printf("【end create article all】: %s", diff)
//	return nil
//}
//
//func createArticles(ctx context.Context, client *firestore.Client, wg *sync.WaitGroup, articles []domain.Article, rss []RSS, p domain.Platform) {
//	log.Printf("【start create article】: %s %s", p.Name, p.CategoryName)
//	defer wg.Done()
//	batch := client.BulkWriter(ctx)
//	aCount := 0
//
//	for _, r := range rss {
//		isSkip := false
//		for _, article := range articles {
//			if article.ArticleURL == r.Link {
//				isSkip = true
//				break
//			}
//		}
//		if isSkip {
//			log.Printf("【skip create article】: %s", r.Title)
//			continue
//		}
//
//		articleID, err := uuid.NewUUID()
//		if err != nil {
//			continue
//		}
//		now := time.Now().Unix()
//		ref := client.Collection("articles").Doc(articleID.String())
//		_, err = batch.Set(ref, domain.ArticleFirestore{
//			Title:                r.Title,
//			Description:          r.Description,
//			ThumbnailURL:         r.ImageURL,
//			ArticleURL:           r.Link,
//			PublishedAt:          r.PublishedAt,
//			PlatformID:           p.ID,
//			PlatformName:         p.Name,
//			PlatformCategoryName: p.CategoryName,
//			PlatformSiteURL:      p.SiteURL,
//			PlatformType:         p.PlatformType,
//			PlatformFaviconURL:   p.FaviconURL,
//			IsEng:                p.IsEng,
//			IsPrivate:            false,
//			CreatedAt:            int(now),
//			UpdatedAt:            int(now),
//			DeletedAt:            nil,
//		})
//		if err != nil {
//			continue
//		}
//		aCount++
//	}
//	batch.Flush()
//	log.Printf("【end create article】: %s  %s", p.Name, p.CategoryName)
//	log.Printf("【article count】: %d", aCount)
//}
