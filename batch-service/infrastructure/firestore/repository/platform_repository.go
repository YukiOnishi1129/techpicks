package repository

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
)

type PlatformRepositoryInterface interface {
	CreatePlatform(ctx context.Context, arg domain.Platform) error
}

type PlatformRepository struct {
	client *firestore.Client
}

func NewPlatformRepository(client *firestore.Client) *PlatformRepository {
	return &PlatformRepository{client: client}
}

type platformFirestore struct {
	Name         string  `firestore:"name"`
	RssUrl       string  `firestore:"rss_url"`
	ThumbnailUrl string  `firestore:"thumbnail_url"`
	PlatformType int64   `firestore:"platform_type"`
	CreatedAt    string  `firestore:"created_at"`
	UpdatedAt    string  `firestore:"updated_at"`
	DeletedAt    *string `firestore:"deleted_at"`
}

func (pr *PlatformRepository) CreatePlatform(ctx context.Context, arg domain.Platform) error {
	res, err := pr.client.Collection("platforms").Doc(arg.ID).Set(ctx, platformFirestore{
		Name:         arg.Name,
		RssUrl:       arg.RssUrl,
		ThumbnailUrl: arg.ThumbnailUrl,
		PlatformType: arg.PlatformType,
		CreatedAt:    arg.CreatedAt,
		UpdatedAt:    arg.UpdatedAt,
		DeletedAt:    arg.DeletedAt,
	})

	fmt.Printf("【client】: %v\n", pr.client)

	fmt.Printf("【res】: %v\n", res)

	if err != nil {
		return err
	}
	return nil
}
