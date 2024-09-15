package usecase

import (
	"context"
	"testing"
	"time"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/external"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util/testutil"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util/testutil/mock"
	"github.com/golang/mock/gomock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func Test_UseCase_GetArticles(t *testing.T) {}

func Test_UseCase_CreateUploadArticle(t *testing.T) {
	t.Parallel()

	articleID, _ := uuid.NewRandom()
	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()
	mockPlatforms := mock.GetPlatformMock()

	test := map[string]struct {
		recordArticles []entity.Article
		arg            *cpb.CreateUploadArticleRequest
		want           *cpb.CreateArticleResponse
		wantErrMsg     string
	}{
		"success: create upload article when not already article": {
			recordArticles: []entity.Article{
				{
					ID: articleID.String(),
					PlatformID: null.String{
						Valid:  true,
						String: mockPlatforms[0].ID,
					},
					Title:        "test title1",
					Description:  "test description1",
					ArticleURL:   "https://test.com/article1",
					PublishedAt:  null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    false,
				},
			},
			arg: &cpb.CreateUploadArticleRequest{
				UserId:             "test userId2",
				Title:              "test title2",
				Description:        "test description2",
				ArticleUrl:         "https://test.com/article2",
				ThumbnailUrl:       "https://test.com/article2/thumbnail",
				PlatformName:       mockPlatforms[1].Name,
				PlatformUrl:        mockPlatforms[1].SiteURL,
				PlatformFaviconUrl: mockPlatforms[1].FaviconURL,
			},
			want: &cpb.CreateArticleResponse{
				Article: &cpb.Article{
					Id:           articleID.String(),
					Title:        "test title2",
					Description:  "test description2",
					ArticleUrl:   "https://test.com/article2",
					ThumbnailUrl: "https://test.com/article2/thumbnail",
					IsEng:        true,
					IsPrivate:    true,
				},
			},
		},
		"success: create upload article when not already article title hiragana": {
			recordArticles: []entity.Article{
				{
					ID: articleID.String(),
					PlatformID: null.String{
						Valid:  true,
						String: mockPlatforms[0].ID,
					},
					Title:        "test title1",
					Description:  "test description1",
					ArticleURL:   "https://test.com/article1",
					PublishedAt:  null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    false,
				},
			},
			arg: &cpb.CreateUploadArticleRequest{
				UserId:             "test userId2",
				Title:              "test タイトル2",
				Description:        "test description2",
				ArticleUrl:         "https://test.com/article2",
				ThumbnailUrl:       "https://test.com/article2/thumbnail",
				PlatformName:       mockPlatforms[1].Name,
				PlatformUrl:        mockPlatforms[1].SiteURL,
				PlatformFaviconUrl: mockPlatforms[1].FaviconURL,
			},
			want: &cpb.CreateArticleResponse{
				Article: &cpb.Article{
					Id:           articleID.String(),
					Title:        "test タイトル2",
					Description:  "test description2",
					ArticleUrl:   "https://test.com/article2",
					ThumbnailUrl: "https://test.com/article2/thumbnail",
					IsEng:        false,
					IsPrivate:    true,
				},
			},
		},
		"success: create upload article when not already article description hiragana": {
			recordArticles: []entity.Article{
				{
					ID: articleID.String(),
					PlatformID: null.String{
						Valid:  true,
						String: mockPlatforms[0].ID,
					},
					Title:        "test title1",
					Description:  "test description1",
					ArticleURL:   "https://test.com/article1",
					PublishedAt:  null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    false,
				},
			},
			arg: &cpb.CreateUploadArticleRequest{
				UserId:             "test userId2",
				Title:              "test title2",
				Description:        "test 本文2",
				ArticleUrl:         "https://test.com/article2",
				ThumbnailUrl:       "https://test.com/article2/thumbnail",
				PlatformName:       mockPlatforms[1].Name,
				PlatformUrl:        mockPlatforms[1].SiteURL,
				PlatformFaviconUrl: mockPlatforms[1].FaviconURL,
			},
			want: &cpb.CreateArticleResponse{
				Article: &cpb.Article{
					Id:           articleID.String(),
					Title:        "test title2",
					Description:  "test 本文2",
					ArticleUrl:   "https://test.com/article2",
					ThumbnailUrl: "https://test.com/article2/thumbnail",
					IsEng:        false,
					IsPrivate:    true,
				},
			},
		},
		"success: already article not private article": {
			recordArticles: []entity.Article{
				{
					ID: articleID.String(),
					PlatformID: null.String{
						Valid:  true,
						String: mockPlatforms[0].ID,
					},
					Title:        "test title1",
					Description:  "test description1",
					ArticleURL:   "https://test.com/article1",
					PublishedAt:  null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    false,
				},
			},
			arg: &cpb.CreateUploadArticleRequest{
				UserId:             "test userId1",
				Title:              "test title1",
				Description:        "test description1",
				ArticleUrl:         "https://test.com/article1",
				ThumbnailUrl:       "https://test.com/article1/thumbnail",
				PlatformName:       mockPlatforms[0].Name,
				PlatformUrl:        mockPlatforms[0].SiteURL,
				PlatformFaviconUrl: mockPlatforms[0].FaviconURL,
			},
			want: &cpb.CreateArticleResponse{
				Article: &cpb.Article{
					Id:          articleID.String(),
					Title:       "test title1",
					Description: "test description1",
					Platform: &cpb.Platform{
						Id:               mockPlatforms[0].ID,
						Name:             mockPlatforms[0].Name,
						SiteUrl:          mockPlatforms[0].SiteURL,
						PlatformSiteType: int64(mockPlatforms[0].PlatformSiteType),
						FaviconUrl:       mockPlatforms[0].FaviconURL,
						IsEng:            mockPlatforms[0].IsEng,
					},
					ArticleUrl:   "https://test.com/article1",
					ThumbnailUrl: "https://test.com/article1/thumbnail",
					PublishedAt:  &timestamppb.Timestamp{Seconds: publishedAt},
					IsEng:        true,
					IsPrivate:    false,
				},
			},
		},
		"success: already article private article": {
			recordArticles: []entity.Article{
				{
					ID:           articleID.String(),
					Title:        "test title1",
					Description:  "test description1",
					ArticleURL:   "https://test.com/article1",
					PublishedAt:  null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    true,
				},
			},
			arg: &cpb.CreateUploadArticleRequest{
				UserId:             "test userId1",
				Title:              "test title1",
				Description:        "test description1",
				ArticleUrl:         "https://test.com/article1",
				ThumbnailUrl:       "https://test.com/article1/thumbnail",
				PlatformName:       mockPlatforms[0].Name,
				PlatformUrl:        mockPlatforms[0].SiteURL,
				PlatformFaviconUrl: mockPlatforms[0].FaviconURL,
			},
			want: &cpb.CreateArticleResponse{
				Article: &cpb.Article{
					Id:           articleID.String(),
					Title:        "test title1",
					Description:  "test description1",
					ArticleUrl:   "https://test.com/article1",
					ThumbnailUrl: "https://test.com/article1/thumbnail",
					IsEng:        true,
					IsPrivate:    true,
				},
			},
		},
	}

	for name, tt := range test {
		tt := tt
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			ctx := context.Background()

			pgContainer, err := testutil.SetupTest(ctx, t, "../../util/testutil/schema/")
			if err != nil {
				t.Fatalf("Failed to setup database: %s", err)
			}
			t.Cleanup(pgContainer.Down)

			db := pgContainer.DB

			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockBookmarkClient := mock.NewMockBookmarkServiceClient(ctrl)

			mockBookmarkClient.EXPECT().GetBookmarkByArticleID(gomock.Any(), &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: "test articleId",
				UserId:    "test userId",
			}).Return(&bpb.GetBookmarkResponse{
				Bookmark: &bpb.Bookmark{},
			}, nil).AnyTimes()

			testArticleRepository := persistence.NewArticlePersistence(db)
			testBookmarkExternal := external.NewBookmarkExternal(mockBookmarkClient)

			testArticlePersistenceAdapter := persistenceadapter.NewArticlePersistenceAdapter(testArticleRepository)
			testBookmarkExternalAdapter := externaladapter.NewBookmarkExternalAdapter(testBookmarkExternal)

			testContentUseCase := NewContentUseCase(testArticlePersistenceAdapter, testBookmarkExternalAdapter)

			if tt.recordArticles != nil {
				for _, v := range tt.recordArticles {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert article: %s", err)
					}
				}
			}

			got, err := testContentUseCase.CreateUploadArticle(ctx, tt.arg)
			if err != nil {
				if tt.wantErrMsg == "" {
					t.Error(err)
					return
				}
				if diff := cmp.Diff(err.Error(), tt.wantErrMsg); diff != "" {
					t.Errorf("failed CreateUploadArticle (-got +want):\n%s", diff)
				}
				return
			}

			opts := []cmp.Option{
				cmp.AllowUnexported(cpb.Article{}),
				cmpopts.IgnoreFields(cpb.Article{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreFields(cpb.Platform{}, "state", "sizeCache", "unknownFields", "CreatedAt", "UpdatedAt", "DeletedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}

			if diff := cmp.Diff(got.Article, tt.want.Article, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

		})
	}
}
