package util

import "testing"

func Test_Util_JapaneseTextCheck(t *testing.T) {
	t.Parallel()

	test := map[string]struct {
		text string
		want bool
	}{
		"Japanese text": {
			text: "こんにちは",
			want: true,
		},
		"English text": {
			text: "Hello",
			want: false,
		},
		"Japanese and English text": {
			text: "こんにちは Hello",
			want: true,
		},
		"Japanese and English front English": {
			text: "Hello こんにちは ",
			want: true,
		},
		"Japanese katakana": {
			text: "コンニチハ",
			want: true,
		},
		"Japanese katakana and English": {
			text: "コンニチハ Hello",
			want: true,
		},
		"Japanese katakana and English front English": {
			text: "Hello コンニチハ",
			want: true,
		},
		"number": {
			text: "123",
			want: false,
		},
		"symbol": {
			text: "!@#",
			want: false,
		},
	}

	for name, tt := range test {
		t.Run(name, func(t *testing.T) {
			if got := JapaneseTextCheck(tt.text); got != tt.want {
				t.Errorf("JapaneseTextCheck() = %v, want %v", got, tt.want)
			}
		})
	}
}
