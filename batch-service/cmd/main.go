package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/firestore/repository"
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

		}
	}(client)

	pr := repository.NewPlatformRepository(client)
	au := usecase.NewArticleUsecase(client, pr)
	err = au.CreateArticles(ctx, client)
	if err != nil {
		log.Fatalf("Failed to create articles: %v", err)
		return
	}
}
