package crawler

import (
	"context"
	"testing"
	"time"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	supaRepo "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/supabase/repository"
	"github.com/YukiOnishi1129/techpicks/batch-service/testutil"
	"github.com/YukiOnishi1129/techpicks/batch-service/testutil/mock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func Test_Crawler_ArticleContentsCrawler(t *testing.T) {

	mockPlatforms := mock.GetPlatformMock()
	mockFeeds := mock.GetFeedMock()

	mockFeed1 := mockFeeds[0]
	mockFeed3 := mockFeeds[2]

	articleID1, _ := uuid.NewUUID()

	feedArticleID1, _ := uuid.NewUUID()
	feedArticleID2, _ := uuid.NewUUID()

	publishedUnix := time.Now().Unix()

	test := map[string]struct {
		recordFeedArticleRelations []entity.FeedArticleRelation
		recordArticles             []entity.Article
		feed                       *entity.Feed
		rss                        repository.RSS
		isEng                      bool
		wantResponse               ArticleContentsCrawlerResponse
		wantArticles               []entity.Article
		wantFeedArticleRelations   []entity.FeedArticleRelation
	}{
		"Success: create new article": {
			feed: &mockFeed1,
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
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
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
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
			},
		},
		"Success: create new article english": {
			feed: &mockFeed1,
			rss: repository.RSS{
				Link:        "https://example.com/article_1",
				Title:       "article_title_1",
				Description: "article_description_1",
				PublishedAt: int(publishedUnix),
				ImageURL:    "https://example.com/image_1",
				Tags:        "tag_1, tag_2",
				AuthorName:  "author_name_1",
			},
			isEng: true,
			wantResponse: ArticleContentsCrawlerResponse{
				IsCreatedArticle:             true,
				IsCreatedFeedArticleRelation: true,
				IsRollback:                   false,
				IsCommit:                     true,
			},
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
					Title:        "article_title_1",
					Description:  "article_description_1",
					ArticleURL:   "https://example.com/article_1",
					PublishedAt:  null.TimeFrom(time.Unix(int64(publishedUnix), 0)),
					AuthorName:   null.String{Valid: true, String: "author_name_1"},
					Tags:         null.String{Valid: true, String: "tag_1, tag_2"},
					ThumbnailURL: "https://example.com/image_1",
					IsEng:        true,
					IsPrivate:    false,
				},
			},
			wantFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
			},
		},
		"Success: exit article data same feed id and not exit feed article relation data": {
			recordFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
			},
			recordArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
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
			feed: &mockFeed3,
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
				IsCreatedFeedArticleRelation: true,
				IsRollback:                   false,
				IsCommit:                     true,
			},
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
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
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
				{
					ID:        feedArticleID2.String(),
					FeedID:    mockFeed3.ID,
					ArticleID: articleID1.String(),
				},
			},
		},
		"Success: exit article data same feed id and feed article relation data": {
			recordFeedArticleRelations: []entity.FeedArticleRelation{
				{
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
			},
			recordArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
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
			feed: &mockFeed1,
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
			wantArticles: []entity.Article{
				{
					ID:           articleID1.String(),
					PlatformID:   null.String{Valid: true, String: mockPlatforms[0].ID},
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
					ID:        feedArticleID1.String(),
					FeedID:    mockFeed1.ID,
					ArticleID: articleID1.String(),
				},
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
		})
	}
}
