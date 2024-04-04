package main

import (
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/YukiOnishi1129/techpicks/batch-service/database/seed/seeders"
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
	is := seeders.NewInitSeed(db)

	err = is.SeedInitData(ctx)
	if err != nil {
		log.Fatalf("Failed to insert: %v", err)
		return
	}
}
