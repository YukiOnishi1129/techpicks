package seeders

import (
	"context"
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
		RssURL:       "https://engineering.mercari.com/blog/feed.xml",
		SiteURL:      "https://engineering.mercari.com/blog/",
		PlatformType: 2,
		CreatedAt:    createdAt,
		UpdatedAt:    createdAt,
		DeletedAt:    nil,
	})
	if err != nil {
		return err
	}
	return nil
}
