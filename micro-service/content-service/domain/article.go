package domain

type GetArticlesInputDTO struct {
	LanguageStatus *int64
	Tag            *string
	Cursor         string
	Limit          int64
}
