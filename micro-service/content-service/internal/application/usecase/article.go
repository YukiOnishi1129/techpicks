package usecase

import (
	"context"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	fpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (cu *contentUseCase) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	articles, err := cu.articlePersistenceAdapter.GetArticles(ctx, req)
	if err != nil {
		return nil, err
	}

	edges := make([]*cpb.ArticleEdge, len(articles))
	for i, article := range articles {
		res := cu.convertPBArticle(*article)

		farFeeds := make([]*cpb.Feed, len(article.R.FeedArticleRelations))

		for j, far := range article.R.FeedArticleRelations {
			farFeeds[j] = cu.convertPBFeed(*far.R.Feed)
		}
		res.Feeds = farFeeds
		if len(article.R.TrendArticles) > 0 {
			res.LikeCount = int64(article.R.TrendArticles[0].LikeCount)
			res.IsTrend = true
		}

		if req.UserId != nil {
			resBookmark, err := cu.bookmarkExternalAdapter.GetBookmarkByArticleID(ctx, &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: article.ID,
				UserId:    req.GetUserId().GetValue(),
			})
			if err != nil {
				return nil, err
			}
			if resBookmark.GetBookmark().GetId() != "" {
				res.BookmarkId = wrapperspb.String(resBookmark.Bookmark.GetId())
				res.IsBookmarked = true
			}

			resFavoriteFolders, err := cu.favoriteExternalAdapter.GetFavoriteArticleFoldersByArticleID(ctx, &fpb.GetFavoriteArticleFoldersByArticleIdRequest{
				ArticleId: article.ID,
				UserId:    req.GetUserId().GetValue(),
			})
			if err != nil {
				return nil, err
			}

			if len(resFavoriteFolders.GetFavoriteArticleFoldersEdge()) > 0 {
				resFavIds := make([]string, len(resFavoriteFolders.GetFavoriteArticleFoldersEdge()))
				for i, f := range resFavoriteFolders.GetFavoriteArticleFoldersEdge() {
					resFavIds[i] = f.GetNode().GetId()
				}
				res.FavoriteArticleFolderIds = resFavIds
				res.IsFollowing = true
			}
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

func (cu *contentUseCase) convertPBArticle(a entity.Article) *cpb.Article {
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
	if a.R != nil && a.R.Platform != nil {
		article.Platform = cu.convertPBPlatform(*a.R.Platform)
	}
	return article
}

func (cu *contentUseCase) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	// check public article
	res, err := cu.articlePersistenceAdapter.GetArticlesByArticleURLAndPlatformURL(ctx, req.GetArticleUrl(), req.GetPlatformUrl())
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: cu.convertPBArticle(*res[0]),
		}, nil
	}

	// check private article
	res, err = cu.articlePersistenceAdapter.GetPrivateArticlesByArticleURL(ctx, req.GetArticleUrl())
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: cu.convertPBArticle(*res[0]),
		}, nil
	}

	isEng := !util.JapaneseTextCheck(req.GetTitle()) && !util.JapaneseTextCheck(req.GetDescription())
	createdArticle, err := cu.articlePersistenceAdapter.CreateUploadArticle(ctx, req, isEng)
	if err != nil {
		return nil, err
	}

	article, err := cu.articlePersistenceAdapter.GetArticleRelationPlatform(ctx, createdArticle.ID)
	if err != nil {
		return nil, err
	}

	return &cpb.CreateArticleResponse{
		Article: cu.convertPBArticle(article),
	}, nil
}
