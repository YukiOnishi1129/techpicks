package ogp

import (
	"context"
	"github.com/otiai10/opengraph"
	"time"
)

func GetOgpImage(url string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	ogp, err := opengraph.FetchWithContext(ctx, url)
	if err != nil {
		return "", err
	}
	if len(ogp.Image) != 0 {
		return ogp.Image[0].URL, nil
	}
	return "", nil
}
