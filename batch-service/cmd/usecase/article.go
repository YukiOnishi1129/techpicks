package usecase

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/firestore/repository"
	"github.com/google/uuid"
	"log"
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

type ArticleFirestore struct {
	Title           string              `firestore:"title"`
	Description     string              `firestore:"description"`
	ThumbnailURL    string              `firestore:"thumbnail_url"`
	ArticleURL      string              `firestore:"article_url"`
	Published       string              `firestore:"published"`
	PlatformID      string              `firestore:"platform_id"`
	PlatformName    string              `firestore:"platform_name"`
	PlatformType    domain.PlatformType `firestore:"platform_type"`
	PlatformSiteURL string              `firestore:"platform_site_url"`
	IsEng           bool                `firestore:"is_eng"`
	IsPrivate       bool                `firestore:"is_private"`
	CreatedAt       string              `firestore:"created_at"`
	UpdatedAt       string              `firestore:"updated_at"`
	DeletedAt       *string             `firestore:"deleted_at"`
}

func (au *ArticleUsecase) CreateArticles(ctx context.Context, client *firestore.Client) error {
	// get platforms
	platforms, err := au.pr.GetPlatforms(ctx)
	if err != nil {
		return err
	}

	for _, p := range platforms {
		rss, err := GetRSS(p.RssURL)
		if err != nil {
			return err
		}
		go func(rss []RSS) {
			err := func(rss []RSS) error {
				log.Printf("【start create article】: %s", p.Name)
				batch := client.BulkWriter(ctx)

				aCount := 0
				for _, r := range rss {
					// confirm same article
					count, err := au.ar.GetCountArticlesByLink(ctx, r.Link)
					if count > 0 {

						log.Printf("【skip create article】: %s", r.Title)
						continue
					}
					articleID, err := uuid.NewUUID()
					if err != nil {
						return err
					}
					createdAt := time.Now().Format("2006-01-02T15:04:05Z")
					ref := client.Collection("articles").Doc(articleID.String())
					_, err = batch.Set(ref, ArticleFirestore{
						Title:           r.Title,
						Description:     r.Description,
						ThumbnailURL:    r.Image,
						ArticleURL:      r.Link,
						Published:       r.Published,
						PlatformID:      p.ID,
						PlatformName:    p.Name,
						PlatformSiteURL: p.SiteURL,
						PlatformType:    p.PlatformType,
						IsEng:           p.IsEng,
						IsPrivate:       false,
						CreatedAt:       createdAt,
						UpdatedAt:       createdAt,
						DeletedAt:       nil,
					})
					if err != nil {
						return err
					}
					aCount++
				}
				batch.Flush()
				log.Printf("【end create article】: %s", p.Name)
				log.Printf("【article count】: %d", aCount)
				return nil
			}(rss)
			if err != nil {
			}
		}(rss)

	}
	return nil
}
