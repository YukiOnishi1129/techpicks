package crawler

import (
	"context"
	"testing"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	supaRepo "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/supabase/repository"
	"github.com/YukiOnishi1129/techpicks/batch-service/testutil"
	"github.com/YukiOnishi1129/techpicks/batch-service/testutil/mock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func Test_Crawler_TrendArticleContentsCrawler(t *testing.T) {

	// 1. article 0, create article, far, trend article

	// 2. article 1,trend 0,far 0, create trend, far, not create article

	// 3. article 1, trend 1, far 1, trend.updateAt > 1 hour ago and trend.count < arg.count, update trend, not article, far

	// 4. article 1, trend 1, far 1, trend.updateAt < 1 hour ago and trend.count < arg.count, not update trend, not article, far

	// 5. article 1, trend 1, far 1, trend.updateAt > 1 hour ago and trend.count > arg.count, not update trend, not article, far

	mockFeeds := mock.GetFeedMock()

	articleID1, _ := uuid.NewUUID()

	feedArticleID1, _ := uuid.NewUUID()
	feedArticleID2, _ := uuid.NewUUID()

	trendArticleID1, _ := uuid.NewUUID()

	articleAuthorName := "author_name_1"
	articleTags := "tag_1, tag_2"

	twoHoursAgo := time.Now().Add(-2 * time.Hour)
	// thirtyMinutesAgo := time.Now().Add(-30 * time.Minute)

	test := map[string]struct {
		recordFeedArticleRelations []entity.FeedArticleRelation
		recordArticles             []entity.Article
		recordTrendArticles        []entity.TrendArticle
		arg                        TrendArticleContentsCrawlerArg
		wantFeedArticleRelations   []entity.FeedArticleRelation
		wantArticles               []entity.Article
		wantTrendArticles          []entity.TrendArticle
		wantResponse               TrendArticleContentsCrawlerResponse
	}{
		"Success: create TrendArticle, Article, FeedArticleRelation": {
			arg: TrendArticleContentsCrawlerArg{
				FeedID:             mockFeeds[7].ID,
				PlatformID:         mockFeeds[7].PlatformID,
				ArticleTitle:       "article_title_1",
				ArticleURL:         "https://article.example1.com",
				ArticleLikeCount:   10,
				ArticlePublishedAt: 1620000000,
				ArticleAuthorName:  &articleAuthorName,
				ArticleTags:        &articleTags,
				ArticleOGPImageURL: "https://article.example1.com/ogp",
				IsEng:              false,
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeeds[7].ID,
					ArticleID: articleID1.String(),
				},
			},
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockFeeds[7].PlatformID},
					Title:        "article_title_1",
					Description:  "",
					ArticleURL:   "https://article.example1.com",
					PublishedAt:  null.TimeFrom(time.Unix(1620000000, 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://article.example1.com/ogp",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			wantTrendArticles: []entity.TrendArticle{
				{
					ID:         trendArticleID1.String(),
					ArticleID:  articleID1.String(),
					PlatformID: mockFeeds[7].PlatformID,
					LikeCount:  10,
				},
			},
			wantResponse: TrendArticleContentsCrawlerResponse{
				IsCreatedTrendArticle:        true,
				IsUpdatedTrendArticle:        false,
				IsCreatedArticle:             true,
				IsCreatedFeedArticleRelation: true,
				IsRollback:                   false,
				IsCommit:                     true,
			},
		},
		"Success: create TrendArticle, FeedArticleRelation, exit article": {
			recordFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeeds[7].ID,
					ArticleID: articleID1.String(),
				},
			},
			recordArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockFeeds[7].PlatformID},
					Title:        "article_title_1",
					Description:  "",
					ArticleURL:   "https://article.example1.com",
					PublishedAt:  null.TimeFrom(time.Unix(1620000000, 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://article.example1.com/ogp",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			arg: TrendArticleContentsCrawlerArg{
				FeedID:             mockFeeds[8].ID,
				PlatformID:         mockFeeds[8].PlatformID,
				ArticleTitle:       "article_title_1",
				ArticleURL:         "https://article.example1.com",
				ArticleLikeCount:   15,
				ArticlePublishedAt: 1620000000,
				ArticleAuthorName:  &articleAuthorName,
				ArticleTags:        &articleTags,
				ArticleOGPImageURL: "https://article.example1.com/ogp",
				IsEng:              false,
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeeds[7].ID,
					ArticleID: articleID1.String(),
				},
				{
					ID:        feedArticleID2.String(),
					FeedID:    mockFeeds[8].ID,
					ArticleID: articleID1.String(),
				},
			},
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockFeeds[7].PlatformID},
					Title:        "article_title_1",
					Description:  "",
					ArticleURL:   "https://article.example1.com",
					PublishedAt:  null.TimeFrom(time.Unix(1620000000, 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://article.example1.com/ogp",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			wantTrendArticles: []entity.TrendArticle{
				{
					ID:         trendArticleID1.String(),
					ArticleID:  articleID1.String(),
					PlatformID: mockFeeds[8].PlatformID,
					LikeCount:  15,
				},
			},
			wantResponse: TrendArticleContentsCrawlerResponse{
				IsCreatedTrendArticle:        true,
				IsUpdatedTrendArticle:        false,
				IsCreatedArticle:             false,
				IsCreatedFeedArticleRelation: true,
				IsRollback:                   false,
				IsCommit:                     true,
			},
		},
		"Success: update trend article exit data publishedAt 2 hours ago": {
			recordFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeeds[8].ID,
					ArticleID: articleID1.String(),
				},
			},
			recordArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockFeeds[8].PlatformID},
					Title:        "article_title_1",
					Description:  "",
					ArticleURL:   "https://article.example1.com",
					PublishedAt:  null.TimeFrom(time.Unix(1620000000, 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://article.example1.com/ogp",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			recordTrendArticles: []entity.TrendArticle{
				{
					ID:         trendArticleID1.String(),
					ArticleID:  articleID1.String(),
					PlatformID: mockFeeds[8].PlatformID,
					LikeCount:  20,
					UpdatedAt:  twoHoursAgo,
				},
			},
			arg: TrendArticleContentsCrawlerArg{
				FeedID:             mockFeeds[8].ID,
				PlatformID:         mockFeeds[8].PlatformID,
				ArticleTitle:       "article_title_1",
				ArticleURL:         "https://article.example1.com",
				ArticleLikeCount:   32,
				ArticlePublishedAt: 1620000000,
				ArticleAuthorName:  &articleAuthorName,
				ArticleTags:        &articleTags,
				ArticleOGPImageURL: "https://article.example1.com/ogp",
				IsEng:              false,
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID2.String(),
					FeedID:    mockFeeds[8].ID,
					ArticleID: articleID1.String(),
				},
			},
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockFeeds[8].PlatformID},
					Title:        "article_title_1",
					Description:  "",
					ArticleURL:   "https://article.example1.com",
					PublishedAt:  null.TimeFrom(time.Unix(1620000000, 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://article.example1.com/ogp",
					IsEng:        false,
					IsPrivate:    false,
				},
			},
			wantTrendArticles: []entity.TrendArticle{
				{
					ID:         trendArticleID1.String(),
					ArticleID:  articleID1.String(),
					PlatformID: mockFeeds[8].PlatformID,
					LikeCount:  32,
				},
			},
			wantResponse: TrendArticleContentsCrawlerResponse{
				IsCreatedTrendArticle:        false,
				IsUpdatedTrendArticle:        true,
				IsCreatedArticle:             false,
				IsCreatedFeedArticleRelation: false,
				IsRollback:                   false,
				IsCommit:                     true,
			},
		},
	}

	for name, tt := range test {
		tt := tt
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			ctx := context.Background()

			pgContainer, err := testutil.SetupTest(ctx, t, "../../testutil/schema/")
			if err != nil {
				t.Fatalf("Failed to setup database: %s", err)
			}
			t.Cleanup(pgContainer.Down)

			db := pgContainer.DB

			testArticleRepository := supaRepo.NewArticleRepository(db)
			testFeedArticleRelationRepository := supaRepo.NewFeedArticleRelationRepository(db)
			testTrendArticleRepository := supaRepo.NewATrendArticleRepository(db)

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
			if tt.recordTrendArticles != nil {
				for _, v := range tt.recordTrendArticles {
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

			res, err := TrendArticleContentsCrawler(ctx, tx, tt.arg)
			if err != nil {
				t.Fatalf("Failed to create article: %s", err)
			}

			if res.IsCreatedArticle != tt.wantResponse.IsCreatedArticle {
				t.Errorf("want %v, got %v", tt.wantResponse.IsCreatedArticle, res.IsCreatedArticle)
			}
			if res.IsCreatedFeedArticleRelation != tt.wantResponse.IsCreatedFeedArticleRelation {
				t.Errorf("want %v, got %v", tt.wantResponse.IsCreatedFeedArticleRelation, res.IsCreatedFeedArticleRelation)
			}
			if res.IsCreatedTrendArticle != tt.wantResponse.IsCreatedTrendArticle {
				t.Errorf("want %v, got %v", tt.wantResponse.IsCreatedTrendArticle, res.IsCreatedTrendArticle)
			}
			if res.IsUpdatedTrendArticle != tt.wantResponse.IsUpdatedTrendArticle {
				t.Errorf("want %v, got %v", tt.wantResponse.IsUpdatedTrendArticle, res.IsUpdatedTrendArticle)
			}
			if res.IsRollback != tt.wantResponse.IsRollback {
				t.Errorf("want %v, got %v", tt.wantResponse.IsRollback, res.IsRollback)
			}
			if res.IsCommit != tt.wantResponse.IsCommit {
				t.Errorf("want %v, got %v", tt.wantResponse.IsCommit, res.IsCommit)
			}

			err = tx.Commit()
			if err != nil {
				t.Fatalf("Failed to commit transaction: %s", err)
			}

			// check feed article relation
			gotFeedArticleRelations, err := testFeedArticleRelationRepository.GetFeedArticleRelations(ctx, domain.GetFeedArticleRelationsInputDTO{})
			if err != nil {
				t.Fatalf("Failed to get feed article relations: %s", err)
			}
			optFeedArticleRelations := []cmp.Option{
				cmpopts.IgnoreFields(entity.FeedArticleRelation{}, "ID", "CreatedAt", "UpdatedAt", "ArticleID"),
			}

			if diff := cmp.Diff(gotFeedArticleRelations, tt.wantFeedArticleRelations, optFeedArticleRelations...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

			// check articles
			gotArticles, err := testArticleRepository.GetArticles(ctx, domain.GetArticlesInputDTO{})
			if err != nil {
				t.Fatalf("Failed to get articles: %s", err)
			}
			optsArticle := []cmp.Option{
				cmpopts.IgnoreFields(entity.Article{}, "ID", "CreatedAt", "UpdatedAt"),
			}
			if diff := cmp.Diff(gotArticles, tt.wantArticles, optsArticle...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

			// check trend articles
			gotTrendArticles, err := testTrendArticleRepository.GetTrendArticles(ctx)
			if err != nil {
				t.Fatalf("Failed to get trend articles: %s", err)
			}
			optsTrendArticle := []cmp.Option{
				cmpopts.IgnoreFields(entity.TrendArticle{}, "ID", "ArticleID", "CreatedAt", "UpdatedAt"),
			}
			if diff := cmp.Diff(gotTrendArticles, tt.wantTrendArticles, optsTrendArticle...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}
		})
	}
}
