package usecase

import (
	"context"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/external"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type ArticleUseCase interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error)
}

type articleUseCase struct {
	articleAdapter   adapter.ArticleAdapter
	bookmarkExternal external.BookmarkExternal
}

func NewArticleUseCase(aa adapter.ArticleAdapter, be external.BookmarkExternal) ArticleUseCase {
	return &articleUseCase{
		articleAdapter:   aa,
		bookmarkExternal: be,
	}
}

func (au *articleUseCase) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	println("💧💧💧💧💧💧💧💧💧")
	articles, err := au.articleAdapter.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}

	println("⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️")

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
			// resBookmark, err := au.bookmarkExternal.GetBookmarkByArticleID(ctx, &bpb.GetBookmarkByArticleIDRequest{
			// 	ArticleId: article.ID,
			// 	UserId:    req.UserId.GetValue(),
			// })
			// if err != nil {
			// 	return nil, err
			// }
			// if resBookmark.Bookmark.GetId() != "" {
			// 	res.BookmarkId = wrapperspb.String(resBookmark.Bookmark.GetId())
			// 	res.IsBookmarked = true
			// }
			// TODO: favorite
			println(req.UserId.GetValue())
		}

		edges[i] = &cpb.ArticleEdge{
			Cursor:  res.Id,
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
