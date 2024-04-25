package repository

import "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/client"

type Repository struct {
	apiClient client.APIClient
}

type Params struct {
	APIClient *client.APIClient
}

func NewRepository(p *Params) *Repository {
	return &Repository{
		apiClient: *p.APIClient,
	}
}
