package crawler

import (
	"context"
	"testing"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	supaRepo "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/supabase/repository"
	"github.com/YukiOnishi1129/techpicks/batch-service/internal/testonly"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func Test_Internal_ArticleContentsCrawler(t *testing.T) {

	platformID, _ := uuid.NewUUID()
	feedID, _ := uuid.NewUUID()
	categoryID, _ := uuid.NewUUID()
	articleID, _ := uuid.NewUUID()
	feedArticleRelationID, _ := uuid.NewUUID()

	publishedUnix := time.Now().Unix()

	test := map[string]struct {
		recordPlatform             []entity.Platform
		recordFeedArticleRelations []entity.FeedArticleRelation
		recordArticles             []entity.Article
		recordFeeds                []entity.Feed
		recordCategories           []entity.Category
		feed                       *entity.Feed
		rss                        repository.RSS
		isEng                      bool
		wantResponse               ArticleContentsCrawlerResponse
		wantArticles               []*entity.Article
		wantFeedArticleRelations   []entity.FeedArticleRelation
	}{
		"Success": {
			recordPlatform: []entity.Platform{
				{
					ID:               platformID.String(),
					Name:             "platform_name_1",
					PlatformSiteType: 0,
					SiteURL:          "https://example.com",
					FaviconURL:       "https://example.com/favicon",
					IsEng:            false,
				},
			},
			recordFeeds: []entity.Feed{
				{
					ID:                feedID.String(),
					Name:              "feed_title_1",
					Description:       "feed_description_1",
					PlatformID:        platformID.String(),
					CategoryID:        categoryID.String(),
					SiteURL:           "https://example.com",
					RSSURL:            "https://example.com/rss",
					TrendPlatformType: 0,
				},
			},
			recordCategories: []entity.Category{
				{
					ID:   categoryID.String(),
					Name: "category_name_1",
					Type: 1,
				},
			},
			feed: &entity.Feed{
				ID:                feedID.String(),
				Name:              "feed_title_1",
				Description:       "feed_description_1",
				PlatformID:        platformID.String(),
				CategoryID:        categoryID.String(),
				SiteURL:           "https://example.com",
				RSSURL:            "https://example.com/rss",
				TrendPlatformType: 0,
			},
			rss: repository.RSS{
				Link:        "https://example.com/article_1",
				Title:       "article_title_1",
				Description: "article_description_1",
				PublishedAt: int(publishedUnix),
				ImageURL:    "https://example.com/image_1",
				Tags:        "tag_1, tag_2",
				AuthorName:  "author_name_1",
			},
			isEng: false,
			wantResponse: ArticleContentsCrawlerResponse{
				IsCreatedArticle:             true,
				IsCreatedFeedArticleRelation: true,
				IsRollback:                   false,
				IsCommit:                     true,
			},
			wantArticles: []*entity.Article{
				{
					ID:           articleID.String(),
					PlatformID:   null.String{Valid: true, String: platformID.String()},
					Title:        "article_title_1",
					Description:  "article_description_1",
					ArticleURL:   "https://example.com/article_1",
					PublishedAt:  null.TimeFrom(time.Unix(int64(publishedUnix), 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://example.com/image_1",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleRelationID.String(),
					FeedID:    feedID.String(),
					ArticleID: articleID.String(),
				},
			},
		},
		"Success: exit feed_article_relations data": {
			recordPlatform: []entity.Platform{
				{
					ID:               platformID.String(),
					Name:             "platform_name_1",
					PlatformSiteType: 0,
					SiteURL:          "https://example.com",
					FaviconURL:       "https://example.com/favicon",
					IsEng:            false,
				},
			},
			recordFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleRelationID.String(),
					FeedID:    feedID.String(),
					ArticleID: articleID.String(),
				},
			},
			recordArticles: []entity.Article{
				{
					ID:          articleID.String(),
					PlatformID:  null.String{Valid: true, String: platformID.String()},
					Title:       "article_title_1",
					Description: "article_description_1",
					ArticleURL:  "https://example.com/article_1",
					// PublishedAt:  null.Time{},
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://example.com/image_1",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			recordFeeds: []entity.Feed{
				{
					ID:                feedID.String(),
					Name:              "feed_title_1",
					Description:       "feed_description_1",
					PlatformID:        platformID.String(),
					CategoryID:        categoryID.String(),
					SiteURL:           "https://example.com",
					RSSURL:            "https://example.com/rss",
					TrendPlatformType: 0,
				},
			},
			recordCategories: []entity.Category{
				{
					ID:   categoryID.String(),
					Name: "category_name_1",
					Type: 1,
				},
			},
			feed: &entity.Feed{
				ID:                feedID.String(),
				Name:              "feed_title_1",
				Description:       "feed_description_1",
				PlatformID:        platformID.String(),
				CategoryID:        categoryID.String(),
				SiteURL:           "https://example.com",
				RSSURL:            "https://example.com/rss",
				TrendPlatformType: 0,
			},
			rss: repository.RSS{
				Link:        "https://example.com/article_1",
				Title:       "article_title_1",
				Description: "article_description_1",
				PublishedAt: 1111111,
				ImageURL:    "https://example.com/image_1",
				Tags:        "tag_1, tag_2",
				AuthorName:  "author_name_1",
			},
			isEng: false,
			wantResponse: ArticleContentsCrawlerResponse{
				IsCreatedArticle:             false,
				IsCreatedFeedArticleRelation: false,
				IsRollback:                   false,
				IsCommit:                     true,
			},
			wantArticles: []*entity.Article{
				{
					ID:          articleID.String(),
					PlatformID:  null.String{Valid: true, String: platformID.String()},
					Title:       "article_title_1",
					Description: "article_description_1",
					ArticleURL:  "https://example.com/article_1",
					// PublishedAt:  null.Time{},
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://example.com/image_1",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleRelationID.String(),
					FeedID:    feedID.String(),
					ArticleID: articleID.String(),
				},
			},
		},
	}

	for name, tt := range test {
		tt := tt
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			ctx := context.Background()

			pgContainer, err := testonly.SetupDB(t, "../testonly/schema/")
			if err != nil {
				t.Fatalf("Failed to setup database: %s", err)
			}
			t.Cleanup(pgContainer.Down)

			db := pgContainer.DB

			testArticleRepository := supaRepo.NewArticleRepository(db)

			if tt.recordPlatform != nil {
				for _, v := range tt.recordPlatform {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			if tt.recordCategories != nil {
				for _, v := range tt.recordCategories {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			if tt.recordFeeds != nil {
				for _, v := range tt.recordFeeds {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			if tt.recordArticles != nil {
				for _, v := range tt.recordArticles {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			if tt.recordFeedArticleRelations != nil {
				for _, v := range tt.recordFeedArticleRelations {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			tx, err := db.Begin()
			if err != nil {
				t.Fatalf("Failed to begin transaction: %s", err)
			}

			res, err := ArticleContentsCrawler(ctx, tx, tt.feed, tt.rss, tt.isEng)
			if err != nil {
				t.Fatalf("Failed to execute ArticleContentsCrawler: %s", err)
			}

			if res.IsCreatedArticle != tt.wantResponse.IsCreatedArticle {
				t.Errorf("IsCreatedArticle got: %v, want: %v", res.IsCreatedArticle, tt.wantResponse.IsCreatedArticle)
			}
			if res.IsCreatedFeedArticleRelation != tt.wantResponse.IsCreatedFeedArticleRelation {
				t.Errorf("IsCreatedFeedArticleRelation got: %v, want: %v", res.IsCreatedFeedArticleRelation, tt.wantResponse.IsCreatedFeedArticleRelation)
			}
			if res.IsRollback != tt.wantResponse.IsRollback {
				t.Errorf("IsRollback got: %v, want: %v", res.IsRollback, tt.wantResponse.IsRollback)
			}
			if res.IsCommit != tt.wantResponse.IsCommit {
				t.Errorf("IsCommit got: %v, want: %v", res.IsCommit, tt.wantResponse.IsCommit)
			}

			err = tx.Commit()
			if err != nil {
				t.Fatalf("Failed to commit transaction: %s", err)
			}

			got, err := testArticleRepository.GetArticles(ctx, domain.GetArticlesInputDTO{})
			if err != nil {
				t.Fatalf("Failed to get articles: %s", err)
			}

			opts := []cmp.Option{
				cmpopts.IgnoreFields(entity.Article{}, "ID"),
				cmpopts.IgnoreFields(entity.Article{}, "CreatedAt"),
				cmpopts.IgnoreFields(entity.Article{}, "UpdatedAt"),
			}

			if diff := cmp.Diff(tt.wantArticles, got, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

		})
	}

}
