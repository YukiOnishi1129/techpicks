package usecase

import (
	"context"

	bpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/bookmark"
	copb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/common"
	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (cu *contentUseCase) ListArticle(ctx context.Context, req *cpb.ListArticleRequest) (*cpb.ListArticleResponse, error) {
	limit := 20
	if req.GetLimit() != 0 {
		limit = int(req.GetLimit())
	}

	articles, err := cu.articlePersistenceAdapter.ListArticle(ctx, req, limit)
	if err != nil {
		return nil, err
	}

	edges := make([]*cpb.ArticleEdge, len(articles))
	for i, article := range articles {
		res := cu.convertPBArticle(*article, req.GetUserId().GetValue())

		farFeeds := make([]*cpb.Feed, len(article.R.FeedArticleRelations))

		for j, far := range article.R.FeedArticleRelations {
			farFeeds[j] = cu.convertPBFeed(*far.R.Feed)
		}
		res.Feeds = farFeeds
		if len(article.R.TrendArticles) > 0 {
			res.LikeCount = int64(article.R.TrendArticles[0].LikeCount)
			res.IsTrend = true
		}

		if req.GetUserId() != nil {
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
		return &cpb.ListArticleResponse{
			ArticlesEdge: edges,
			PageInfo: &copb.PageInfo{
				HasNextPage: false,
				EndCursor:   "",
			},
		}, nil
	}

	return &cpb.ListArticleResponse{
		ArticlesEdge: edges,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(edges) == limit,
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}

func (cu *contentUseCase) ListArticleByArticleURL(ctx context.Context, req *cpb.ListArticleByArticleURLRequest) (*cpb.ListArticleByArticleURLResponse, error) {
	limit := 20
	if req.GetLimit() != 0 {
		limit = int(req.GetLimit())
	}

	res, err := cu.articlePersistenceAdapter.ListArticleByArticleURL(ctx, req.GetArticleUrl(), limit)
	if err != nil {
		return nil, err
	}
	if len(res) == 0 {
		return &cpb.ListArticleByArticleURLResponse{}, nil
	}

	edges := make([]*cpb.TemporaryArticleEdge, len(res))
	for i, article := range res {
		edges[i] = &cpb.TemporaryArticleEdge{
			Cursor: article.ID,
			Article: &cpb.TemporaryArticle{
				Id:           article.ID,
				Title:        article.Title,
				Description:  article.Description,
				ArticleUrl:   article.ArticleURL,
				PublishedAt:  timestamppb.New(article.PublishedAt.Time),
				AuthorName:   wrapperspb.String(article.AuthorName.String),
				Tags:         wrapperspb.String(article.Tags.String),
				ThumbnailUrl: article.ThumbnailURL,
				IsEng:        article.IsEng,
				IsPrivate:    article.IsPrivate,
				CreatedAt:    timestamppb.New(article.CreatedAt),
				UpdatedAt:    timestamppb.New(article.UpdatedAt),
			},
			Platform: &cpb.Platform{
				Id:               article.R.Platform.ID,
				Name:             article.R.Platform.Name,
				SiteUrl:          article.R.Platform.SiteURL,
				PlatformSiteType: int64(article.R.Platform.PlatformSiteType),
				FaviconUrl:       article.R.Platform.FaviconURL,
				IsEng:            article.R.Platform.IsEng,
				CreatedAt:        timestamppb.New(article.R.Platform.CreatedAt),
				UpdatedAt:        timestamppb.New(article.R.Platform.UpdatedAt),
				DeletedAt:        timestamppb.New(article.R.Platform.DeletedAt.Time),
			},
		}
	}

	return &cpb.ListArticleByArticleURLResponse{
		ArticlesEdge: edges,
		PageInfo: &copb.PageInfo{
			HasNextPage: len(edges) == limit,
			EndCursor:   edges[len(edges)-1].Cursor,
		},
	}, nil
}

func (cu *contentUseCase) convertPBArticle(a entity.Article, userID string) *cpb.Article {
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
	if a.R != nil && a.R.ArticleComments != nil && len(a.R.ArticleComments) > 0 {
		ac := a.R.ArticleComments[0]
		if ac.UserID == userID {
			article.Comment = &cpb.ArticleComment{
				Id:        ac.ID,
				UserId:    ac.UserID,
				ArticleId: ac.ArticleID,
				Comment:   ac.Comment,
				CreatedAt: timestamppb.New(ac.CreatedAt),
				UpdatedAt: timestamppb.New(ac.UpdatedAt),
			}
		}

	}
	return article
}

func (cu *contentUseCase) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	articleURL := util.RemoveTrailingSlash(req.GetArticleUrl())
	platformURL := util.RemoveTrailingSlash(req.GetPlatformUrl())

	// check public article
	res, err := cu.articlePersistenceAdapter.GetArticlesByArticleURLAndPlatformURL(ctx, articleURL, platformURL)
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: cu.convertPBArticle(*res[0], ""),
		}, nil
	}

	// check private article
	res, err = cu.articlePersistenceAdapter.GetPrivateArticlesByArticleURL(ctx, articleURL)
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: cu.convertPBArticle(*res[0], ""),
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
		Article: cu.convertPBArticle(article, ""),
	}, nil
}
