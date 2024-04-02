package repository

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type PlatformRepositoryInterface interface {
	//CreatePlatform(ctx context.Context, arg domain.Platform) (platformID string, err error)
	GetPlatforms(ctx context.Context) ([]domain.Platform, error)
	GetPlatForm(ctx context.Context, id string) (domain.Platform, error)
	//UpdatePlatform(ctx context.Context, arg domain.Platform) error
	//DeletePlatform(ctx context.Context, id string) error
}

type PlatformRepository struct {
	db *sql.DB
}

func NewPlatformRepository(db *sql.DB) *PlatformRepository {
	return &PlatformRepository{db: db}
}

func (pr *PlatformRepository) GetPlatforms(ctx context.Context) ([]domain.Platform, error) {
	pRows, err := entity.Platforms(qm.Where("deleted_at IS NOT NULL")).All(ctx, pr.db)
	if err != nil {
		return nil, err
	}
	resPlatforms := make([]domain.Platform, len(pRows))

	for i, p := range pRows {
		resPlatforms[i] = convertDBtoPlatformDomain(p)
	}
	return resPlatforms, nil
}

func (pr *PlatformRepository) GetPlatForm(ctx context.Context, id string) (domain.Platform, error) {
	p, err := entity.Platforms(qm.Where("id = ?", id), qm.WhereIn("deleted_at IS NOT NULL")).One(ctx, pr.db)
	if err != nil {
		return domain.Platform{}, err
	}
	return convertDBtoPlatformDomain(p), nil
}

func convertDBtoPlatformDomain(p *entity.Platform) domain.Platform {
	platform := domain.Platform{
		ID:           p.ID,
		Title:        p.Title,
		SiteURL:      p.SiteURL,
		PlatformType: domain.PlatformType(p.PlatformType),
		IsEng:        p.IsEng,
		CreatedAt:    p.CreatedAt,
		UpdatedAt:    p.UpdatedAt,
	}

	if p.DeletedAt.Valid {
		platform.DeletedAt = &p.DeletedAt.Time
	}

	return platform
}
