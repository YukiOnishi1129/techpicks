package seeders

import (
	"context"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/firestore/repository"
	"github.com/google/uuid"
	"time"
)

type PlatformSeedInterface interface {
	SeedPlatform(ctx context.Context) error
}

type PlatformSeed struct {
	pr *repository.PlatformRepository
}

func NewPlatformSeed(pr *repository.PlatformRepository) *PlatformSeed {
	return &PlatformSeed{pr: pr}
}

type PlatformFirestore struct {
	//Id           string  `firestore:"id"`
	Name         string  `firestore:"name"`
	RssUrl       string  `firestore:"rss_url"`
	ThumbnailUrl string  `firestore:"thumbnail_url"`
	PlatformType int64   `firestore:"platform_type"`
	CreatedAt    string  `firestore:"created_at"`
	UpdatedAt    string  `firestore:"updated_at"`
	DeletedAt    *string `firestore:"deleted_at"`
}

func (ps *PlatformSeed) SeedPlatform(ctx context.Context) error {
	platformID, err := uuid.NewUUID()
	if err != nil {
		return err
	}
	createdAt := time.Now().Format("2006-01-02T15:04:05Z")

	err = ps.pr.CreatePlatform(ctx, domain.Platform{
		ID:           platformID.String(),
		Name:         "Mercari Engineering Blog",
		RssUrl:       "https://engineering.mercari.com/blog/feed.xml",
		ThumbnailUrl: "https://engineering.mercari.com/images/ogp.png",
		PlatformType: 2,
		CreatedAt:    createdAt,
		UpdatedAt:    createdAt,
		DeletedAt:    nil,
	})
	fmt.Printf("=============")
	if err != nil {
		return err
	}
	return nil
}
