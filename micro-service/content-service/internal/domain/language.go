package domain

type LanguageStatus int64

const (
	LanguageStatusUnknown LanguageStatus = iota
	LanguageStatusJapanese
	LanguageStatusEnglish
)
