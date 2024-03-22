package database

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
	"log"
	"os"
)

func CreateFirestoreClient(ctx context.Context) (*firestore.Client, error) {
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
