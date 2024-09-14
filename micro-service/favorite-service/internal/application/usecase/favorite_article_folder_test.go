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

// nolint
func Test_UseCase_GetFavoriteArticleFolders(t *testing.T) {
	t.Parallel()

	fafID1, _ := uuid.NewRandom()
	fafID2, _ := uuid.NewRandom()
	fafID3, _ := uuid.NewRandom()
	fafID4, _ := uuid.NewRandom()

	faID1, _ := uuid.NewRandom()
	faID2, _ := uuid.NewRandom()

	publishedAt := time.Now().Add(-time.Hour * 24 * 7).Unix()

	mockPlatforms := mock.GetPlatformMock()
	mockArticles := mock.GetArticleMock()
	mockProfiles := mock.GetProfileMock()

	platformID1 := mockPlatforms[0].ID
	articleID1 := mockArticles[0].ID
	articleID2 := mockArticles[1].ID
	userID1 := mockProfiles[0].ID
	userID2 := mockProfiles[1].ID

	test := map[string]struct {
		recordFavoriteArticleFolders []entity.FavoriteArticleFolder
		recordFavoriteArticles       []entity.FavoriteArticle
		arg                          *fpb.GetFavoriteArticleFoldersRequest
		want                         *fpb.GetFavoriteArticleFoldersResponse
		wantErrMsg                   string
	}{
		"Success": {
			recordFavoriteArticleFolders: []entity.FavoriteArticleFolder{
				{
					ID:     fafID1.String(),
					UserID: userID1,
					Title:  "faf_title1",
					Description: null.String{
						Valid:  true,
						String: "faf_description1",
					},
				},
				{
					ID:     fafID2.String(),
					UserID: userID1,
					Title:  "faf_title2",
					Description: null.String{
						Valid:  true,
						String: "faf_description2",
					},
				},
				{
					ID:     fafID3.String(),
					UserID: userID2,
					Title:  "faf_title3",
					Description: null.String{
						Valid:  true,
						String: "faf_description3",
					},
				},
				{
					ID:     fafID4.String(),
					UserID: userID1,
					Title:  "faf_title4",
					Description: null.String{
						Valid:  true,
						String: "faf_description4",
					},
				},
			},
			recordFavoriteArticles: []entity.FavoriteArticle{
				{
					ID:                      faID1.String(),
					UserID:                  userID1,
					FavoriteArticleFolderID: fafID1.String(),
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:   articleID1,
					Title:       "fa_title1",
					Description: "fa_description1",
					ArticleURL:  "https://example.com/article1",
					PublishedAt: null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName: null.String{
						Valid:  true,
						String: "author1",
					},
					Tags: null.String{
						Valid:  true,
						String: "tag1",
					},
					ThumbnailURL:       "https://example.com/thumbnail1",
					PlatformName:       "platform1",
					PlatformURL:        "https://example.com/platform1",
					PlatformFaviconURL: "https://example.com/favicon1",
					IsEng:              true,
					IsRead:             false,
				},
				{
					ID:                      faID2.String(),
					UserID:                  userID1,
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID2,
					Title:                   "fa_title2",
					Description:             "fa_description2",
					ArticleURL:              "https://example.com/article2",
					ThumbnailURL:            "https://example.com/thumbnail2",
					PlatformName:            "platform2",
					PlatformURL:             "https://example.com/platform2",
					PlatformFaviconURL:      "https://example.com/favicon2",
					IsEng:                   true,
					IsRead:                  false,
				},
			},
			arg: &fpb.GetFavoriteArticleFoldersRequest{
				UserId: userID1,
			},
			want: &fpb.GetFavoriteArticleFoldersResponse{
				FavoriteArticleFoldersEdge: []*fpb.FavoriteArticleFolderEdge{
					{
						Node: &fpb.FavoriteArticleFolder{
							Id:               fafID4.String(),
							UserId:           userID1,
							Title:            "faf_title4",
							Description:      "faf_description4",
							FavoriteArticles: []*fpb.FavoriteArticle{},
						},
						Cursor: fafID4.String(),
					},
					{
						Node: &fpb.FavoriteArticleFolder{
							Id:               fafID2.String(),
							UserId:           userID1,
							Title:            "faf_title2",
							Description:      "faf_description2",
							FavoriteArticles: []*fpb.FavoriteArticle{},
						},
						Cursor: fafID2.String(),
					},
					{
						Node: &fpb.FavoriteArticleFolder{
							Id:          fafID1.String(),
							UserId:      userID1,
							Title:       "faf_title1",
							Description: "faf_description1",
							FavoriteArticles: []*fpb.FavoriteArticle{
								{
									Id:                      faID1.String(),
									UserId:                  userID1,
									FavoriteArticleFolderId: fafID1.String(),
									PlatformId:              &wrapperspb.StringValue{Value: platformID1},
									ArticleId:               articleID1,
									Title:                   "fa_title1",
									Description:             "fa_description1",
									ArticleUrl:              "https://example.com/article1",
									PublishedAt:             &timestamppb.Timestamp{Seconds: publishedAt},
									AuthorName:              &wrapperspb.StringValue{Value: "author1"},
									Tags:                    &wrapperspb.StringValue{Value: "tag1"},
									ThumbnailUrl:            "https://example.com/thumbnail1",
									PlatformName:            "platform1",
									PlatformUrl:             "https://example.com/platform1",
									PlatformFaviconUrl:      "https://example.com/favicon1",
									IsEng:                   true,
									IsRead:                  false,
								},
								{
									Id:                      faID2.String(),
									UserId:                  userID1,
									FavoriteArticleFolderId: fafID1.String(),
									ArticleId:               articleID2,
									Title:                   "fa_title2",
									Description:             "fa_description2",
									ArticleUrl:              "https://example.com/article2",
									ThumbnailUrl:            "https://example.com/thumbnail2",
									PlatformName:            "platform2",
									PlatformUrl:             "https://example.com/platform2",
									PlatformFaviconUrl:      "https://example.com/favicon2",
									IsEng:                   true,
									IsRead:                  false,
								},
							},
						},
						Cursor: fafID1.String(),
					},
				},
				PageInfo: &fpb.PageInfo{
					HasNextPage: false,
					EndCursor:   fafID4.String(),
				},
			},
		},
		"Success: keyword": {
			recordFavoriteArticleFolders: []entity.FavoriteArticleFolder{
				{
					ID:     fafID1.String(),
					UserID: userID1,
					Title:  "faf_title1",
					Description: null.String{
						Valid:  true,
						String: "faf_description1",
					},
				},
				{
					ID:     fafID2.String(),
					UserID: userID1,
					Title:  "faf_title2",
					Description: null.String{
						Valid:  true,
						String: "faf_description2",
					},
				},
				{
					ID:     fafID3.String(),
					UserID: userID2,
					Title:  "faf_title3",
					Description: null.String{
						Valid:  true,
						String: "faf_description3",
					},
				},
				{
					ID:     fafID4.String(),
					UserID: userID1,
					Title:  "faf_title4",
					Description: null.String{
						Valid:  true,
						String: "faf_description4",
					},
				},
			},
			recordFavoriteArticles: []entity.FavoriteArticle{
				{
					ID:                      faID1.String(),
					UserID:                  userID1,
					FavoriteArticleFolderID: fafID1.String(),
					PlatformID: null.String{
						Valid:  true,
						String: platformID1,
					},
					ArticleID:   articleID1,
					Title:       "fa_title1",
					Description: "fa_description1",
					ArticleURL:  "https://example.com/article1",
					PublishedAt: null.TimeFrom(time.Unix(publishedAt, 0)),
					AuthorName: null.String{
						Valid:  true,
						String: "author1",
					},
					Tags: null.String{
						Valid:  true,
						String: "tag1",
					},
					ThumbnailURL:       "https://example.com/thumbnail1",
					PlatformName:       "platform1",
					PlatformURL:        "https://example.com/platform1",
					PlatformFaviconURL: "https://example.com/favicon1",
					IsEng:              true,
					IsRead:             false,
				},
				{
					ID:                      faID2.String(),
					UserID:                  userID1,
					FavoriteArticleFolderID: fafID1.String(),
					ArticleID:               articleID2,
					Title:                   "fa_title2",
					Description:             "fa_description2",
					ArticleURL:              "https://example.com/article2",
					ThumbnailURL:            "https://example.com/thumbnail2",
					PlatformName:            "platform2",
					PlatformURL:             "https://example.com/platform2",
					PlatformFaviconURL:      "https://example.com/favicon2",
					IsEng:                   true,
					IsRead:                  false,
				},
			},
			arg: &fpb.GetFavoriteArticleFoldersRequest{
				UserId:  userID1,
				Keyword: &wrapperspb.StringValue{Value: "e1"},
			},
			want: &fpb.GetFavoriteArticleFoldersResponse{
				FavoriteArticleFoldersEdge: []*fpb.FavoriteArticleFolderEdge{
					{
						Node: &fpb.FavoriteArticleFolder{
							Id:          fafID1.String(),
							UserId:      userID1,
							Title:       "faf_title1",
							Description: "faf_description1",
							FavoriteArticles: []*fpb.FavoriteArticle{
								{
									Id:                      faID1.String(),
									UserId:                  userID1,
									FavoriteArticleFolderId: fafID1.String(),
									PlatformId:              &wrapperspb.StringValue{Value: platformID1},
									ArticleId:               articleID1,
									Title:                   "fa_title1",
									Description:             "fa_description1",
									ArticleUrl:              "https://example.com/article1",
									PublishedAt:             &timestamppb.Timestamp{Seconds: publishedAt},
									AuthorName:              &wrapperspb.StringValue{Value: "author1"},
									Tags:                    &wrapperspb.StringValue{Value: "tag1"},
									ThumbnailUrl:            "https://example.com/thumbnail1",
									PlatformName:            "platform1",
									PlatformUrl:             "https://example.com/platform1",
									PlatformFaviconUrl:      "https://example.com/favicon1",
									IsEng:                   true,
									IsRead:                  false,
								},
								{
									Id:                      faID2.String(),
									UserId:                  userID1,
									FavoriteArticleFolderId: fafID1.String(),
									ArticleId:               articleID2,
									Title:                   "fa_title2",
									Description:             "fa_description2",
									ArticleUrl:              "https://example.com/article2",
									ThumbnailUrl:            "https://example.com/thumbnail2",
									PlatformName:            "platform2",
									PlatformUrl:             "https://example.com/platform2",
									PlatformFaviconUrl:      "https://example.com/favicon2",
									IsEng:                   true,
									IsRead:                  false,
								},
							},
						},
						Cursor: fafID1.String(),
					},
				},
				PageInfo: &fpb.PageInfo{
					HasNextPage: false,
					EndCursor:   fafID4.String(),
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

			testFavoriteArticleFolderRepository := persistence.NewFavoriteArticleFolderPersistence(db)
			testFavoriteArticleFolderPersistenceAdapter := persistenceadapter.NewFavoriteArticleFolderPersistenceAdapter(testFavoriteArticleFolderRepository)
			testFavoriteUsecase := NewFavoriteUseCase(testFavoriteArticleFolderPersistenceAdapter)

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

			got, err := testFavoriteUsecase.GetFavoriteArticleFolders(ctx, tt.arg)
			if err != nil {
				if tt.wantErrMsg == "" {
					t.Error(err)
					return
				}
				if diff := cmp.Diff(err.Error(), tt.wantErrMsg); diff != "" {
					t.Errorf("failed GetFavoriteArticleFolders (-got +want):\n%s", diff)
				}
				return
			}

			opts := []cmp.Option{
				cmp.AllowUnexported(fpb.GetFavoriteArticleFoldersResponse{}),
				cmp.AllowUnexported(fpb.PageInfo{}),
				cmp.AllowUnexported(fpb.FavoriteArticleFolderEdge{}),
				cmp.AllowUnexported(fpb.FavoriteArticleFolder{}),
				cmp.AllowUnexported(fpb.FavoriteArticle{}),
				cmpopts.IgnoreFields(fpb.GetFavoriteArticleFoldersResponse{}, "state", "sizeCache", "unknownFields"),
				cmpopts.IgnoreFields(fpb.PageInfo{}, "state", "sizeCache", "unknownFields"),
				cmpopts.IgnoreFields(fpb.FavoriteArticleFolderEdge{}, "state", "sizeCache", "unknownFields"),
				cmpopts.IgnoreFields(fpb.FavoriteArticleFolder{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreFields(fpb.FavoriteArticle{}, "state", "sizeCache", "unknownFields", "Id", "CreatedAt", "UpdatedAt"),
				cmpopts.IgnoreUnexported(wrapperspb.StringValue{}, timestamppb.Timestamp{}),
			}
			if diff := cmp.Diff(got.FavoriteArticleFoldersEdge, tt.want.FavoriteArticleFoldersEdge, opts...); diff != "" {
				t.Fatalf("request is not expected: %s", diff)
			}
		})
	}
}
