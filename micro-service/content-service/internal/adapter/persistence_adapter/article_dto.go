package persistenceadapter

type GetArticleAdapterInputDTO struct {
	ArticleID string
	UserID    string
}

type GetArticleWithoutFeedsAdapterInputDTO struct {
	ArticleID string
	UserID    string
}
