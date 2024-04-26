package internal

import "net/url"

func ParseURL(urlStr string) (*url.URL, error) {
	u, err := url.Parse(urlStr)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetURLPath(urlStr string) (string, error) {
	u, err := ParseURL(urlStr)
	if err != nil {
		return "", err
	}
	return u.Path, nil
}
