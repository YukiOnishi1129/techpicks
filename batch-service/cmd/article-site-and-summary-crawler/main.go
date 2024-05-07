package main

import (
	"context"
	"database/sql"
	"log"
	"os"

	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/article-site-and-summary-crawler/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/client"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
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

	rssClient := client.NewRSSClient()
	rr := repository.NewRepository(&repository.Params{
		RSSClient: rssClient,
	})

	u := usecase.NewUsecase(&usecase.Param{
		DB: db,
		Rr: rr,
	})

	err = u.BatchCrawlSiteAndSummaryArticleContents(ctx)
	if err != nil {
		log.Fatalf("Failed to create articles: %v", err)
		return
	}
}
