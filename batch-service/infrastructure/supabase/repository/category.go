package repository

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type CategoryRepositoryInterface interface {
	GetCategories(ctx context.Context) ([]domain.Category, error)
	GetCategory(ctx context.Context, id string) (domain.Category, error)
	CreateCategory(ctx context.Context, arg domain.CreateCategoryInputDTO) (categoryID string, err error)
	UpdateCategory(ctx context.Context, arg domain.UpdateCategoryInputDTO) error
}

type CategoryRepository struct {
	db *sql.DB
}

func NewCategoryRepository(db *sql.DB) *CategoryRepository {
	return &CategoryRepository{db: db}
}

// GetCategories is a method to get all categories
func (cr *CategoryRepository) GetCategories(ctx context.Context) ([]domain.Category, error) {
	cRows, err := entity.Categories(qm.Where("deleted_at IS NOT NULL")).All(ctx, cr.db)
	if err != nil {
		return nil, err
	}
	resCategories := make([]domain.Category, len(cRows))
	for i, c := range cRows {
		category := domain.Category{
			ID:        c.ID,
			Name:      c.Name,
			Type:      domain.CategoryType(c.Type),
			CreatedAt: c.CreatedAt,
			UpdatedAt: c.UpdatedAt,
		}
		if c.DeletedAt.Valid {
			category.DeletedAt = &c.DeletedAt.Time
		}
		resCategories[i] = category
	}
	return resCategories, nil
}

// GetCategory is a method to get a category by id
func (cr *CategoryRepository) GetCategory(ctx context.Context, id string) (domain.Category, error) {
	c, err := entity.Categories(qm.Where("id = ?", id), qm.WhereIn("deleted_at IS NOT NULL")).One(ctx, cr.db)
	if err != nil {
		return domain.Category{}, err
	}
	category := domain.Category{
		ID:        c.ID,
		Name:      c.Name,
		Type:      domain.CategoryType(c.Type),
		CreatedAt: c.CreatedAt,
		UpdatedAt: c.UpdatedAt,
	}
	if c.DeletedAt.Valid {
		category.DeletedAt = &c.DeletedAt.Time
	}
	return category, nil
}

// CreateCategory is a method to create a category
func (cr *CategoryRepository) CreateCategory(ctx context.Context, arg domain.CreateCategoryInputDTO) (categoryID string, err error) {
	c := entity.Category{
		Name: arg.Name,
		Type: arg.Type,
	}
	err = c.Insert(ctx, cr.db, boil.Infer())
	if err != nil {
		return "", err
	}
	return c.ID, err
}

// UpdateCategory is a method to update a category
func (cr *CategoryRepository) UpdateCategory(ctx context.Context, arg domain.UpdateCategoryInputDTO) error {
	c, err := entity.Categories(qm.Where("id = ?", arg.ID), qm.WhereIn("deleted_at IS NOT NULL")).One(ctx, cr.db)
	if err != nil {
		return err
	}
	c.Name = arg.Name
	c.Type = arg.Type
	_, err = c.Update(ctx, cr.db, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}
