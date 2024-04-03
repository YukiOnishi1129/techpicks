package repository

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type ArticleRepositoryInterface interface {
	GetArticles(ctx context.Context, dto domain.GetArticlesInputDTO) ([]domain.Article, error)
	GetArticle(ctx context.Context, id string) (domain.Article, error)
	CreateArticle(ctx context.Context, article domain.CreateArticleInputDTO) (articleID string, err error)
	UpdateArticle(ctx context.Context, article domain.UpdateArticleInputDTO) error
	DeleteArticle(ctx context.Context, id string) error
}

type ArticleRepository struct {
	db *sql.DB
}

func NewArticleRepository(db *sql.DB) *ArticleRepository {
	return &ArticleRepository{
		db: db,
	}
}

func (ar *ArticleRepository) GetArticles(ctx context.Context, dto domain.GetArticlesInputDTO) ([]domain.Article, error) {
	q := make([]qm.QueryMod, 0)
	if dto.Title != nil {
		q = append(q, qm.Where("title = ?", *dto.Title))
	}
	if dto.ArticleURL != nil {
		q = append(q, qm.Where("article_url = ?", *dto.ArticleURL))
	}
	if dto.StartedAt != nil && dto.EndedAt != nil {
		q = append(q, qm.Where("published_at BETWEEN ? AND ?", dto.StartedAt, dto.EndedAt))
	}
	q = append(q, qm.Where("deleted_at IS NULL"))
	aRows, err := entity.Articles(q...).All(ctx, ar.db)
	if err != nil {
		return nil, err
	}
	resArticles := make([]domain.Article, len(aRows))
	for i, a := range aRows {
		resArticles[i] = convertDBtoArticleDomain(a)
	}
	return resArticles, nil
}

func (ar *ArticleRepository) GetArticle(ctx context.Context, id string) (domain.Article, error) {
	a, err := entity.Articles(qm.Where("id = ?", id), qm.Where("deleted_at IS NULL")).One(ctx, ar.db)
	if err != nil {
		return domain.Article{}, err

	}
	return convertDBtoArticleDomain(a), nil
}

func (ar *ArticleRepository) CreateArticle(ctx context.Context, article domain.CreateArticleInputDTO) (articleID string, err error) {
	a := entity.Article{
		Title:        article.Title,
		Description:  article.Description,
		ThumbnailURL: article.ThumbnailURL,
		ArticleURL:   article.ArticleURL,
		PublishedAt:  article.PublishedAt,
	}
	if article.IsPrivate != nil {
		a.IsPrivate = *article.IsPrivate
	}
	err = a.Insert(ctx, ar.db, boil.Infer())
	if err != nil {
		return "", err
	}
	return a.ID, nil
}

func (ar *ArticleRepository) UpdateArticle(ctx context.Context, article domain.UpdateArticleInputDTO) error {
	return nil
}

func (ar *ArticleRepository) DeleteArticle(ctx context.Context, id string) error {
	return nil
}

func convertDBtoArticleDomain(a *entity.Article) domain.Article {
	return domain.Article{
		ID:           a.ID,
		Title:        a.Title,
		Description:  a.Description,
		ThumbnailURL: a.ThumbnailURL,
		ArticleURL:   a.ArticleURL,
		PublishedAt:  a.PublishedAt,
		IsPrivate:    a.IsPrivate,
		CreatedAt:    a.CreatedAt,
		UpdatedAt:    a.UpdatedAt,
	}
}
