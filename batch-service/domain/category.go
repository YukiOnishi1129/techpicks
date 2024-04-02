package domain

import (
	"time"
)

type Category struct {
	ID        string
	Name      string
	Type      int
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

type CreateCategoryInputDTO struct {
	Name string `json:"name"`
	Type int    `json:"type"`
}

type UpdateCategoryInputDTO struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type int    `json:"type"`
}
