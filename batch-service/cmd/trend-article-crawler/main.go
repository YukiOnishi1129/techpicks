package main

import (
	"context"
	"database/sql"
	"log"
	"os"

	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/trend-article-crawler/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	apiClient "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"
	apiRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
	rssClient "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/client"
	rssRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Start batch service")
	ctx := context.Background()
	if os.Getenv("GO_ENV") != "production" && os.Getenv("GO_ENV") != "staging"{
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("Error loading .env file")
			return
		}
	}
	

	db, err := database.Init()
	if err != nil {
		log.Fatalf("Failed to init db: %v", err)
		return
	}
	defer func(db *sql.DB) {
		err = db.Close()
		if err != nil {
			log.Fatalf("Failed to close db connection: %v", err)
		}
	}(db)

	rClient := rssClient.NewRSSClient()
	aClient := apiClient.NewAPIClient()
	rr := rssRepository.NewRepository(&rssRepository.Params{
		RSSClient: rClient,
	})
	air := apiRepository.NewRepository(&apiRepository.Params{
		APIClient: aClient,
	})

	u := usecase.NewUsecase(&usecase.Param{
		DB:  db,
		Air: air,
		Rr:  rr,
	})

	err = u.BatchCrawlTrendArticleContents(ctx)
	if err != nil {
		log.Fatalf("Failed to create articles: %v", err)
		return
	}
}
