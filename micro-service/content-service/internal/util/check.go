package util

import (
	"unicode"
)

func JapaneseTextCheck(text string) bool {
	tt := []rune(text)

	// Check if the text contains hiragana, katakana,
	isJap := false
	for i := 0; i < len(tt); i++ {
		if unicode.In(tt[i], unicode.Hiragana) || unicode.In(tt[i], unicode.Katakana) || unicode.In(tt[i], unicode.Han) {
			isJap = true
			break
		}
	}
	return isJap
}
