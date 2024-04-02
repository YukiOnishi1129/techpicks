package repository

//type PlatformRepositoryInterface interface {
//	CreatePlatform(ctx context.Context, arg domain.Platform) error
//	GetPlatforms(ctx context.Context) ([]domain.Platform, error)
//	GetPlatForm(ctx context.Context, id string) (domain.Platform, error)
//	UpdatePlatform(ctx context.Context, arg domain.Platform) error
//	DeletePlatform(ctx context.Context, id string) error
//}
//
//type PlatformRepository struct {
//	Client *firestore.Client
//}
//
//func NewPlatformRepository(client *firestore.Client) *PlatformRepository {
//	return &PlatformRepository{Client: client}
//}
//
//// CreatePlatform is a method to create a platform
//func (pr *PlatformRepository) CreatePlatform(ctx context.Context, arg domain.Platform) error {
//	_, err := pr.Client.Collection("platforms").Doc(arg.ID).Set(ctx, domain.PlatformFirestore{
//		Name:         arg.Name,
//		RssURL:       arg.RssURL,
//		SiteURL:      arg.SiteURL,
//		PlatformType: arg.PlatformType,
//		IsEng:        arg.IsEng,
//		CreatedAt:    arg.CreatedAt,
//		UpdatedAt:    arg.UpdatedAt,
//		DeletedAt:    arg.DeletedAt,
//	})
//
//	if err != nil {
//		return err
//	}
//	return nil
//}
//
//// GetPlatforms is a method to get all platforms
//func (pr *PlatformRepository) GetPlatforms(ctx context.Context) ([]domain.Platform, error) {
//	iter := pr.Client.Collection("platforms").WhereEntity(firestore.OrFilter{
//		Filters: []firestore.EntityFilter{
//			firestore.PropertyFilter{
//				Path:     "deleted_at",
//				Operator: "==",
//				Value:    nil,
//			}},
//	}).Documents(ctx)
//	var platforms []domain.Platform
//	for {
//		doc, err := iter.Next()
//		if err != nil {
//			break
//		}
//		platforms = append(platforms, convertFirestoreToPlatform(doc))
//	}
//	return platforms, nil
//}
//
//// GetPlatForm is a method to get a platform by id
//func (pr *PlatformRepository) GetPlatForm(ctx context.Context, id string) (domain.Platform, error) {
//	doc, err := pr.Client.Collection("platforms").Doc(id).Get(ctx)
//	if err != nil {
//		return domain.Platform{}, err
//	}
//	return convertFirestoreToPlatform(doc), nil
//}
//
//// UpdatePlatform is a method to update a platform
//func (pr *PlatformRepository) UpdatePlatform(ctx context.Context, arg domain.Platform) error {
//	_, err := pr.Client.Collection("platforms").Doc(arg.ID).Set(ctx, domain.PlatformFirestore{
//		Name:         arg.Name,
//		RssURL:       arg.RssURL,
//		SiteURL:      arg.SiteURL,
//		PlatformType: arg.PlatformType,
//		IsEng:        arg.IsEng,
//		CreatedAt:    arg.CreatedAt,
//		UpdatedAt:    arg.UpdatedAt,
//		DeletedAt:    arg.DeletedAt,
//	})
//	if err != nil {
//		return err
//	}
//	return nil
//}
//
//// DeletePlatform is a method to delete a platform
//func (pr *PlatformRepository) DeletePlatform(ctx context.Context, id string) error {
//	_, err := pr.Client.Collection("platforms").Doc(id).Delete(ctx)
//	if err != nil {
//		return err
//	}
//	return nil
//}
//
//// convertFirestoreToPlatform is a method to convert firestore data to platform
//func convertFirestoreToPlatform(doc *firestore.DocumentSnapshot) domain.Platform {
//	data := doc.Data()
//	platformType := data["platform_type"].(int64)
//	cratedAt := data["created_at"].(int64)
//	updatedAt := data["updated_at"].(int64)
//	platform := domain.Platform{
//		ID:                doc.Ref.ID,
//		Name:              data["name"].(string),
//		CategoryName:      data["category_name"].(string),
//		RssURL:            data["rss_url"].(string),
//		SiteURL:           data["site_url"].(string),
//		PlatformType:      domain.PlatformType(platformType),
//		ThumbnailImageURL: data["thumbnail_image_url"].(string),
//		FaviconURL:        data["favicon_url"].(string),
//		IsEng:             data["is_eng"].(bool),
//		CreatedAt:         int(cratedAt),
//		UpdatedAt:         int(updatedAt),
//	}
//	if data["deleted_at"] != nil {
//		deletedAt := int(data["deleted_at"].(int64))
//		platform.DeletedAt = &deletedAt
//	}
//	return platform
//}
