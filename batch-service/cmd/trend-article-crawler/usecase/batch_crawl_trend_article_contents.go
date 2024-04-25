package usecase

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"log"
	"time"
)

type BatchCrawlTrendArticleContentsInterface interface {
	BatchCrawlTrendArticleContents(ctx context.Context) error
}

func (u *Usecase) BatchCrawlTrendArticleContents(ctx context.Context) error {
	now := time.Now()
	log.Printf("【start BatchCrawlTrendArticleContents】")
	feeds, err := entity.Feeds(
		qm.Where("feeds.deleted_at IS NULL"),
		qm.And("feeds.trend_platform_type != ?", 0),
		qm.OrderBy("feeds.created_at asc"),
	).All(ctx, u.db)
	if err != nil {
		log.Printf("【error get feeds】: %s", err)
		return err
	}

	for _, f := range feeds {
		log.Printf("【start create article】: %s", f.Name)
		//aCount := 0
		//farCount := 0

	}

	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)
	return nil
}
