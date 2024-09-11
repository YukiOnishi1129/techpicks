package usecase

import (
	"context"
	"testing"
	"time"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util/testutil"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util/testutil/mock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func Test_UseCase_GetBookmarks(t *testing.T) {
	t.Parallel()

	// TODO: Create later

	// bookmarkID1, _ := uuid.NewRandom()
	// bookmarkID2, _ := uuid.NewRandom()
	// bookmarkID3, _ := uuid.NewRandom()
	// bookmarkID4, _ := uuid.NewRandom()
	// bookmarkID5, _ := uuid.NewRandom()
	// bookmarkID6, _ := uuid.NewRandom()
	// bookmarkID7, _ := uuid.NewRandom()
	// bookmarkID8, _ := uuid.NewRandom()
	// bookmarkID9, _ := uuid.NewRandom()
	// bookmarkID10, _ := uuid.NewRandom()

	// publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	// mockPlatforms := mock.GetPlatformMock()
	// mockArticles := mock.GetArticleMock()
	// mockProfiles := mock.GetProfileMock()

	// test := map[string]struct {
	// 	recordBookmarks []entity.Bookmark
	// 	arg             *bpb.GetBookmarksRequest
	// 	want            *bpb.GetBookmarksResponse
	// }{
	// 	"Success: get bookmarks":                   {},
	// 	"Success: get bookmarks with custom limit": {},
	// 	"Success: get bookmarks with keyword":      {},
	// 	"Success: get bookmarks with cursor":       {},

	// 	"Fail: get bookmarks with invalid cursor":  {},
	// 	"Fail: get bookmarks with invalid keyword": {},
	// 	"Fail: get bookmarks with invalid limit":   {},
	// 	"Fail: get bookmarks with invalid userID":  {},
	// }

	// for name, tt := range test {
	// 	tt := tt
	// 	t.Run(name, func(t *testing.T) {
	// 		t.Parallel()
	// 		ctx := context.Background()

	// 		pgContainer, err := testutil.SetupTest(ctx, t, "../../util/testutil/schema/")
	// 		if err != nil {
	// 			t.Fatalf("Failed to setup database: %s", err)
	// 		}
	// 		t.Cleanup(pgContainer.Down)

	// 		db := pgContainer.DB

	// 		testBookmarkRepository := persistence.NewBookmarkPersistence(db)
	// 		testBookmarkAdapter := adapter.NewBookmarkAdapter(testBookmarkRepository)
	// 		testBookmarkUseCase := NewBookmarkUseCase(testBookmarkAdapter)

	// 		if tt.recordBookmarks != nil {
	// 			for _, v := range tt.recordBookmarks {
	// 				err = v.Insert(ctx, db, boil.Infer())
	// 				if err != nil {
	// 					t.Fatalf("Failed to insert record: %s", err)
	// 				}
	// 			}
	// 		}

	// 		got, err := testBookmarkUseCase.GetBookmarks(ctx, tt.arg)
	// 		if err != nil {
	// 			t.Fatalf("Failed to get bookmark: %s", err)
	// 			return
	// 		}

	// 		opts := []cmp.Option{
	// 			cmp.AllowUnexported(bpb.Bookmark{}),
	// 			cmpopts.IgnoreFields(bpb.Bookmark{}, "state", "sizeCache", "unknownFields", "CreatedAt", "UpdatedAt"),
	// 			cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
	// 		}
	// 		if diff := cmp.Diff(got.Bookmarks, tt.want.Bookmarks, opts...); diff != "" {
	// 			t.Fatalf("request is not expected: %s", diff)
	// 		}
	// 	})
	// }

}

func Test_UseCase_GetBookmarkByArticleID(t *testing.T) {
	t.Parallel()

	bookmarkID, _ := uuid.NewRandom()

	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	userID1 := mockProfiles[0].ID

	articleID2 := mockArticles[1].ID
	userID2 := mockProfiles[1].ID

	test := map[string]struct {
		recordBookmarks []entity.Bookmark
		arg             *bpb.GetBookmarkByArticleIDRequest
		want            *bpb.GetBookmarkResponse
	}{
		"Success: get bookmark by articleId": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: articleID1,
				UserId:    userID1,
			},
			want: &bpb.GetBookmarkResponse{
				Bookmark: &bpb.Bookmark{
					Id:                 bookmarkID.String(),
					ArticleId:          articleID1,
					UserId:             userID1,
					PlatformId:         &wrapperspb.StringValue{Value: platformID1},
					Title:              "title_1",
					Description:        "description_1",
					ArticleUrl:         "article_url_1",
					ThumbnailUrl:       "thumbnail_url_1",
					PublishedAt:        &timestamppb.Timestamp{Seconds: publishedAt},
					PlatformName:       "platform_name_1",
					PlatformUrl:        "platform_url_1",
					PlatformFaviconUrl: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
		},
		"Fail: not get bookmark by different articleId": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: articleID2,
				UserId:    userID1,
			},
			want: &bpb.GetBookmarkResponse{
				Bookmark: &bpb.Bookmark{},
			},
		},
		"Fail: not get bookmark by different userId": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.GetBookmarkByArticleIDRequest{
				ArticleId: articleID1,
				UserId:    userID2,
			},
			want: &bpb.GetBookmarkResponse{
				Bookmark: &bpb.Bookmark{},
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

			testBookmarkRepository := persistence.NewBookmarkPersistence(db)
			testBookmarkPersistenceAdapter := persistence_adapter.NewBookmarkPersistenceAdapter(testBookmarkRepository)
			testBookmarkUseCase := NewBookmarkUseCase(testBookmarkPersistenceAdapter)

			if tt.recordBookmarks != nil {
				for _, v := range tt.recordBookmarks {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			got, err := testBookmarkUseCase.GetBookmarkByArticleID(ctx, tt.arg)
			if err != nil {
				t.Fatalf("Failed to get bookmark: %s", err)
				return
			}

			opts := []cmp.Option{
				cmp.AllowUnexported(bpb.Bookmark{}),
				cmpopts.IgnoreFields(bpb.Bookmark{}, "state", "sizeCache", "unknownFields", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}
			if diff := cmp.Diff(got.Bookmark, tt.want.Bookmark, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}
		})
	}
}

func Test_UseCase_CreateBookmark(t *testing.T) {
	t.Parallel()

	bookmarkID, _ := uuid.NewRandom()

	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	userID1 := mockProfiles[0].ID

	test := map[string]struct {
		recordBookmarks    []entity.Bookmark
		arg                *bpb.CreateBookmarkRequest
		want               *bpb.Bookmark
		wantBookmarkRecord entity.Bookmark
		wantErrMsg         string
	}{
		"Success: create bookmark": {
			// recordBookmarks: []entity.Bookmark{},
			arg: &bpb.CreateBookmarkRequest{
				ArticleId: articleID1,
				UserId:    userID1,
				PlatformId: &wrapperspb.StringValue{
					Value: platformID1,
				},
				Title:        "title",
				Description:  "description",
				ArticleUrl:   "article_url",
				ThumbnailUrl: "thumbnail_url",
				PublishedAt: &timestamppb.Timestamp{
					Seconds: publishedAt,
				},
				PlatformName:       "platform_name_1",
				PlatformUrl:        "platform_url_1",
				PlatformFaviconUrl: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			want: &bpb.Bookmark{
				ArticleId: articleID1,
				UserId:    userID1,
				PlatformId: &wrapperspb.StringValue{
					Value: platformID1,
				},
				Title:              "title",
				Description:        "description",
				ArticleUrl:         "article_url",
				ThumbnailUrl:       "thumbnail_url",
				PublishedAt:        &timestamppb.Timestamp{Seconds: publishedAt},
				PlatformName:       "platform_name_1",
				PlatformUrl:        "platform_url_1",
				PlatformFaviconUrl: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			wantBookmarkRecord: entity.Bookmark{
				ArticleID: articleID1,
				UserID:    userID1,
				PlatformID: null.String{
					Valid:  true,
					String: platformID1,
				},
				Title:              "title",
				Description:        "description",
				ArticleURL:         "article_url",
				ThumbnailURL:       "thumbnail_url",
				PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
				PlatformName:       "platform_name_1",
				PlatformURL:        "platform_url_1",
				PlatformFaviconURL: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
		},
		"Success: create bookmark no platformId and publishedAt": {
			// recordBookmarks: []entity.Bookmark{},
			arg: &bpb.CreateBookmarkRequest{
				ArticleId:          articleID1,
				UserId:             userID1,
				Title:              "title",
				Description:        "description",
				ArticleUrl:         "article_url",
				ThumbnailUrl:       "thumbnail_url",
				PlatformName:       "platform_name_1",
				PlatformUrl:        "platform_url_1",
				PlatformFaviconUrl: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			want: &bpb.Bookmark{
				ArticleId:          articleID1,
				UserId:             userID1,
				Title:              "title",
				Description:        "description",
				ArticleUrl:         "article_url",
				ThumbnailUrl:       "thumbnail_url",
				PlatformName:       "platform_name_1",
				PlatformUrl:        "platform_url_1",
				PlatformFaviconUrl: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			wantBookmarkRecord: entity.Bookmark{
				ArticleID:          articleID1,
				UserID:             userID1,
				Title:              "title",
				Description:        "description",
				ArticleURL:         "article_url",
				ThumbnailURL:       "thumbnail_url",
				PlatformName:       "platform_name_1",
				PlatformURL:        "platform_url_1",
				PlatformFaviconURL: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
		},
		"Fail: same bookmark": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.CreateBookmarkRequest{
				ArticleId: articleID1,
				UserId:    userID1,
				PlatformId: &wrapperspb.StringValue{
					Value: platformID1,
				},
				Title:        "title",
				Description:  "description",
				ArticleUrl:   "article_url",
				ThumbnailUrl: "thumbnail_url",
				PublishedAt: &timestamppb.Timestamp{
					Seconds: publishedAt,
				},
				PlatformName:       "platform_name_1",
				PlatformUrl:        "platform_url_1",
				PlatformFaviconUrl: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			want: &bpb.Bookmark{},
			wantBookmarkRecord: entity.Bookmark{
				ArticleID: articleID1,
				UserID:    userID1,
				PlatformID: null.String{
					Valid:  true,
					String: platformID1,
				},
				Title:              "title",
				Description:        "description",
				ArticleURL:         "article_url",
				ThumbnailURL:       "thumbnail_url",
				PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
				PlatformName:       "platform_name_1",
				PlatformURL:        "platform_url_1",
				PlatformFaviconURL: "platform_favicon_url_1",
				IsEng:              true,
				IsRead:             false,
			},
			wantErrMsg: "bookmark already exists",
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

			testBookmarkRepository := persistence.NewBookmarkPersistence(db)
			testBookmarkPersistenceAdapter := persistence_adapter.NewBookmarkPersistenceAdapter(testBookmarkRepository)
			testBookmarkUseCase := NewBookmarkUseCase(testBookmarkPersistenceAdapter)

			if tt.recordBookmarks != nil {
				for _, v := range tt.recordBookmarks {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			got, err := testBookmarkUseCase.CreateBookmark(ctx, tt.arg)
			if err != nil {
				if tt.wantErrMsg == "" {
					t.Error(err)
					return
				}
				if diff := cmp.Diff(err.Error(), tt.wantErrMsg); diff != "" {
					t.Errorf("failed DeleteBookmark (-got +want):\n%s", diff)
				}
				return
			}
			optsPbBookmark := []cmp.Option{
				cmp.AllowUnexported(bpb.Bookmark{}),
				cmpopts.IgnoreFields(bpb.Bookmark{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}
			if diff := cmp.Diff(got.Bookmark, tt.want, optsPbBookmark...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}

			gotRecord, err := testBookmarkRepository.GetBookmarkByID(ctx, got.Bookmark.Id)
			if err != nil {
				t.Fatalf("Failed to get bookmark record: %s", err)
			}
			optBookmarkRecord := cmpopts.IgnoreFields(entity.Bookmark{}, "ID", "CreatedAt", "UpdatedAt")
			if diff := cmp.Diff(gotRecord, tt.wantBookmarkRecord, optBookmarkRecord); diff != "" {
				t.Fatalf("record is not expected: %s", diff)
			}
		})
	}
}

func Test_UseCase_DeleteBookmark(t *testing.T) {
	t.Parallel()

	bookmarkID, _ := uuid.NewRandom()
	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	userID1 := mockProfiles[0].ID

	differentBookmarkID, _ := uuid.NewRandom()
	differentUserID, _ := uuid.NewRandom()

	test := map[string]struct {
		recordBookmarks []entity.Bookmark
		arg             *bpb.DeleteBookmarkRequest
		want            *emptypb.Empty
		wantErr         string
	}{
		"Success: delete bookmark": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.DeleteBookmarkRequest{
				BookmarkId: bookmarkID.String(),
				UserId:     userID1,
			},
			want: &emptypb.Empty{},
		},
		"Fail: not delete bookmark different bookmarkId": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.DeleteBookmarkRequest{
				BookmarkId: differentBookmarkID.String(),
				UserId:     userID1,
			},
			want:    &emptypb.Empty{},
			wantErr: "bookmark does not exist",
		},
		"Fail: not delete bookmark different userId": {
			recordBookmarks: []entity.Bookmark{
				{
					ID:     bookmarkID.String(),
					UserID: userID1,
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:          articleID1,
					Title:              "title_1",
					Description:        "description_1",
					ArticleURL:         "article_url_1",
					PublishedAt:        null.TimeFrom(time.Unix(publishedAt, 0)),
					ThumbnailURL:       "thumbnail_url_1",
					PlatformName:       "platform_name_1",
					PlatformURL:        "platform_url_1",
					PlatformFaviconURL: "platform_favicon_url_1",
					IsEng:              true,
					IsRead:             false,
				},
			},
			arg: &bpb.DeleteBookmarkRequest{
				BookmarkId: bookmarkID.String(),
				UserId:     differentUserID.String(),
			},
			want:    &emptypb.Empty{},
			wantErr: "bookmark does not belong to the user",
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

			testBookmarkRepository := persistence.NewBookmarkPersistence(db)
			testBookmarkPersistenceAdapter := persistence_adapter.NewBookmarkPersistenceAdapter(testBookmarkRepository)
			testBookmarkUseCase := NewBookmarkUseCase(testBookmarkPersistenceAdapter)

			if tt.recordBookmarks != nil {
				for _, v := range tt.recordBookmarks {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert record: %s", err)
					}
				}
			}

			got, err := testBookmarkUseCase.DeleteBookmark(ctx, tt.arg)
			if err != nil {
				if tt.wantErr == "" {
					t.Error(err)
					return
				}
				if diff := cmp.Diff(err.Error(), tt.wantErr); diff != "" {
					t.Errorf("failed DeleteBookmark (-got +want):\n%s", diff)
				}
				return
			}
			opts := []cmp.Option{
				cmp.AllowUnexported(emptypb.Empty{}),
				cmpopts.IgnoreFields(emptypb.Empty{}, "state", "sizeCache", "unknownFields"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}

			if diff := cmp.Diff(got, tt.want, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}
		})
	}
}
