package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	fpb "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/grpc/favorite"

	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/application/usecase"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/config/database"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/infrustructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/favorite-service/internal/interfaces/handler"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	log.Printf("Start favorite service")

	isDev := os.Getenv("GO_ENV") != "production" && os.Getenv("GO_ENV") != "staging"
	if isDev {
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
	// persistence layer
	fafps := persistence.NewArticlePersistenceAdapter(db)

	// adapter layer
	// persistence layer
	fafap := persistenceadapter.NewFavoriteArticleFolderPersistenceAdapter(fafps)

	// application layer
	// usecase layer
	fafu := usecase.NewFavoriteUseCase(fafap)

	// interface layer
	fhd := handler.NewFavoriteHandler(fafu)

	// crate a listener on TCP port 3004
	port := os.Getenv("FAVORITE_SERVICE_CONTAINER_PORT")
	if port == "" {
		port = "3004"
	}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}

	// create a new gRPC server
	s := grpc.NewServer()

	// register the greeting service with the gRPC server
	fpb.RegisterFavoriteServiceServer(s, fhd)

	// register reflection service on gRPC server
	reflection.Register(s)

	// start the gRPC server port at 3004
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
