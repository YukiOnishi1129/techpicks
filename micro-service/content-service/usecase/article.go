package usecase

import (
	"context"
	"fmt"
	"time"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/domain/repository"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type ArticleUseCase interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error)
}

type articleUseCase struct {
	articleRepository repository.ArticleRepository
}

func NewArticleUseCase(ar repository.ArticleRepository) ArticleUseCase {
	return &articleUseCase{
		articleRepository: ar,
	}
}

func (au *articleUseCase) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	articles, err := au.findAllArticles(ctx, req)
	if err != nil {
		return nil, err
	}

	edges := make([]*cpb.ArticleEdge, len(articles))
	for i, article := range articles {
		res := au.convertPBArticle(*article)

		farFeeds := make([]*cpb.Feed, len(article.R.FeedArticleRelations))

		for j, far := range article.R.FeedArticleRelations {
			farFeeds[j] = au.convertPBFeed(*far.R.Feed)
		}
		res.Feeds = farFeeds
		if len(article.R.TrendArticles) > 0 {
			res.LikeCount = int64(article.R.TrendArticles[0].LikeCount)
			res.IsTrend = true
		}

		if req.UserId != nil {
			// TODO: bookmark
			// TODO: favorite
			println(req.UserId.GetValue())
		}

		edges[i] = &cpb.ArticleEdge{
			Cursor:  res.CreatedAt.AsTime().Format(time.RFC3339),
			Article: res,
		}
	}

	if len(edges) == 0 {
		return &cpb.GetArticlesResponse{
			ArticlesEdge: edges,
			PageInfo: &cpb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	return &cpb.GetArticlesResponse{
		ArticlesEdge: edges,
		PageInfo: &cpb.PageInfo{
			HasNextPage: len(edges) == 20,
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}

func (au *articleUseCase) findAllArticles(ctx context.Context, req *cpb.GetArticlesRequest) (entity.ArticleSlice, error) {
	q := []qm.QueryMod{
		qm.InnerJoin("platforms ON articles.platform_id = platforms.id"),
		qm.InnerJoin("feed_article_relations ON articles.id = feed_article_relations.article_id"),
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
		qm.Limit(int(req.Limit)),
	}

	if req.Limit == 0 {
		q = append(q, qm.Limit(20))
	}

	if req.Cursor != "" {
		parsedCursor, err := time.Parse(time.RFC3339, req.Cursor)
		if err != nil {
			return nil, err
		}
		q = append(q, qm.Where("articles.published_at < ?", parsedCursor))
	}

	if req.LanguageStatus.GetValue() != 0 {
		isEng := req.LanguageStatus.GetValue() == int64(domain.LanguageStatusJapanese)
		q = append(q, qm.Where("articles.is_eng = ?", isEng))
	}
	if req.Tag.GetValue() != "" {
		tag := req.Tag.GetValue()
		switch {
		case tag == "trend":
			q = append(q, qm.Where("feeds.trend_platform_type != ?", 0))
			q = append(q, qm.InnerJoin("trend_articles ON articles.id = trend_articles.article_id"))
			q = append(q, qm.Load(entity.ArticleRels.TrendArticles))
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

	articles, err := au.articleRepository.GetArticles(ctx, q)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}

	return articles, nil
}

func (au *articleUseCase) convertPBArticle(a entity.Article) *cpb.Article {
	article := &cpb.Article{
		Id:           a.ID,
		Title:        a.Title,
		Description:  a.Description,
		ArticleUrl:   a.ArticleURL,
		ThumbnailUrl: a.ThumbnailURL,
		IsEng:        a.IsEng,
		IsPrivate:    a.IsPrivate,
		CreatedAt:    timestamppb.New(a.CreatedAt),
		UpdatedAt:    timestamppb.New(a.UpdatedAt),
	}
	if a.PublishedAt.Valid {
		article.PublishedAt = timestamppb.New(a.PublishedAt.Time)
	}
	if a.AuthorName.Valid {
		article.AuthorName = wrapperspb.String(a.AuthorName.String)
	}
	if a.Tags.Valid {
		article.Tags = wrapperspb.String(a.Tags.String)
	}
	article.Platform = au.convertPBPlatform(*a.R.Platform)
	return article
}
