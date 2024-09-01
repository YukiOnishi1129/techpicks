package domain

type TrendPlatformType int

const (
	TrendPlatformTypeUnknown TrendPlatformType = iota
	TrendPlatformTypeZenn
	TrendPlatformTypeQiita
	TrendPlatformTypeHatena
	TrendPlatformTypeDevCommunity
	TrendPlatformTypeHashnode
)
