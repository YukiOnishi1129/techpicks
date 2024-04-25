package usecase

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	"github.com/google/uuid"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"time"

	"github.com/volatiletech/sqlboiler/v4/boil"

	"github.com/YukiOnishi1129/techpicks/batch-service/domain"
)

type BatchMigrateSeedInterface interface {
	BatchMigrateSeed(ctx context.Context) error
}

func (u *Usecase) BatchMigrateSeed(ctx context.Context) error {
	tx, err := u.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	seedCategories := getCategoryDatas()
	seedPlatformFeeds := getSeedPlatformAndFeeds()
	for _, s := range seedCategories {
		categoryID, _ := uuid.NewUUID()
		categoryIDStr := categoryID.String()
		c, _ := entity.Categories(qm.Where("name = ?", s.Name)).One(ctx, tx)
		if c != nil {
			categoryIDStr = c.ID
		}
		// create new category if it does not exist
		if c == nil {
			category := entity.Category{
				ID:   categoryID.String(),
				Name: s.Name,
				Type: int(s.Type),
			}
			err = category.Insert(ctx, tx, boil.Infer())
			if err != nil {
				return err
			}
		}

		for _, sp := range seedPlatformFeeds {
			if sp.seedCategoryID == s.seedCategoryID {
				p, _ := entity.Platforms(qm.Where("site_url = ?", sp.PlatformSiteURL)).One(ctx, tx)
				if p != nil {
					f, _ := entity.Feeds(qm.Where("rss_url = ?", sp.RssURL)).One(ctx, tx)
					if f == nil {
						arg := createFeedArg{
							PlatformID:      p.ID,
							CategoryID:      categoryIDStr,
							FeedName:        sp.FeedName,
							FeedDescription: sp.FeedDescription,
							FeedThumbnail:   sp.FeedThumbnail,
							RssURL:          sp.RssURL,
							FeedFetchType:   sp.FeedFetchType,
							APIQueryParam:   sp.APIQueryParam,
							FeedSiteURL:     sp.FeedSiteURL,
							DeletedAt:       sp.DeletedAt,
						}
						if sp.TrendPlatformType != nil {
							arg.TrendPlatformType = *sp.TrendPlatformType
						}
						err = createFeed(ctx, tx, arg)
						if err != nil {
							return err
						}
					}
					continue
				}

				platformID, _ := uuid.NewUUID()
				err = createPlatform(ctx, tx, createPlatformArg{
					ID:           platformID.String(),
					Name:         sp.PlatformName,
					SiteURL:      sp.PlatformSiteURL,
					PlatformType: sp.PlatformType,
					FaviconURL:   sp.FaviconURL,
					IsEng:        sp.IsEng,
					DeletedAt:    sp.DeletedAt,
				})
				if err != nil {
					return err
				}

				arg := createFeedArg{
					PlatformID:      platformID.String(),
					CategoryID:      categoryIDStr,
					FeedName:        sp.FeedName,
					FeedDescription: sp.FeedDescription,
					FeedThumbnail:   sp.FeedThumbnail,
					RssURL:          sp.RssURL,
					FeedFetchType:   sp.FeedFetchType,
					FeedSiteURL:     sp.FeedSiteURL,
					APIQueryParam:   sp.APIQueryParam,
					DeletedAt:       sp.DeletedAt,
				}
				if sp.TrendPlatformType != nil {
					arg.TrendPlatformType = *sp.TrendPlatformType
				}
				err = createFeed(ctx, tx, arg)
				if err != nil {
					return err
				}
			}
		}
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

type createPlatformArg struct {
	ID           string
	Name         string
	SiteURL      string
	PlatformType domain.PlatformType
	FaviconURL   string
	IsEng        bool
	DeletedAt    *time.Time
}

func createPlatform(ctx context.Context, tx *sql.Tx, arg createPlatformArg) error {
	platform := entity.Platform{
		ID:           arg.ID,
		Name:         arg.Name,
		SiteURL:      arg.SiteURL,
		PlatformType: int(arg.PlatformType),
		FaviconURL:   arg.FaviconURL,
		IsEng:        arg.IsEng,
	}
	if arg.DeletedAt != nil {
		platform.DeletedAt = null.TimeFromPtr(arg.DeletedAt)
	}
	err := platform.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}

type createFeedArg struct {
	PlatformID        string
	CategoryID        string
	FeedName          string
	FeedDescription   string
	FeedThumbnail     string
	RssURL            string
	FeedFetchType     domain.FeedFetchType
	TrendPlatformType domain.TrendPlatformType
	APIQueryParam     *string
	FeedSiteURL       string
	DeletedAt         *time.Time
}

func createFeed(ctx context.Context, tx *sql.Tx, arg createFeedArg) error {
	feedID, _ := uuid.NewUUID()
	feed := entity.Feed{
		ID:                feedID.String(),
		Name:              arg.FeedName,
		Description:       arg.FeedDescription,
		ThumbnailURL:      arg.FeedThumbnail,
		RSSURL:            arg.RssURL,
		FeedFetchType:     int(arg.FeedFetchType),
		TrendPlatformType: int(arg.TrendPlatformType),
		SiteURL:           arg.FeedSiteURL,
		PlatformID:        arg.PlatformID,
		CategoryID:        arg.CategoryID,
	}
	if arg.APIQueryParam != nil {
		feed.APIQueryParam = null.StringFromPtr(arg.APIQueryParam)
	}
	if arg.DeletedAt != nil {
		feed.DeletedAt = null.TimeFromPtr(arg.DeletedAt)
	}
	err := feed.Insert(ctx, tx, boil.Infer())
	if err != nil {
		return err
	}
	return nil
}

//func getMetaData(url string) (faviconURL, ogpImageURL string, err error) {
//	g := goose.New()
//	article, err := g.ExtractFromURL(url)
//	if err != nil {
//		return "", "", err
//	}
//	faviconURL = article.MetaFavicon
//	ogpImageURL = article.TopImage
//	return faviconURL, ogpImageURL, nil
//}
