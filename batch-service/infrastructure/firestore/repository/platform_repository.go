package repository

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
)

type PlatformRepositoryInterface interface {
	CreatePlatform(ctx context.Context, arg domain.Platform) error
	GetPlatforms(ctx context.Context) ([]domain.Platform, error)
	GetPlatForm(ctx context.Context, id string) (domain.Platform, error)
	UpdatePlatform(ctx context.Context, arg domain.Platform) error
	DeletePlatform(ctx context.Context, id string) error
}

type PlatformRepository struct {
	client *firestore.Client
}

func NewPlatformRepository(client *firestore.Client) *PlatformRepository {
	return &PlatformRepository{client: client}
}

type platformFirestore struct {
	Name         string  `firestore:"name"`
	RssURL       string  `firestore:"rss_url"`
	SiteURL      string  `firestore:"site_url"`
	PlatformType int64   `firestore:"platform_type"`
	CreatedAt    string  `firestore:"created_at"`
	UpdatedAt    string  `firestore:"updated_at"`
	DeletedAt    *string `firestore:"deleted_at"`
}

// CreatePlatform is a method to create a platform
func (pr *PlatformRepository) CreatePlatform(ctx context.Context, arg domain.Platform) error {
	res, err := pr.client.Collection("platforms").Doc(arg.ID).Set(ctx, platformFirestore{
		Name:         arg.Name,
		RssURL:       arg.RssURL,
		SiteURL:      arg.SiteURL,
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

// GetPlatforms is a method to get all platforms
func (pr *PlatformRepository) GetPlatforms(ctx context.Context) ([]domain.Platform, error) {
	iter := pr.client.Collection("platforms").Documents(ctx)
	var platforms []domain.Platform
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var p platformFirestore
		err = doc.DataTo(&p)
		if err != nil {
			return nil, err
		}
		platforms = append(platforms, domain.Platform{
			ID:           doc.Ref.ID,
			Name:         p.Name,
			RssURL:       p.RssURL,
			SiteURL:      p.SiteURL,
			PlatformType: p.PlatformType,
			CreatedAt:    p.CreatedAt,
			UpdatedAt:    p.UpdatedAt,
			DeletedAt:    p.DeletedAt,
		})
	}
	return platforms, nil
}

// GetPlatForm is a method to get a platform by id
func (pr *PlatformRepository) GetPlatForm(ctx context.Context, id string) (domain.Platform, error) {
	doc, err := pr.client.Collection("platforms").Doc(id).Get(ctx)
	if err != nil {
		return domain.Platform{}, err
	}
	var p platformFirestore
	err = doc.DataTo(&p)
	if err != nil {
		return domain.Platform{}, err
	}
	return domain.Platform{
		ID:           doc.Ref.ID,
		Name:         p.Name,
		RssURL:       p.RssURL,
		SiteURL:      p.SiteURL,
		PlatformType: p.PlatformType,
		CreatedAt:    p.CreatedAt,
		UpdatedAt:    p.UpdatedAt,
		DeletedAt:    p.DeletedAt,
	}, nil
}

// UpdatePlatform is a method to update a platform
func (pr *PlatformRepository) UpdatePlatform(ctx context.Context, arg domain.Platform) error {
	_, err := pr.client.Collection("platforms").Doc(arg.ID).Set(ctx, platformFirestore{
		Name:         arg.Name,
		RssURL:       arg.RssURL,
		SiteURL:      arg.SiteURL,
		PlatformType: arg.PlatformType,
		CreatedAt:    arg.CreatedAt,
		UpdatedAt:    arg.UpdatedAt,
		DeletedAt:    arg.DeletedAt,
	})
	if err != nil {
		return err
	}
	return nil
}

// DeletePlatform is a method to delete a platform
func (pr *PlatformRepository) DeletePlatform(ctx context.Context, id string) error {
	_, err := pr.client.Collection("platforms").Doc(id).Delete(ctx)
	if err != nil {
		return err
	}
	return nil
}
