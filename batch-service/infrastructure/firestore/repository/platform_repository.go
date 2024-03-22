package repository

import (
	"cloud.google.com/go/firestore"
	"context"
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
	Client *firestore.Client
}

func NewPlatformRepository(client *firestore.Client) *PlatformRepository {
	return &PlatformRepository{Client: client}
}

type PlatformFirestore struct {
	Name         string              `firestore:"name"`
	RssURL       string              `firestore:"rss_url"`
	SiteURL      string              `firestore:"site_url"`
	PlatformType domain.PlatformType `firestore:"platform_type"`
	IsEng        bool                `firestore:"is_eng"`
	CreatedAt    string              `firestore:"created_at"`
	UpdatedAt    string              `firestore:"updated_at"`
	DeletedAt    *string             `firestore:"deleted_at"`
}

// CreatePlatform is a method to create a platform
func (pr *PlatformRepository) CreatePlatform(ctx context.Context, arg domain.Platform) error {
	_, err := pr.Client.Collection("platforms").Doc(arg.ID).Set(ctx, PlatformFirestore{
		Name:         arg.Name,
		RssURL:       arg.RssURL,
		SiteURL:      arg.SiteURL,
		PlatformType: arg.PlatformType,
		IsEng:        arg.IsEng,
		CreatedAt:    arg.CreatedAt,
		UpdatedAt:    arg.UpdatedAt,
		DeletedAt:    arg.DeletedAt,
	})

	if err != nil {
		return err
	}
	return nil
}

// GetPlatforms is a method to get all platforms
func (pr *PlatformRepository) GetPlatforms(ctx context.Context) ([]domain.Platform, error) {
	iter := pr.Client.Collection("platforms").Documents(ctx)
	var platforms []domain.Platform
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		//var p PlatformFirestore
		//err = doc.DataTo(&p)
		//println("🔥🔥🔥🔥🔥🔥🔥🔥")
		//println(fmt.Printf("%+v", doc.Data()))
		//if err != nil {
		//	return nil, err
		//}
		//p := doc.Data()
		//
		//p["name"]
		//doc.Data()
		//name, err := doc.DataAt("Name")
		//if err != nil {
		//	return nil, err
		//}
		data := doc.Data()
		platformType := data["PlatformType"].(int64)

		platforms = append(platforms, domain.Platform{
			ID:           doc.Ref.ID,
			Name:         data["Name"].(string),
			RssURL:       data["RssURL"].(string),
			SiteURL:      data["SiteURL"].(string),
			PlatformType: domain.PlatformType(platformType),
			IsEng:        data["IsEng"].(bool),
			CreatedAt:    data["CreatedAt"].(string),
			UpdatedAt:    data["UpdatedAt"].(string),
			//DeletedAt:    p.DeletedAt,
		})
		if data["DeletedAt"] != nil {
			platforms[len(platforms)-1].DeletedAt = data["DeletedAt"].(*string)
		}
	}
	return platforms, nil
}

// GetPlatForm is a method to get a platform by id
func (pr *PlatformRepository) GetPlatForm(ctx context.Context, id string) (domain.Platform, error) {
	doc, err := pr.Client.Collection("platforms").Doc(id).Get(ctx)
	if err != nil {
		return domain.Platform{}, err
	}
	var p PlatformFirestore
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
		IsEng:        p.IsEng,
		CreatedAt:    p.CreatedAt,
		UpdatedAt:    p.UpdatedAt,
		DeletedAt:    p.DeletedAt,
	}, nil
}

// UpdatePlatform is a method to update a platform
func (pr *PlatformRepository) UpdatePlatform(ctx context.Context, arg domain.Platform) error {
	_, err := pr.Client.Collection("platforms").Doc(arg.ID).Set(ctx, PlatformFirestore{
		Name:         arg.Name,
		RssURL:       arg.RssURL,
		SiteURL:      arg.SiteURL,
		PlatformType: arg.PlatformType,
		IsEng:        arg.IsEng,
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
	_, err := pr.Client.Collection("platforms").Doc(id).Delete(ctx)
	if err != nil {
		return err
	}
	return nil
}
