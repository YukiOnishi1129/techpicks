package persistenceadapter

import (
	"context"
	"fmt"
	"time"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticlePersistenceAdapter interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest, limit int) (entity.ArticleSlice, error)
	GetArticlesByArticleURLAndPlatformURL(ctx context.Context, articleURL, platformURL string) (entity.ArticleSlice, error)
	GetPrivateArticlesByArticleURL(ctx context.Context, articleURL string) (entity.ArticleSlice, error)
	GetArticleRelationPlatform(ctx context.Context, articleID string) (entity.Article, error)
	CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest, isEng bool) (*entity.Article, error)
}

type articlePersistenceAdapter struct {
	articleRepository repository.ArticleRepository
}

func NewArticlePersistenceAdapter(ar repository.ArticleRepository) ArticlePersistenceAdapter {
	return &articlePersistenceAdapter{
		articleRepository: ar,
	}
}

func (apa *articlePersistenceAdapter) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest, limit int) (entity.ArticleSlice, error) {
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

	if req.GetCursor() != "" && req.Tag.GetValue() != "trend" {
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
			sixHoursAgo := time.Now().Add(-6 * time.Hour)
			q = append(q, qm.Where("feeds.trend_platform_type != ?", 0))
			q = append(q, qm.LeftOuterJoin("trend_articles ON articles.id = trend_articles.article_id"))
			q = append(q, qm.Load(entity.ArticleRels.TrendArticles))
			q = append(q, qm.Where("trend_articles.updated_at > ?", sixHoursAgo))
			q = append(q, qm.GroupBy("trend_articles.id, trend_articles.like_count"))
			q = append(q, qm.OrderBy("trend_articles.like_count desc"))
			if req.GetCursor() != "" {
				q = append(q, qm.Where("trend_articles.like_count < (SELECT like_count FROM trend_articles WHERE article_id = ?)", req.GetCursor()))
			}
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
		for i, feedID := range req.FeedIds {
			qmWhere[i] = feedID.GetValue()
		}
		q = append(q, qm.WhereIn("feed_article_relations.feed_id IN ?", qmWhere...))
	}

	articles, err := apa.articleRepository.GetArticles(ctx, q)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return articles, nil
}

func (apa *articlePersistenceAdapter) GetArticlesByArticleURLAndPlatformURL(ctx context.Context, articleURL, platformURL string) (entity.ArticleSlice, error) {
	q := []qm.QueryMod{
		qm.InnerJoin("platforms ON articles.platform_id = platforms.id"),
		qm.Where("articles.article_url = ?", articleURL),
		qm.Where("platforms.site_url = ?", platformURL),
		qm.Load(qm.Rels(entity.ArticleRels.Platform)),
		qm.Where("articles.is_private = ?", false),
	}

	articles, err := apa.articleRepository.GetArticles(ctx, q)
	if err != nil {
		println("Error executing query: %v\n", err)
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return articles, nil
}

func (apa *articlePersistenceAdapter) GetPrivateArticlesByArticleURL(ctx context.Context, articleURL string) (entity.ArticleSlice, error) {
	q := []qm.QueryMod{
		qm.InnerJoin("platforms ON articles.platform_id = platforms.id"),
		qm.Where("articles.article_url = ?", articleURL),
		qm.Load(qm.Rels(entity.ArticleRels.Platform)),
		qm.Where("articles.is_private = ?", true),
	}

	articles, err := apa.articleRepository.GetArticles(ctx, q)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return articles, nil
}

func (apa *articlePersistenceAdapter) GetArticleRelationPlatform(ctx context.Context, articleID string) (entity.Article, error) {
	q := []qm.QueryMod{
		qm.Load(qm.Rels(entity.ArticleRels.Platform)),
	}
	article, err := apa.articleRepository.GetArticleByID(ctx, articleID, q)
	if err != nil {
		return entity.Article{}, err
	}

	return article, nil
}

func (apa *articlePersistenceAdapter) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest, isEng bool) (*entity.Article, error) {
	articleID, _ := uuid.NewUUID()
	article := entity.Article{
		ID:           articleID.String(),
		ArticleURL:   req.GetArticleUrl(),
		Title:        req.GetTitle(),
		Description:  req.GetDescription(),
		ThumbnailURL: req.GetThumbnailUrl(),
		IsPrivate:    true,
		IsEng:        isEng,
	}

	err := apa.articleRepository.CreateArticle(ctx, article)
	if err != nil {
		fmt.Printf("Error creating article: %v\n", err)
		return nil, err
	}

	return &article, nil
}
