package main

import (
	"context"
	"log"

	"github.com/YukiOnishi1129/techpicks/batch-service/cmd/migrate-seed/usecase"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Start migrate seed")
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

	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return
	}

	// do seeder
	u := usecase.NewUsecase(db)

	err = u.BatchMigrateSeed(ctx)
	if err != nil {
		log.Fatalf("Failed to migrate seed: %v", err)
		return
	}
}
