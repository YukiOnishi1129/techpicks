package repository

import (
	"cloud.google.com/go/firestore"
	"context"
)

type ArticleRepositoryInterface interface {
	GetCountArticlesByLink(ctx context.Context, link string) (int, error)
}

type ArticleRepository struct {
	Client *firestore.Client
}

func NewArticleRepository(client *firestore.Client) *ArticleRepository {
	return &ArticleRepository{Client: client}
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
