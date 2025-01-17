package usecase

import (
	"context"
	"testing"
	"time"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
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

func Test_UpsertArticleComment(t *testing.T) {
	t.Parallel()

	articleCommentID1, _ := uuid.NewRandom()
	articleID, _ := uuid.NewRandom()
	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()
	mockPlatforms := mock.GetPlatformMock()
	mockProfiles := mock.GetProfileMock()
	userID1 := mockProfiles[0].ID

	test := map[string]struct {
		recordArticles        []entity.Article
		recordArticleComments []entity.ArticleComment
		arg                   *cpb.UpsertArticleCommentRequest
		want                  *cpb.UpsertArticleCommentResponse
		wantErrMsg            string
	}{
		"succeed to inset article comment": {
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
			arg: &cpb.UpsertArticleCommentRequest{
				UserId:    userID1,
				ArticleId: articleID.String(),
				Comment:   "test comment",
			},
			want: &cpb.UpsertArticleCommentResponse{
				Comment: &cpb.ArticleComment{
					// Id:        "test_article_comment_id",
					UserId:    userID1,
					ArticleId: articleID.String(),
					Comment:   "test comment",
				},
			},
		},
		"succeed to update article comment": {
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
			recordArticleComments: []entity.ArticleComment{
				{
					ID:        articleCommentID1.String(),
					UserID:    userID1,
					ArticleID: articleID.String(),
					Comment:   "test comment",
				},
			},
			arg: &cpb.UpsertArticleCommentRequest{
				Id:        wrapperspb.String(articleCommentID1.String()),
				UserId:    userID1,
				ArticleId: articleID.String(),
				Comment:   "test comment1111",
			},
			want: &cpb.UpsertArticleCommentResponse{
				Comment: &cpb.ArticleComment{
					// Id:        articleCommentID1.String(),
					UserId:    userID1,
					ArticleId: articleID.String(),
					Comment:   "test comment1111",
				},
			},
		},
		"failed to update article comment as not exited article comment": {
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
			arg: &cpb.UpsertArticleCommentRequest{
				Id:        wrapperspb.String(articleCommentID1.String()),
				UserId:    userID1,
				ArticleId: articleID.String(),
				Comment:   "test comment",
			},
			want: &cpb.UpsertArticleCommentResponse{
				Comment: &cpb.ArticleComment{
					// Id:        "test_article_comment_id",
					UserId:    userID1,
					ArticleId: articleID.String(),
					Comment:   "test comment",
				},
			},
			wantErrMsg: "comment does not exist as update target",
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

			// mockBookmarkClient.EXPECT().GetBookmarkByArticleID(gomock.Any(), &bpb.GetBookmarkByArticleIDRequest{
			// 	ArticleId: "test articleId",
			// 	UserId:    "test userId",
			// }).Return(&bpb.GetBookmarkResponse{
			// 	Bookmark: &bpb.Bookmark{},
			// }, nil).AnyTimes()

			mockFavoriteClient := mock.NewMockFavoriteServiceClient(ctrl)
			// mockFavoriteClient.EXPECT().GetFavoriteArticleFoldersByArticleId(gomock.Any(), gomock.Any()).Return(&fpb.GetFavoriteArticleFoldersResponse{
			// 	FavoriteArticleFoldersEdge: []*fpb.FavoriteArticleFolderEdge{},
			// }, nil).AnyTimes()

			testArticleRepository := persistence.NewArticlePersistence(db)
			testFeedRepository := persistence.NewFeedPersistence(db)
			testArticleCommentRepository := persistence.NewArticleCommentPersistence(db)
			testBookmarkExternal := external.NewBookmarkExternal(mockBookmarkClient)
			testFavoriteExternal := external.NewFavoriteExternal(mockFavoriteClient)

			testArticlePersistenceAdapter := persistenceadapter.NewArticlePersistenceAdapter(testArticleRepository)
			testFeedPersistenceAdapter := persistenceadapter.NewFeedPersistenceAdapter(testFeedRepository)
			testArticleCommentPersistenceAdapter := persistenceadapter.NewArticleCommentPersistenceAdapter(testArticleCommentRepository)
			testBookmarkExternalAdapter := externaladapter.NewBookmarkExternalAdapter(testBookmarkExternal)
			testFavoriteExternalAdapter := externaladapter.NewFavoriteExternalAdapter(testFavoriteExternal)

			testContentUseCase := NewContentUseCase(testArticlePersistenceAdapter, testFeedPersistenceAdapter, testArticleCommentPersistenceAdapter, testBookmarkExternalAdapter, testFavoriteExternalAdapter)

			if tt.recordArticles != nil {
				for _, v := range tt.recordArticles {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert article: %s", err)
					}
				}
			}

			if tt.recordArticleComments != nil {
				for _, v := range tt.recordArticleComments {
					err = v.Insert(ctx, db, boil.Infer())
					if err != nil {
						t.Fatalf("Failed to insert article comment: %s", err)
					}
				}
			}

			got, err := testContentUseCase.UpsertArticleComment(ctx, tt.arg)
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
				cmp.AllowUnexported(cpb.ArticleComment{}),
				cmpopts.IgnoreFields(cpb.ArticleComment{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}

			if diff := cmp.Diff(got.Comment, tt.want.Comment, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}
		})

	}
}
