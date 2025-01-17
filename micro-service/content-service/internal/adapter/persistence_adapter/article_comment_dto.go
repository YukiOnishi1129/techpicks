package persistenceadapter

type UpsertArticleCommentAdapterInputDTO struct {
	ID        *string
	UserID    string
	ArticleID string
	Comment   string
}

type DeleteArticleCommentAdapterInputDTO struct {
	ID     string
	UserID string
}
