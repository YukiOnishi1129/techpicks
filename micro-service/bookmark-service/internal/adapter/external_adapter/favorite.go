package externaladapter

import (
	"context"

	fpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/favorite"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/external"
)

type FavoriteExternalAdapter interface {
	ListFavoriteArticleFoldersByArticleID(ctx context.Context, input *ListFavoriteArticleFoldersByArticleIDInputDTO) (*ListFavoriteArticleFoldersByArticleIDOutputDTO, error)
}

type favoriteExternalAdapter struct {
	favoriteExternal external.FavoriteExternal
}

func NewFavoriteExternalAdapter(fe external.FavoriteExternal) FavoriteExternalAdapter {
	return &favoriteExternalAdapter{
		favoriteExternal: fe,
	}
}

func (fea *favoriteExternalAdapter) ListFavoriteArticleFoldersByArticleID(ctx context.Context, input *ListFavoriteArticleFoldersByArticleIDInputDTO) (*ListFavoriteArticleFoldersByArticleIDOutputDTO, error) {
	req := &fpb.GetFavoriteArticleFoldersByArticleIdRequest{
		ArticleId: input.ArticleID,
		UserId:    input.UserID,
	}

	res, err := fea.favoriteExternal.ListFavoriteArticleFoldersByArticleID(ctx, req)
	if err != nil {
		return nil, err
	}

	fafs := make([]*FavoriteArticleFolderDTO, len(res.FavoriteArticleFoldersEdge))
	for i, faf := range res.FavoriteArticleFoldersEdge {
		fafs[i] = fea.convertFavoriteArticleFolderDTO(faf.Node)
	}

	return &ListFavoriteArticleFoldersByArticleIDOutputDTO{
		FavoriteArticleFolders: fafs,
		PageInfo: &PageInfoDTO{
			HasNextPage: res.PageInfo.HasNextPage,
			EndCursor:   res.PageInfo.EndCursor,
		},
	}, nil
}

func (fea *favoriteExternalAdapter) convertFavoriteArticleFolderDTO(faf *fpb.FavoriteArticleFolder) *FavoriteArticleFolderDTO {
	res := &FavoriteArticleFolderDTO{
		ID:          faf.Id,
		UserID:      faf.UserId,
		Title:       faf.Title,
		Description: faf.Description,
		CreatedAt:   faf.CreatedAt,
		UpdatedAt:   faf.UpdatedAt,
	}

	if len(faf.FavoriteArticles) > 0 {
		favoriteArticles := make([]*FavoriteArticleDTO, len(faf.FavoriteArticles))
		for i, fa := range faf.FavoriteArticles {
			favoriteArticles[i] = fea.convertFavoriteArticleFolderSliceDTO(fa)
		}
		res.FavoriteArticles = favoriteArticles
	}

	return res
}

func (fea *favoriteExternalAdapter) convertFavoriteArticleFolderSliceDTO(fa *fpb.FavoriteArticle) *FavoriteArticleDTO {
	res := &FavoriteArticleDTO{
		ID:                      fa.GetId(),
		ArticleID:               fa.GetArticleId(),
		FavoriteArticleFolderID: fa.GetFavoriteArticleFolderId(),
		UserID:                  fa.GetUserId(),
		Title:                   fa.GetTitle(),
		Description:             fa.GetDescription(),
		ThumbnailURL:            fa.GetThumbnailUrl(),
		ArticleURL:              fa.GetArticleUrl(),
		PlatformName:            fa.GetPlatformName(),
		PlatformURL:             fa.GetPlatformUrl(),
		PlatformFaviconURL:      fa.GetPlatformFaviconUrl(),
		IsEng:                   fa.GetIsEng(),
		IsRead:                  fa.GetIsRead(),
		CreatedAt:               fa.GetCreatedAt(),
		UpdatedAt:               fa.GetUpdatedAt(),
	}

	if fa.GetPlatformId() != nil {
		pID := fa.GetPlatformId().GetValue()
		res.PlatformID = &pID
	}
	if fa.GetPublishedAt() != nil {
		res.PublishedAt = fa.GetPublishedAt()
	}
	if fa.GetAuthorName() != nil {
		authorName := fa.GetAuthorName().GetValue()
		res.AuthorName = &authorName
	}
	if fa.GetTags() != nil {
		tags := fa.GetTags().GetValue()
		res.Tags = &tags
	}
	if fa.GetArticleComment() != nil {
		fac := fa.GetArticleComment()
		res.Comment = &ArticleCommentDTO{
			ID:        fac.GetId(),
			ArticleID: fac.GetArticleId(),
			UserID:    fac.GetUserId(),
			Comment:   fac.GetComment(),
			CreatedAt: fac.GetCreatedAt(),
			UpdatedAt: fac.GetUpdatedAt(),
		}
	}

	return res
}
