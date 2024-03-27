package usecase

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/firestore/repository"
	"github.com/google/uuid"
	"log"
	"sync"
	"time"
)

type ArticleUsecaseInterface interface {
	CreateArticles(ctx context.Context, client *firestore.Client) error
}

type ArticleUsecase struct {
	client *firestore.Client
	pr     *repository.PlatformRepository
	ar     *repository.ArticleRepository
}

func NewArticleUsecase(client *firestore.Client, pr *repository.PlatformRepository, ar *repository.ArticleRepository) *ArticleUsecase {
	return &ArticleUsecase{
		client: client,
		pr:     pr,
		ar:     ar,
	}
}

func (au *ArticleUsecase) CreateArticles(ctx context.Context, client *firestore.Client) error {
	now := time.Now()
	// get platforms
	platforms, err := au.pr.GetPlatforms(ctx)
	if err != nil {
		return err
	}
	for _, p := range platforms {
		var wg sync.WaitGroup
		rss, err := GetRSS(p.RssURL)
		articles, err := au.ar.GetArticlesByPlatform(ctx, p.ID)
		if err != nil {
			continue
		}
		if err != nil {
			return err
		}
		wg.Add(1)
		go createArticles(ctx, client, &wg, articles, rss, p)
		wg.Wait()
	}

	end := time.Now()
	diff := end.Sub(now)
	log.Printf("【end create article all】: %s", diff)
	return nil
}

func createArticles(ctx context.Context, client *firestore.Client, wg *sync.WaitGroup, articles []domain.Article, rss []RSS, p domain.Platform) {
	log.Printf("【start create article】: %s", p.Name)
	defer wg.Done()
	batch := client.BulkWriter(ctx)
	aCount := 0

	for _, r := range rss {
		isSkip := false
		for _, article := range articles {
			if article.ArticleURL == r.Link {
				isSkip = true
				break
			}
		}
		if isSkip {
			log.Printf("【skip create article】: %s", r.Title)
			continue
		}

		articleID, err := uuid.NewUUID()
		if err != nil {
			continue
		}
		now := time.Now().Unix()
		ref := client.Collection("articles").Doc(articleID.String())
		_, err = batch.Set(ref, domain.ArticleFirestore{
			Title:           r.Title,
			Description:     r.Description,
			ThumbnailURL:    r.Image,
			ArticleURL:      r.Link,
			PublishedAt:     r.PublishedAt,
			PlatformID:      p.ID,
			PlatformName:    p.Name,
			PlatformSiteURL: p.SiteURL,
			PlatformType:    p.PlatformType,
			IsEng:           p.IsEng,
			IsPrivate:       false,
			CreatedAt:       int(now),
			UpdatedAt:       int(now),
			DeletedAt:       nil,
		})
		if err != nil {
			continue
		}
		aCount++
	}
	batch.Flush()
	log.Printf("【end create article】: %s", p.Name)
	log.Printf("【article count】: %d", aCount)
}
