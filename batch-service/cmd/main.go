package main

import (
	"context"
	"database/sql"
	"log"

	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/joho/godotenv"
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

	au := usecase.NewArticleUsecase(db)

	err = au.BatchCreateArticles(ctx)
	if err != nil {
		log.Fatalf("Failed to create articles: %v", err)
		return
	}
}
