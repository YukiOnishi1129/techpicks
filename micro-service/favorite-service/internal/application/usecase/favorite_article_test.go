package usecase

import (
	"context"
	"testing"
	"time"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/infrustructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/util/testutil"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/util/testutil/mock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func Test_UseCase_CreateFavoriteArticle(t *testing.T) {
	t.Parallel()

	faID1, _ := uuid.NewRandom()

	fafID1, _ := uuid.NewRandom()
	fafID2, _ := uuid.NewRandom()

	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	articleID2 := mockArticles[1].ID
	// articleID3 := mockArticles[2].ID
	userID1 := mockProfiles[0].ID
	userID2 := mockProfiles[1].ID
	// userID3 := mockProfiles[2].ID

	tests := map[string]struct {
		recordFavoriteArticles       []entity.FavoriteArticle
		recordFavoriteArticleFolders []entity.FavoriteArticleFolder
		arg                          *fpb.CreateFavoriteArticleRequest
		want                         *fpb.CreateFavoriteArticleResponse
		wantRecordFavoriteArticles   entity.FavoriteArticleSlice
		wantErrMsg                   string
	}{
		"success": {
			recordFavoriteArticles: []entity.FavoriteArticle{
				{
					ID:                      faID1.String(),
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID1,
					UserID:                  userID1,
					Title:                   "title1",
					Description:             "description1",
					ThumbnailURL:            "thumbnail_url1",
					ArticleURL:              "article_url1",
					PlatformID:              null.String{String: platformID1, Valid: true},
					PublishedAt:             null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName:              null.String{String: "author_name1", Valid: true},
					Tags:                    null.String{String: "tags1", Valid: true},
					PlatformName:            "platform_name1",
					PlatformURL:             "platform_url1",
					PlatformFaviconURL:      "platform_favicon_url1",
					IsEng:                   true,
					IsPrivate:               false,
				},
			},
			recordFavoriteArticleFolders: []entity.FavoriteArticleFolder{
				{
					ID:     fafID1.String(),
					UserID: userID1,
					Title:  "folder_title1",
				},
				{
					ID:     fafID2.String(),
					UserID: userID2,
					Title:  "folder_title2",
				},
			},
			arg: &fpb.CreateFavoriteArticleRequest{
				UserId:                  userID2,
				ArticleId:               articleID2,
				FavoriteArticleFolderId: fafID2.String(),
				PlatformId:              &wrapperspb.StringValue{Value: platformID1},
				Title:                   "title2",
				Description:             &wrapperspb.StringValue{Value: "description2"},
				ThumbnailUrl:            "https://sample.com/thumbnail_url2",
				ArticleUrl:              "https://sample.com/article_url2",
				PublishedAt:             &timestamppb.Timestamp{Seconds: publishedAt},
				AuthorName:              &wrapperspb.StringValue{Value: "author_name2"},
				Tags:                    &wrapperspb.StringValue{Value: "tags2"},
				PlatformName:            "platform_name2",
				PlatformUrl:             "https://sample.com/platform_url2",
				PlatformFaviconUrl:      "https://sample.com/platform_favicon_url2",
				IsEng:                   true,
				IsPrivate:               false,
			},
			want: &fpb.CreateFavoriteArticleResponse{
				FavoriteArticle: &fpb.FavoriteArticle{
					FavoriteArticleFolderId: fafID2.String(),
					ArticleId:               articleID2,
					UserId:                  userID2,
					PlatformId:              &wrapperspb.StringValue{Value: platformID1},
					Title:                   "title2",
					Description:             "description2",
					ThumbnailUrl:            "https://sample.com/thumbnail_url2",
					ArticleUrl:              "https://sample.com/article_url2",
					PublishedAt:             &timestamppb.Timestamp{Seconds: publishedAt},
					AuthorName:              &wrapperspb.StringValue{Value: "author_name2"},
					Tags:                    &wrapperspb.StringValue{Value: "tags2"},
					PlatformName:            "platform_name2",
					PlatformUrl:             "https://sample.com/platform_url2",
					PlatformFaviconUrl:      "https://sample.com/platform_favicon_url2",
					IsEng:                   true,
					IsPrivate:               false,
				},
			},
			wantRecordFavoriteArticles: entity.FavoriteArticleSlice{
				{
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID1,
					UserID:                  userID1,
					Title:                   "title1",
					Description:             "description1",
					ThumbnailURL:            "thumbnail_url1",
					ArticleURL:              "article_url1",
					PlatformID:              null.String{String: platformID1, Valid: true},
					PublishedAt:             null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName:              null.String{String: "author_name1", Valid: true},
					Tags:                    null.String{String: "tags1", Valid: true},
					PlatformName:            "platform_name1",
					PlatformURL:             "platform_url1",
					PlatformFaviconURL:      "platform_favicon_url1",
					IsEng:                   true,
					IsPrivate:               false,
				},
				{
					FavoriteArticleFolderID: fafID2.String(),
					ArticleID:               articleID2,
					UserID:                  userID2,
					Title:                   "title2",
					Description:             "description2",
					ThumbnailURL:            "https://sample.com/thumbnail_url2",
					ArticleURL:              "https://sample.com/article_url2",
					PlatformID:              null.String{String: platformID1, Valid: true},
					PublishedAt:             null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName:              null.String{String: "author_name2", Valid: true},
					Tags:                    null.String{String: "tags2", Valid: true},
					PlatformName:            "platform_name2",
					PlatformURL:             "https://sample.com/platform_url2",
					PlatformFaviconURL:      "https://sample.com/platform_favicon_url2",
					IsEng:                   true,
					IsPrivate:               false,
				},
			},
		},
		"success: no nullable parameter": {
			recordFavoriteArticles: []entity.FavoriteArticle{
				{
					ID:                      faID1.String(),
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID1,
					UserID:                  userID1,
					Title:                   "title1",
					Description:             "description1",
					ThumbnailURL:            "thumbnail_url1",
					ArticleURL:              "article_url1",
					PlatformID:              null.String{String: platformID1, Valid: true},
					PublishedAt:             null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName:              null.String{String: "author_name1", Valid: true},
					Tags:                    null.String{String: "tags1", Valid: true},
					PlatformName:            "platform_name1",
					PlatformURL:             "platform_url1",
					PlatformFaviconURL:      "platform_favicon_url1",
					IsEng:                   true,
					IsPrivate:               false,
				},
			},
			recordFavoriteArticleFolders: []entity.FavoriteArticleFolder{
				{
					ID:     fafID1.String(),
					UserID: userID1,
					Title:  "folder_title1",
				},
				{
					ID:     fafID2.String(),
					UserID: userID2,
					Title:  "folder_title2",
				},
			},
			arg: &fpb.CreateFavoriteArticleRequest{
				UserId:                  userID2,
				ArticleId:               articleID2,
				FavoriteArticleFolderId: fafID2.String(),
				Title:                   "title2",
				ThumbnailUrl:            "https://sample.com/thumbnail_url2",
				ArticleUrl:              "https://sample.com/article_url2",
				PlatformName:            "platform_name2",
				PlatformUrl:             "https://sample.com/platform_url2",
				PlatformFaviconUrl:      "https://sample.com/platform_favicon_url2",
				IsEng:                   true,
				IsPrivate:               false,
			},
			want: &fpb.CreateFavoriteArticleResponse{
				FavoriteArticle: &fpb.FavoriteArticle{
					FavoriteArticleFolderId: fafID2.String(),
					ArticleId:               articleID2,
					UserId:                  userID2,
					Title:                   "title2",
					Description:             "",
					ThumbnailUrl:            "https://sample.com/thumbnail_url2",
					ArticleUrl:              "https://sample.com/article_url2",

					PlatformName:       "platform_name2",
					PlatformUrl:        "https://sample.com/platform_url2",
					PlatformFaviconUrl: "https://sample.com/platform_favicon_url2",
					IsEng:              true,
					IsPrivate:          false,
				},
			},
			wantRecordFavoriteArticles: entity.FavoriteArticleSlice{
				{
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID1,
					UserID:                  userID1,
					Title:                   "title1",
					Description:             "description1",
					ThumbnailURL:            "thumbnail_url1",
					ArticleURL:              "article_url1",
					PlatformID:              null.String{String: platformID1, Valid: true},
					PublishedAt:             null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName:              null.String{String: "author_name1", Valid: true},
					Tags:                    null.String{String: "tags1", Valid: true},
					PlatformName:            "platform_name1",
					PlatformURL:             "platform_url1",
					PlatformFaviconURL:      "platform_favicon_url1",
					IsEng:                   true,
					IsPrivate:               false,
				},
				{
					FavoriteArticleFolderID: fafID2.String(),
					ArticleID:               articleID2,
					UserID:                  userID2,
					Title:                   "title2",
					Description:             "",
					ThumbnailURL:            "https://sample.com/thumbnail_url2",
					ArticleURL:              "https://sample.com/article_url2",
					PlatformName:            "platform_name2",
					PlatformURL:             "https://sample.com/platform_url2",
					PlatformFaviconURL:      "https://sample.com/platform_favicon_url2",
					IsEng:                   true,
					IsPrivate:               false,
				},
			},
		},
	}

	for name, tt := range tests {
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

			testFavoriteArticleFolderRepository := persistence.NewFavoriteArticleFolderPersistence(db)
			testFavoriteArticleRepository := persistence.NewFavoriteArticlePersistence(db)

			testFavoriteArticleFolderPersistenceAdapter := persistenceadapter.NewFavoriteArticleFolderPersistenceAdapter(testFavoriteArticleFolderRepository)
			testFavoriteArticlePersistenceAdapter := persistenceadapter.NewFavoriteArticlePersistenceAdapter(testFavoriteArticleRepository)

			testFavoriteUsecase := NewFavoriteUseCase(testFavoriteArticleFolderPersistenceAdapter, testFavoriteArticlePersistenceAdapter)

			if tt.recordFavoriteArticleFolders != nil {
				for _, v := range tt.recordFavoriteArticleFolders {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			if tt.recordFavoriteArticles != nil {
				for _, v := range tt.recordFavoriteArticles {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			got, err := testFavoriteUsecase.CreateFavoriteArticle(ctx, tt.arg)
			if err != nil {
				if tt.wantErrMsg == "" {
					t.Error(err)
					return
				}
				if diff := cmp.Diff(err.Error(), tt.wantErrMsg); diff != "" {
					t.Errorf("failed CreateFavoriteArticle (-got +want):\n%s", diff)
				}
				return
			}

			opts := []cmp.Option{
				cmp.AllowUnexported(fpb.CreateFavoriteArticleResponse{}),
				cmp.AllowUnexported(fpb.FavoriteArticle{}),
				cmpopts.IgnoreFields(fpb.CreateFavoriteArticleResponse{}, "state", "sizeCache", "unknownFields"),
				cmpopts.IgnoreFields(fpb.FavoriteArticle{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}
			if diff := cmp.Diff(got, tt.want, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

			gotRecords, err := testFavoriteArticleRepository.GetFavoriteArticles(ctx, nil)
			if err != nil {
				t.Errorf("Failed to get record: %s", err)
				return
			}
			optRecords := []cmp.Option{
				cmp.AllowUnexported(entity.FavoriteArticle{}),
				cmpopts.IgnoreFields(entity.FavoriteArticle{}, "ID", "CreatedAt", "UpdatedAt"),
			}

			if diff := cmp.Diff(gotRecords, tt.wantRecordFavoriteArticles, optRecords...); diff != "" {
				t.Fatalf("record is not expected: %s", diff)
			}

		})
	}
}
