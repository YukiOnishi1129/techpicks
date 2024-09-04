package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/application/usecase"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/config/database"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/interfaces/handler"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	log.Printf("Start bookmark service")
	if os.Getenv("GO_ENV") != "production" && os.Getenv("GO_ENV") != "staging" {
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("Error loading .env file")
			return
		}
	}

	//	database
	db, dbErr := database.Init()
	if dbErr != nil {
		fmt.Printf("Error connecting to DB\n")
		return
	}

	// infrastructure layer
	// repository layer
	bps := persistence.NewBookmarkPersistence(db)

	// adapter layer
	bad := adapter.NewBookmarkAdapter(bps)

	// application layer
	// usecase layer
	buc := usecase.NewBookmarkUseCase(bad)

	// interface layer
	bhd := handler.NewBookmarkHandler(buc)

	// crate a listener on TCP port 3002
	port := os.Getenv("BOOKMARK_SERVICE_CONTAINER_PORT")
	if port == "" {
		port = "3002"
	}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}

	// create a new gRPC server
	s := grpc.NewServer()

	// register the greeting service with the gRPC server
	bpb.RegisterBookmarkServiceServer(s, bhd)

	// register reflection service on gRPC server
	reflection.Register(s)

	// start the gRPC server port at 3001
	go func() {
		log.Printf("start gRPC server listening on port: %s", port)
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
