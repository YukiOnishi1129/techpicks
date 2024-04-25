package main

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/article-site-and-summary-crawler/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	log.Printf("Start batch service")
	ctx := context.Background()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
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

	rr := repository.NewRSSRepository()

	u := usecase.NewUsecase(&usecase.Param{
		Db: db,
		Rr: rr,
	})

	err = u.BatchCrawlArticleContents(ctx)
	if err != nil {
		log.Fatalf("Failed to create articles: %v", err)
		return
	}
}
