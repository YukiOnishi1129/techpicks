package persistenceadapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type BookmarkPersistenceAdapter interface {
	ListBookmark(ctx context.Context, req *ListBookmarkInputDTO) (*ListBookmarkOutputDTO, error)
	GetBookmarkByID(ctx context.Context, input *GetBookmarkByIDInputDTO) (*GetBookmarkByIDOutputDTO, error)
	GetBookmarkByArticleID(ctx context.Context, input *GetBookmarkByArticleIDInputDTO) (*GetBookmarkByArticleIDOutputDTO, error)
	GetBookmarkByArticleURL(ctx context.Context, input *GetBookmarkByArticleURLInputDTO) (*GetBookmarkByArticleURLOutputDTO, error)
	CreateBookmark(ctx context.Context, input *CreateBookmarkInputDTO) (*CreateBookmarkOutputDTO, error)
	CreateBookmarkForUploadArticle(ctx context.Context, input *CreateBookmarkForUploadArticleInputDTO) (*CreateBookmarkForUploadArticleOutputDTO, error)
	DeleteBookmark(ctx context.Context, input *DeleteBookmarkInputDTO) error
}

type bookmarkPersistenceAdapter struct {
	BookmarkRepository repository.BookmarkRepository
}

func NewBookmarkPersistenceAdapter(br repository.BookmarkRepository) BookmarkPersistenceAdapter {
	return &bookmarkPersistenceAdapter{
		BookmarkRepository: br,
	}
}

func (bpa *bookmarkPersistenceAdapter) ListBookmark(ctx context.Context, input *ListBookmarkInputDTO) (*ListBookmarkOutputDTO, error) {
	limit := 20
	if input.Limit != 0 {
		limit = int(input.Limit)
	}

	q := []qm.QueryMod{
		qm.Where("user_id = ?", input.UserID),
		qm.OrderBy("created_at DESC"),
		qm.Limit(limit),
	}

	if input.Cursor != "" {
		q = append(q, qm.Where("created_at < (SELECT created_at FROM bookmarks WHERE id = ?)", input.Cursor))
	}

	if input.Keywords != nil && len(input.Keywords) > 0 {
		for _, keyword := range input.Keywords {
			q = append(q, qm.Expr(
				qm.And("title ILIKE ?", "%"+keyword+"%"),
				qm.Or("description ILIKE ?", "%"+keyword+"%"),
			))
		}
	}

	res, err := bpa.BookmarkRepository.ListBookmark(ctx, q)
	if err != nil {
		return &ListBookmarkOutputDTO{}, err
	}

	outBookmarks := make([]*BookmarkDTO, len(res))
	for _, b := range res {
		outBookmarks = append(outBookmarks, bpa.convertPBBookmark(b))
	}

	return &ListBookmarkOutputDTO{
		Bookmarks: outBookmarks,
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByID(ctx context.Context, input *GetBookmarkByIDInputDTO) (*GetBookmarkByIDOutputDTO, error) {
	b, err := bpa.BookmarkRepository.GetBookmarkByID(ctx, input.ID)
	if err != nil {
		return &GetBookmarkByIDOutputDTO{}, err
	}
	output := bpa.convertPBBookmark(&b)
	return &GetBookmarkByIDOutputDTO{
		Bookmark: output,
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByArticleID(ctx context.Context, input *GetBookmarkByArticleIDInputDTO) (*GetBookmarkByArticleIDOutputDTO, error) {
	q := []qm.QueryMod{
		qm.Where("article_id = ?", input.ArticleID),
		qm.Where("user_id = ?", input.UserID),
	}
	b, err := bpa.BookmarkRepository.GetBookmark(ctx, q)
	if err != nil {
		return &GetBookmarkByArticleIDOutputDTO{}, err
	}
	output := bpa.convertPBBookmark(&b)
	return &GetBookmarkByArticleIDOutputDTO{
		Bookmark: output,
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) GetBookmarkByArticleURL(ctx context.Context, input *GetBookmarkByArticleURLInputDTO) (*GetBookmarkByArticleURLOutputDTO, error) {
	q := []qm.QueryMod{
		qm.Where("article_url = ?", input.ArticleURL),
		qm.Where("user_id = ?", input.UserID),
	}
	b, err := bpa.BookmarkRepository.GetBookmark(ctx, q)
	if err != nil {
		return &GetBookmarkByArticleURLOutputDTO{}, err
	}
	output := bpa.convertPBBookmark(&b)
	return &GetBookmarkByArticleURLOutputDTO{
		Bookmark: output,
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) CreateBookmark(ctx context.Context, input *CreateBookmarkInputDTO) (*CreateBookmarkOutputDTO, error) {
	bookmarkID, _ := uuid.NewUUID()
	bookmark := entity.Bookmark{
		ID:                 bookmarkID.String(),
		ArticleID:          input.ArticleID,
		UserID:             input.UserID,
		Title:              input.Title,
		Description:        input.Description,
		ArticleURL:         input.ArticleURL,
		ThumbnailURL:       input.ThumbnailURL,
		PlatformName:       input.PlatformName,
		PlatformURL:        input.PlatformURL,
		PlatformFaviconURL: input.PlatformFaviconURL,
		IsEng:              input.IsEng,
		IsRead:             input.IsRead,
	}

	if input.PlatformID != nil {
		bookmark.PlatformID.String = *input.PlatformID
		bookmark.PlatformID.Valid = true
	}
	if input.PublishedAt != nil {
		bookmark.PublishedAt.Time = input.PublishedAt.AsTime()
		bookmark.PublishedAt.Valid = true
	}

	if err := bpa.BookmarkRepository.CreateBookmark(ctx, bookmark); err != nil {
		return &CreateBookmarkOutputDTO{}, err
	}

	b, err := bpa.BookmarkRepository.GetBookmarkByID(ctx, bookmark.ID)
	if err != nil {
		return &CreateBookmarkOutputDTO{}, err
	}
	return &CreateBookmarkOutputDTO{
		Bookmark: bpa.convertPBBookmark(&b),
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) CreateBookmarkForUploadArticle(ctx context.Context, input *CreateBookmarkForUploadArticleInputDTO) (*CreateBookmarkForUploadArticleOutputDTO, error) {
	bookmarkID, _ := uuid.NewUUID()
	article := input.Article
	bookmark := entity.Bookmark{
		ID:           bookmarkID.String(),
		ArticleID:    article.ID,
		UserID:       input.UserID,
		Title:        article.Title,
		Description:  article.Description,
		ArticleURL:   article.ArticleURL,
		ThumbnailURL: article.ThumbnailURL,
		IsEng:        article.IsEng,
		IsRead:       false,
	}
	if article.PublishedAt != nil {
		bookmark.PublishedAt.Time = article.PublishedAt.AsTime()
		bookmark.PublishedAt.Valid = true
	}

	if article.Platform != nil {
		bookmark.PlatformID.String = article.Platform.ID
		bookmark.PlatformID.Valid = true
		bookmark.PlatformName = article.Platform.Name
		bookmark.PlatformURL = article.Platform.SiteURL
		bookmark.PlatformFaviconURL = article.Platform.FaviconURL
	} else {
		bookmark.PlatformName = input.PlatformName
		bookmark.PlatformURL = input.PlatformURL
		bookmark.PlatformFaviconURL = input.PlatformFaviconURL
	}

	if err := bpa.BookmarkRepository.CreateBookmark(ctx, bookmark); err != nil {
		return &CreateBookmarkForUploadArticleOutputDTO{}, err
	}

	b, err := bpa.BookmarkRepository.GetBookmarkByID(ctx, bookmark.ID)
	if err != nil {
		return &CreateBookmarkForUploadArticleOutputDTO{}, err
	}

	return &CreateBookmarkForUploadArticleOutputDTO{
		Bookmark: bpa.convertPBBookmark(&b),
	}, nil
}

func (bpa *bookmarkPersistenceAdapter) DeleteBookmark(ctx context.Context, input *DeleteBookmarkInputDTO) error {
	b, err := bpa.BookmarkRepository.GetBookmarkByID(ctx, input.ID)
	if err != nil {
		return err
	}
	if b.UserID != input.UserID {
		return entity.ErrSyncFail
	}
	return bpa.BookmarkRepository.DeleteBookmark(ctx, b)
}

func (bpa *bookmarkPersistenceAdapter) convertPBBookmark(b *entity.Bookmark) *BookmarkDTO {
	if b.ID == "" {
		return &BookmarkDTO{}
	}
	resB := &BookmarkDTO{
		ID:                 b.ID,
		UserID:             b.UserID,
		ArticleID:          b.ArticleID,
		Title:              b.Title,
		Description:        b.Description,
		ArticleURL:         b.ArticleURL,
		ThumbnailURL:       b.ThumbnailURL,
		PlatformName:       b.PlatformName,
		PlatformURL:        b.PlatformURL,
		PlatformFaviconURL: b.PlatformFaviconURL,
		IsEng:              b.IsEng,
		IsRead:             b.IsRead,
		CreatedAt:          timestamppb.New(b.CreatedAt),
		UpdatedAt:          timestamppb.New(b.UpdatedAt),
	}
	if b.PlatformID.Valid {
		pID := b.PlatformID.String
		resB.PlatformID = &pID
	}
	if b.PublishedAt.Valid {
		resB.PublishedAt = timestamppb.New(b.PublishedAt.Time)
	}
	return resB
}
