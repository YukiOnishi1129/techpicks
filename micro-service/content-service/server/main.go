package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/database"
	pb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/interface/presenter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	//	database
	db, dbErr := database.Init()
	if dbErr != nil {
		fmt.Printf("Error connecting to DB\n")
		return
	}

	aps := persistence.NewArticlePersistence(db)

	auc := usecase.NewArticleUseCase(aps)

	apt := presenter.NewArticlePresenter(auc)

	// crate a listener on TCP port 3001
	port := 3001
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}

	// create a new gRPC server
	s := grpc.NewServer()

	// register the greeting service with the gRPC server
	pb.RegisterArticleServiceServer(s, apt)

	// register reflection service on gRPC server
	reflection.Register(s)

	// start the gRPC server port at 8080
	go func() {
		log.Printf("start gRPC server listening on port: %d", port)
		err := s.Serve(listener)
		if err != nil {
			return
		}
	}()

	// wait for Control C to exit
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutting down gRPC server...")
	s.GracefulStop()
}
