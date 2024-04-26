package internal

import "testing"

func TestParse_GetURLPath(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		url  string
		want string
	}{
		{
			name: "Success: GetURLPath",
			url:  "https://qiita.com/nyamage/items/80ca5480baad8da581df",
			want: "/nyamage/items/80ca5480baad8da581df",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			get, err := GetURLPath(tt.url)
			if err != nil {
				t.Errorf("failed to get url path: %v", err)
			}
			if get == "" {
				t.Errorf("failed to get url path: %v", get)
			}
			if get != tt.want {
				t.Errorf("failed to get url path: %v", get)
			}
		})
	}
}
