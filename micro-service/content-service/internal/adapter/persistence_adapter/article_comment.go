package persistenceadapter

import (
	"context"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/repository"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleCommentPersistenceAdapter interface {
	UpsertArticleComment(ctx context.Context, input UpsertArticleCommentAdapterInputDTO) (*entity.ArticleComment, error)
	DeleteArticleComment(ctx context.Context, input DeleteArticleCommentAdapterInputDTO) error
}

type articleCommentPersistenceAdapter struct {
	articleCommentRepository repository.ArticleCommentRepository
}

func NewArticleCommentPersistenceAdapter(articleCommentRepository repository.ArticleCommentRepository) ArticleCommentPersistenceAdapter {
	return &articleCommentPersistenceAdapter{
		articleCommentRepository: articleCommentRepository,
	}
}

func (ap *articleCommentPersistenceAdapter) UpsertArticleComment(ctx context.Context, input UpsertArticleCommentAdapterInputDTO) (*entity.ArticleComment, error) {
	articleComment := entity.ArticleComment{
		UserID:    input.UserID,
		ArticleID: input.ArticleID,
		Comment:   input.Comment,
	}

	if input.ID != nil {
		articleComment.ID = *input.ID
		if err := ap.articleCommentRepository.UpdateArticleComment(ctx, articleComment); err != nil {
			return nil, err
		}
	} else {
		println("🔥")
		println(articleComment.UserID)
		acID, _ := uuid.NewUUID()
		articleComment.ID = acID.String()
		if err := ap.articleCommentRepository.CreateArticleComment(ctx, articleComment); err != nil {
			return nil, err
		}
	}

	res, err := ap.articleCommentRepository.GetArticleCommentByID(ctx, articleComment.ID, nil)
	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (ap *articleCommentPersistenceAdapter) DeleteArticleComment(ctx context.Context, input DeleteArticleCommentAdapterInputDTO) error {
	q := []qm.QueryMod{
		qm.Where("user_id = ?", input.UserID),
	}
	articleComment, err := ap.articleCommentRepository.GetArticleCommentByID(ctx, input.ID, q)
	if err != nil {
		return err
	}
	if articleComment.ID == "" {
		return nil
	}

	if err := ap.articleCommentRepository.DeleteArticleComment(ctx, articleComment); err != nil {
		return err
	}

	return nil
}
