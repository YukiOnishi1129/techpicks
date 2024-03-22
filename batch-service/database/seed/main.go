package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/YukiOnishi1129/techpicks/batch-service/database"
	"github.com/YukiOnishi1129/techpicks/batch-service/database/seed/seeders"
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

	pr := repository.NewPlatformRepository(client)

	// do seeder
	ps := seeders.NewPlatformSeed(pr)

	err = ps.SeedPlatform(ctx)
	if err != nil {
		return
	}

	//err = seeders.SeedPlatform(ctx, client)
	//if err != nil {
	//	log.Fatalf("Failed to seed platform: %v", err)
	//	return
	//}

	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)
}
