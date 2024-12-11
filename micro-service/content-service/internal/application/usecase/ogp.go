package usecase

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"time"
	"unicode/utf8"

	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/otiai10/opengraph"
	"golang.org/x/net/html/charset"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func (cu *contentUseCase) GetArticleOGP(ctx context.Context, articleURL string) (*cpb.GetArticleOGPResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	parsedURL, err := url.Parse(articleURL)
	if err != nil || parsedURL.Scheme == "" || parsedURL.Host == "" {
		return nil, errors.New("invalid URL")
	}

	ogp, err := opengraph.FetchWithContext(ctx, articleURL)
	if err != nil {
		return nil, err
	}

	// en: If the title is not UTF-8, get and parse the HTML
	if !utf8.ValidString(ogp.Title) || !utf8.ValidString(ogp.Description) {
		res, err := http.Get(articleURL)
		if err != nil {
			return nil, err
		}
		reader, err := charset.NewReader(res.Body, res.Header.Get("Content-Type"))
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()

		err = ogp.Parse(reader)
		if err != nil {
			return nil, err
		}
	}

	thumbnailURL := ""
	if len(ogp.Image) > 0 {
		thumbnailURL = ogp.Image[0].URL
	}

	return &cpb.GetArticleOGPResponse{
		Ogp: &cpb.OGP{
			Title:        cu.sanitizeToUTF8(ogp.Title),
			Description:  wrapperspb.String(cu.sanitizeToUTF8(ogp.Description)),
			ArticleUrl:   cu.sanitizeToUTF8(articleURL),
			SiteUrl:      cu.sanitizeToUTF8(fmt.Sprintf("%s://%s", parsedURL.Scheme, parsedURL.Host)),
			SiteName:     cu.sanitizeToUTF8(ogp.SiteName),
			ThumbnailUrl: cu.sanitizeToUTF8(thumbnailURL),
			FaviconUrl:   cu.sanitizeToUTF8(ogp.Favicon),
		},
	}, nil
}

func (cu *contentUseCase) sanitizeToUTF8(s string) string {
	if utf8.ValidString(s) {
		return s
	}
	v := make([]rune, 0, len(s))
	for i := 0; i < len(s); {
		r, size := utf8.DecodeRuneInString(s[i:])
		if r == utf8.RuneError && size == 1 {
			v = append(v, utf8.RuneError) // 無効なバイトを�に置き換える
			i++
		} else {
			v = append(v, r)
			i += size
		}
	}
	return string(v)
}
