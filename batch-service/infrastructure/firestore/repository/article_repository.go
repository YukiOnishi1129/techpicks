package repository

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
)

type ArticleRepositoryInterface interface {
	GetArticles(ctx context.Context) ([]domain.Article, error)
	GetArticlesByPlatform(ctx context.Context, platformID string) ([]domain.Article, error)
	GetCountArticlesByLink(ctx context.Context, link string) (int, error)
}

type ArticleRepository struct {
	Client *firestore.Client
}

func NewArticleRepository(client *firestore.Client) *ArticleRepository {
	return &ArticleRepository{Client: client}
}

func (ar *ArticleRepository) GetArticles(ctx context.Context) ([]domain.Article, error) {
	iter := ar.Client.Collection("articles").Documents(ctx)
	var articles []domain.Article
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		articles = append(articles, convertFirestoreToArticle(doc))
	}
	return articles, nil
}

func (ar *ArticleRepository) GetArticlesByPlatform(ctx context.Context, platformID string) ([]domain.Article, error) {
	iter := ar.Client.Collection("articles").Where("platform_id", "==", platformID).Documents(ctx)
	var articles []domain.Article
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		articles = append(articles, convertFirestoreToArticle(doc))
	}
	return articles, nil
}

func (ar *ArticleRepository) GetCountArticlesByLink(ctx context.Context, link string) (int, error) {
	iter := ar.Client.Collection("articles").Where("article_url", "==", link).Documents(ctx)
	var count int
	for {
		_, err := iter.Next()
		if err != nil {
			break
		}
		count++
	}
	return count, nil
}

func convertFirestoreToArticle(doc *firestore.DocumentSnapshot) domain.Article {
	data := doc.Data()
	platformType := data["platform_type"].(int64)
	article := domain.Article{
		ID:           doc.Ref.ID,
		Title:        data["title"].(string),
		Description:  data["description"].(string),
		ThumbnailURL: data["thumbnail_url"].(string),
		ArticleURL:   data["article_url"].(string),
		Published:    data["published"].(string),
		Platform: domain.ArticlePlatform{
			ID:           data["platform_id"].(string),
			Name:         data["platform_name"].(string),
			PlatformType: domain.PlatformType(platformType),
			SiteURL:      data["platform_site_url"].(string),
		},
		IsEng:     data["is_eng"].(bool),
		IsPrivate: data["is_private"].(bool),
		CreatedAt: data["created_at"].(string),
		UpdatedAt: data["updated_at"].(string),
	}
	if data["deleted_at"] != nil {
		deletedAt := data["deleted_at"].(string)
		article.DeletedAt = &deletedAt
	}
	return article
}
