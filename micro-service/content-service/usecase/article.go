package usecase

import (
	"context"
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
	pbResponse, err := au.convertPBArticles(articles, &req.UserId.Value)
	if err != nil {
		return nil, err
	}
	return pbResponse, nil
}

func (au *articleUseCase) findAllArticles(ctx context.Context, req *cpb.GetArticlesRequest) (entity.ArticleSlice, error) {
	q := make([]qm.QueryMod, 0)

	q = append(q, qm.LeftOuterJoin("platforms ON articles.platform_id = platforms.id"))
	q = append(q, qm.InnerJoin("feed_article_relations ON articles.id = feed_article_relations.article_id"))
	q = append(q, qm.InnerJoin("feeds ON feed_article_relations.feed_id = feeds.id"))
	q = append(q, qm.Where("feeds.deleted_at IS NULL"))
	q = append(q, qm.InnerJoin("platforms as feed_platforms ON feeds.platform_id = feed_platforms.id"))
	q = append(q, qm.InnerJoin("categories as feed_categories ON feed_categories.category_id = categories.id"))

	q = append(q, qm.OrderBy("published_at desc"))
	q = append(q, qm.Limit(int(req.Limit)))

	if req.Cursor != "" {
		parsedCursor, err := time.Parse(time.RFC3339, req.Cursor)
		if err != nil {
			return nil, err
		}
		q = append(q, qm.Where("published_at < ?", parsedCursor))
	}
	if req.LanguageStatus != nil {
		isEng := req.LanguageStatus.GetValue() == int64(domain.LanguageStatusJapanese)
		q = append(q, qm.Where("is_eng = ?", isEng))
	}
	if req.Tag != nil {
		tag := req.Tag.GetValue()
		switch {
		case tag == "trend":
			q = append(q, qm.Where("feeds.trend_platform_type != ?", 0))
			q = append(q, qm.LeftOuterJoin("trend_articles ON articles.id = trend_articles.article_id"))
		case tag == "site":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 1))
		case tag == "company":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 2))
		case tag == "summary":
			q = append(q, qm.Where("platforms.platform_site_type = ?", 3))
		}
	}
	articles, err := au.articleRepository.GetArticles(ctx, q)
	if err != nil {
		return nil, err
	}
	return articles, nil
}

func (au *articleUseCase) convertPBArticles(articles entity.ArticleSlice, userID *string) (*cpb.GetArticlesResponse, error) {
	edges := make([]*cpb.ArticleEdge, len(articles))
	for i, article := range articles {
		res := &cpb.Article{
			Id:           article.ID,
			Title:        article.Title,
			Description:  article.Description,
			ArticleUrl:   article.ArticleURL,
			ThumbnailUrl: article.ThumbnailURL,
			IsEng:        article.IsEng,
			IsPrivate:    article.IsPrivate,
			CreatedAt:    timestamppb.New(article.CreatedAt),
			UpdatedAt:    timestamppb.New(article.UpdatedAt),
		}
		if article.PublishedAt.Valid {
			res.PublishedAt = timestamppb.New(article.PublishedAt.Time)
		}
		if article.AuthorName.Valid {
			res.AuthorName = wrapperspb.String(article.AuthorName.String)
		}
		if article.Tags.Valid {
			res.Tags = wrapperspb.String(article.Tags.String)
		}
		if article.R.Platform != nil {
			res.Platform = au.convertPBPlatform(*article.R.Platform)
		}

		for j, far := range article.R.FeedArticleRelations {
			res.Feeds[j] = au.convertPBFeed(*far.R.Feed)
		}
		if article.R.TrendArticles != nil && article.R.TrendArticles[0] != nil {
			res.LikeCount = int64(article.R.TrendArticles[0].LikeCount)
			res.IsTrend = true
		}

		if userID != nil {
			// TODO: bookmark
			// TODO: favorite
			println(*userID)
		}

		edges[i] = &cpb.ArticleEdge{
			Cursor:  res.CreatedAt.AsTime().Format(time.RFC3339),
			Article: res,
		}
	}

	return &cpb.GetArticlesResponse{
		ArticlesEdge: edges,
		PageInfo: &cpb.PageInfo{
			HasNextPage: len(edges) == 20,
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}
