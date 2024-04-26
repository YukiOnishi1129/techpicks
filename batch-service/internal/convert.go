package internal

import "time"

var layout = "2006-01-02 15:04:05"

func StringToTime(str string) time.Time {
	t, _ := time.Parse(layout, str)
	return t
}
