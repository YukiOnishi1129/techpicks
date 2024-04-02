package main

import (
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	log.Printf("Start batch service")
	//ctx := context.Background()
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
		err := db.Close()
		if err != nil {

		}
	}(db)

	//pr := repository.NewPlatformRepository(client)
	//ar := repository.NewArticleRepository(client)
	//au := usecase.NewArticleUsecase(client, pr, ar)
	//
	//err = au.CreateArticles(ctx, client)
	//if err != nil {
	//	log.Fatalf("Failed to create articles: %v", err)
	//	return
	//}
}
