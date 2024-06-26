package usecase

import (
	"context"
	"database/sql"
	"log"
	"strconv"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/crawler"

	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type BatchCrawlCompanyArticleContentsInterface interface {
	BatchCrawlCompanyArticleContents(ctx context.Context, db *sql.DB) error
}

func (u *Usecase) BatchCrawlCompanyArticleContents(ctx context.Context) error {
	now := time.Now()
	log.Printf("【start BatchCreateArticles】")
	feeds, err := entity.Feeds(
		qm.Where("feeds.deleted_at IS NULL"),
		qm.And("feeds.trend_platform_type = ?", 0),
		qm.InnerJoin("platforms on feeds.platform_id = platforms.id"),
		qm.Where("platforms.platform_site_type = ?", strconv.Itoa(int(domain.PlatformTypeCompany))),
		qm.OrderBy("feeds.created_at asc"),
		qm.Load("Platform"),
	).All(ctx, u.db)
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
		for _, r := range rss {
			// transaction
			tx, err := u.db.BeginTx(ctx, nil)
			if err != nil {
				log.Printf("【error begin transaction】: %s", err)
				continue
			}
			res, err := crawler.ArticleContentsCrawler(ctx, tx, f, r, f.R.Platform.IsEng)
			if err != nil && res.IsRollback {
				log.Printf("【error rollback transaction】: %s", err)
				err = tx.Rollback()
				if err != nil {
					log.Printf("【error rollback transaction】: %s", err)
					continue
				}
			}
			if err != nil {
				log.Printf("【error create article】:feed: %s,  article: %s", f.Name, r.Title)
				continue
			}
			if res.IsCommit {
				if res.IsCreatedArticle {
					aCount++
				}
				if res.IsCreatedFeedArticleRelation {
					farCount++
				}
				//commit
				err := tx.Commit()
				if err != nil {
					log.Printf("【error commit transaction】: %s", err)
					continue
				}
			}
		}
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
