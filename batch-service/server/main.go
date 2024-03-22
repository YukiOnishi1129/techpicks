package main

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
	"log"
	"os"
)

func main() {
	ctx := context.Background()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
	client, err := createClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	//initializer.Init()
	//rss := usecase.GetRSS()
	//println("【rss count】: ", len(rss))
}

func createClient(ctx context.Context) (*firestore.Client, error) {
	opt := option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_CREDENTIALS_JSON")))
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return nil, err
	}
	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return nil, err
	}
	return client, nil
}
