package persistence

import (
	"context"
	"database/sql"
	"time"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/repository"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/entity"
	_ "github.com/lib/pq"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type articlePersistence struct {
	db *sql.DB
}

func NewArticlePersistence(db *sql.DB) repository.ArticleRepository {
	return &articlePersistence{
		db: db,
	}
}

func (ap *articlePersistence) GetArticles(ctx context.Context, dto domain.GetArticlesInputDTO) (entity.ArticleSlice, error) {
	q := make([]qm.QueryMod, 0)
	q = append(q, qm.LeftOuterJoin("platforms ON articles.platform_id = platforms.id"))
	q = append(q, qm.InnerJoin("feed_article_relations ON articles.id = feed_article_relations.article_id"))
	q = append(q, qm.InnerJoin("feeds ON feed_article_relations.feed_id = feeds.id"))
	q = append(q, qm.Where("feeds.deleted_at IS NULL"))
	q = append(q, qm.InnerJoin("platforms as feed_platforms ON feeds.platform_id = feed_platforms.id"))

	q = append(q, qm.OrderBy("published_at desc"))
	q = append(q, qm.Limit(int(dto.Limit)))

	if dto.Cursor != "" {
		parsedCursor, err := time.Parse(time.RFC3339, dto.Cursor)
		if err != nil {
			return nil, err
		}
		q = append(q, qm.Where("published_at < ?", parsedCursor))
	}

	if dto.LanguageStatus != nil {
		isEng := *dto.LanguageStatus == 1
		q = append(q, qm.Where("is_eng = ?", isEng))
	}

	if dto.Tag != nil {
		switch {
		case *dto.Tag == "trend":
			q = append(q, qm.Where("feeds.trend_platform_type != ?", 0))
		case *dto.Tag == "site":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 1))
		case *dto.Tag == "company":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 2))
		case *dto.Tag == "summary":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 3))
		}
	}
	aRows, err := entity.Articles(q...).All(ctx, ap.db)
	if err != nil {
		return nil, err
	}
	return aRows, nil
}
