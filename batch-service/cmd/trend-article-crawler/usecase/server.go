package usecase

import (
	"context"
	"database/sql"
	"github.com/YukiOnishi1129/techpicks/batch-service/entity"
	apiRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/api/repository"
	rssRepository "github.com/YukiOnishi1129/techpicks/batch-service/infrastructure/rss/repository"
)

type UsecaseInterface interface {
	BatchCrawlTrendArticleContents(ctx context.Context) error
	ZennArticleCrawler(ctx context.Context, feed *entity.Feed) error
	qiitaArticleCrawler(ctx context.Context, feed *entity.Feed) error
	HatenaArticleCrawler(ctx context.Context, feed *entity.Feed) error
	DevCommunityArticleCrawler(ctx context.Context, feed *entity.Feed) error
}

type Usecase struct {
	db  *sql.DB
	air *apiRepository.Repository
	rr  *rssRepository.Repository
}

type Param struct {
	DB  *sql.DB
	Air *apiRepository.Repository
	Rr  *rssRepository.Repository
}

func NewUsecase(p *Param) *Usecase {
	return &Usecase{
		db:  p.DB,
		air: p.Air,
		rr:  p.Rr,
	}
}
