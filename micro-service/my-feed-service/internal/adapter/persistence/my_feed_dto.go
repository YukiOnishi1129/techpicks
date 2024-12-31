package persistence

type BulkCreateMyFeedInputDto struct {
	UserID         string
	MyFeedFolderID string
	FeedIDs        []string
}
