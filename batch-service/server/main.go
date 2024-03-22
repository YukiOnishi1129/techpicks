package main

import "github.com/YukiOnishi1129/techpicks/batch-service/cmd/usecase"

func main() {
	//initializer.Init()
	rss := usecase.GetRSS()
	println("【rss count】: ", len(rss))
}
