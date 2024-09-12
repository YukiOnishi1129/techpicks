package usecase

import (
	"context"
	"errors"
	"net/http"
	"net/url"
	"time"
	"unicode/utf8"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/otiai10/opengraph"
	"golang.org/x/net/html/charset"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type ArticleUseCase interface {
	GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error)
	CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error)
	GetArticleOGP(ctx context.Context, articleURL string) (*cpb.GetArticleOGPResponse, error)
}

type articleUseCase struct {
	articlePersistenceAdapter persistenceadapter.ArticlePersistenceAdapter
	bookmarkExternalAdapter   externaladapter.BookmarkExternalAdapter
}

func NewArticleUseCase(apa persistenceadapter.ArticlePersistenceAdapter, bea externaladapter.BookmarkExternalAdapter) ArticleUseCase {
	return &articleUseCase{
		articlePersistenceAdapter: apa,
		bookmarkExternalAdapter:   bea,
	}
}

func (au *articleUseCase) GetArticles(ctx context.Context, req *cpb.GetArticlesRequest) (*cpb.GetArticlesResponse, error) {
	articles, err := au.articlePersistenceAdapter.GetArticles(ctx, req)
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
			resBookmark, err := au.bookmarkExternalAdapter.GetBookmarkByArticleID(ctx, &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: article.ID,
				UserId:    req.UserId.GetValue(),
			})
			if err != nil {
				return nil, err
			}
			if resBookmark.Bookmark.GetId() != "" {
				res.BookmarkId = wrapperspb.String(resBookmark.Bookmark.GetId())
				res.IsBookmarked = true
			}
			// TODO: favorite
			// println(req.UserId.GetValue())
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

func (au *articleUseCase) CreateUploadArticle(ctx context.Context, req *cpb.CreateUploadArticleRequest) (*cpb.CreateArticleResponse, error) {
	// check public article
	res, err := au.articlePersistenceAdapter.GetArticlesByArticleURLAndPlatformURL(ctx, req.ArticleUrl, req.PlatformUrl)
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: au.convertPBArticle(*res[0]),
		}, nil
	}

	// check private article
	res, err = au.articlePersistenceAdapter.GetPrivateArticlesByArticleURL(ctx, req.ArticleUrl)
	if err != nil {
		return nil, err
	}
	if len(res) > 0 {
		return &cpb.CreateArticleResponse{
			Article: au.convertPBArticle(*res[0]),
		}, nil
	}

	article, err := au.articlePersistenceAdapter.CreateUploadArticle(ctx, req)
	if err != nil {
		return nil, err
	}

	return &cpb.CreateArticleResponse{
		Article: au.convertPBArticle(*article),
	}, nil
}

func (au *articleUseCase) GetArticleOGP(ctx context.Context, articleURL string) (*cpb.GetArticleOGPResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	parsedURL, err := url.Parse(articleURL)
	if err != nil || parsedURL.Scheme == "" || parsedURL.Host == "" {
		return nil, errors.New("invalid URL")
	}

	ogp, err := opengraph.FetchWithContext(ctx, articleURL)
	if err != nil {
		return nil, err
	}

	// en: If the title is not UTF-8, get and parse the HTML
	if !utf8.ValidString(ogp.Title) || !utf8.ValidString(ogp.Description) {
		res, err := http.Get(articleURL)
		if err != nil {
			return nil, err
		}
		reader, err := charset.NewReader(res.Body, res.Header.Get("Content-Type"))
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()

		err = ogp.Parse(reader)
		if err != nil {
			return nil, err
		}
	}

	thumbnailURL := ""
	if len(ogp.Image) > 0 {
		thumbnailURL = ogp.Image[0].URL
	}

	return &cpb.GetArticleOGPResponse{
		Ogp: &cpb.OGP{
			Title:        au.sanitizeToUTF8(ogp.Title),
			Description:  wrapperspb.String(au.sanitizeToUTF8(ogp.Description)),
			ArticleUrl:   au.sanitizeToUTF8(articleURL),
			SiteUrl:      au.sanitizeToUTF8(parsedURL.Host),
			SiteName:     au.sanitizeToUTF8(ogp.SiteName),
			ThumbnailUrl: au.sanitizeToUTF8(thumbnailURL),
			FaviconUrl:   au.sanitizeToUTF8(ogp.Favicon),
		},
	}, nil
}

func (au *articleUseCase) sanitizeToUTF8(s string) string {
	if utf8.ValidString(s) {
		return s
	}
	v := make([]rune, 0, len(s))
	for i := 0; i < len(s); {
		r, size := utf8.DecodeRuneInString(s[i:])
		if r == utf8.RuneError && size == 1 {
			v = append(v, utf8.RuneError) // 無効なバイトを�に置き換える
			i++
		} else {
			v = append(v, r)
			i += size
		}
	}
	return string(v)
}
