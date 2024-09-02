package adapter

import (
	"context"
	"fmt"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleAdapter interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (entity.ArticleSlice, error)
}

type articleAdapter struct {
	articleRepository repository.ArticleRepository
}

func NewArticleAdapter(ar repository.ArticleRepository) ArticleAdapter {
	return &articleAdapter{
		articleRepository: ar,
	}
}

func (aa *articleAdapter) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (entity.ArticleSlice, error) {
	limit := 20
	if req.GetLimit() != 0 {
		limit = int(req.GetLimit())
	}

	q := []qm.QueryMod{
		qm.InnerJoin("platforms ON articles.platform_id = platforms.id"),
		qm.LeftOuterJoin("feed_article_relations ON articles.id = feed_article_relations.article_id"),
		qm.InnerJoin("feeds ON feed_article_relations.feed_id = feeds.id"),
		qm.Where("feeds.deleted_at IS NULL"),
		qm.InnerJoin("platforms as feed_platforms ON feeds.platform_id = feed_platforms.id"),
		qm.InnerJoin("categories as feed_categories ON feeds.category_id = feed_categories.id"),
		qm.Load(qm.Rels(entity.ArticleRels.Platform)),
		qm.Load(qm.Rels(entity.ArticleRels.FeedArticleRelations)),
		qm.Load(qm.Rels(
			entity.ArticleRels.FeedArticleRelations,
			entity.FeedArticleRelationRels.Feed,
		)),
		qm.Load("FeedArticleRelations.Feed.Category"),
		qm.Load("FeedArticleRelations.Feed.Platform"),
		qm.Where("articles.is_private = ?", false),
		qm.GroupBy("articles.id"),
		qm.Limit(limit),
	}

	if req.GetCursor() != "" {
		q = append(q, qm.Where("articles.published_at < (SELECT published_at FROM articles WHERE id = ?)", req.GetCursor()))
	}

	if req.LanguageStatus != nil {
		isEng := req.LanguageStatus.GetValue() == int64(domain.LanguageStatusEnglish)
		q = append(q, qm.Where("articles.is_eng = ?", isEng))
	}
	if req.Tag != nil {
		tag := req.Tag.GetValue()
		switch {
		case tag == "trend":
			q = append(q, qm.Where("feeds.trend_platform_type != ?", 0))
			q = append(q, qm.LeftOuterJoin("trend_articles ON articles.id = trend_articles.article_id"))
			q = append(q, qm.Load(entity.ArticleRels.TrendArticles))
			q = append(q, qm.GroupBy("trend_articles.id, trend_articles.like_count"))
			q = append(q, qm.OrderBy("trend_articles.like_count desc"))
		case tag == "site":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 1))
		case tag == "company":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 2))
		case tag == "summary":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 3))
		}
	}

	if req.Tag.GetValue() == "" || req.Tag.GetValue() != "trend" {
		q = append(q, qm.OrderBy("published_at desc"))
	}

	if req.FeedIds != nil {
		qmWhere := make([]interface{}, len(req.FeedIds))
		for i, feedId := range req.FeedIds {
			qmWhere[i] = feedId.GetValue()
		}
		q = append(q, qm.WhereIn("feed_article_relations.feed_id IN ?", qmWhere...))
	}

	articles, err := aa.articleRepository.GetArticles(ctx, q)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return articles, nil
}
