package usecase

import (
	"context"
	"testing"
	"time"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util/testutil"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/util/testutil/mock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/volatiletech/null/v8"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func Test_UseCase_CreateBookmark(t *testing.T) {
	t.Parallel()

	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	userID1 := mockProfiles[0].ID

	test := map[string]struct {
		// recordBookmarks []entity.Bookmark
		arg                *bpb.CreateBookmarkRequest
		want               *bpb.Bookmark
		wantBookmarkRecord entity.Bookmark
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
			testBookmarkAdapter := adapter.NewBookmarkAdapter(testBookmarkRepository)
			testBookmarkUseCase := NewBookmarkUseCase(testBookmarkAdapter)

			got, err := testBookmarkUseCase.CreateBookmark(ctx, tt.arg)
			if err != nil {
				t.Fatalf("Failed to create bookmark: %s", err)
			}
			optsPbBookmark := []cmp.Option{
				cmp.AllowUnexported(bpb.Bookmark{}),
				cmpopts.IgnoreFields(bpb.Bookmark{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				// cmpopts.IgnoreUnexported(bpb.Bookmark{}),
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
