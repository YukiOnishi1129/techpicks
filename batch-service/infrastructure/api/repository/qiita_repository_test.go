package repository

import "testing"

func TestQiitaRepository_GetQiitaArticles(t *testing.T) {
	t.Parallel()
	tests := []struct {
		id string
	}{
		{
			id: "901ee2837401750dfdad",
		},
	}

	for _, tt := range tests {
		t.Run(tt.id, func(t *testing.T) {
			qr := NewQiitaRepository()
			data, err := qr.GetQiitaArticles(tt.id)
			if err != nil {
				t.Errorf("failed to get qiita articles: %v", err)
			}
			if data.ID != tt.id {
				t.Errorf("failed to get qiita articles: %v", data)
			}
			if data.LikesCount < 0 {
				t.Errorf("failed to get qiita articles: %v", data)
			}
		})
	}
}
