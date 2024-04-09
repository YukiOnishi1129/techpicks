package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	ctx := context.Background()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
	client, err := database.CreateFirestoreClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {
			log.Fatalf("Failed to close client: %v", err)
			return
		}
	}(client)

	//initializer.Init()
	//rss := usecase.GetRSS("")
	//
	//println(len(rss))

	//articles := make([]domain.Article, len(rss))

	//for _, r := range rss {
	//	articleID, err := uuid.NewUUID()
	//	if err != nil {
	//		continue
	//	}
	//	createdAt := time.Now().Format("2006-01-02T15:04:05Z")
	//	platformID, err := uuid.NewUUID()
	//	if err != nil {
	//		continue
	//	}
	//
	//	articles := ArticleFirestore{
	//		Title:           r.Title,
	//		Description:     r.Description,
	//		ThumbnailURL:    r.Image,
	//		ArticleURL:      r.Link,
	//		Published:       r.Published,
	//		PlatformID:      platformID.String(),
	//		PlatformName:    "メルカリ",
	//		PlatformSiteURL: "https://engineering.mercari.com/blog",
	//		PlatformType:    domain.PlatformTypeCompany,
	//		IsEng:           false,
	//		IsPrivate:       false,
	//		CreatedAt:       createdAt,
	//		UpdatedAt:       createdAt,
	//		DeletedAt:       nil,
	//	}
	//
	//	_, err = client.Collection("articles").Doc(articleID.String()).Set(ctx, articles)
	//	if err != nil {
	//		return
	//	}
	//}
}
