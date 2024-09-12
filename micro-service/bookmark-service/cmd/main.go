package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/application/usecase"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/config/database"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/external"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/bookmark-service/internal/interfaces/handler"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/reflection"
)

func main() {
	log.Printf("Start bookmark service")

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

	systemRoots, err := x509.SystemCertPool()
	if err != nil {
		fmt.Println("failed to read system root certificate pool")
	}
	grpcCredential := credentials.NewTLS(&tls.Config{
		RootCAs: systemRoots,
	})
	if isDev {
		grpcCredential = insecure.NewCredentials()
	}

	// create grpc client
	// content client
	crpcURL := os.Getenv("CONTENT_SERVICE_CONTAINER_NAME")
	if isDev {
		crpcURL = fmt.Sprintf("%s:%s", os.Getenv("CONTENT_SERVICE_CONTAINER_NAME"), os.Getenv("CONTENT_SERVICE_CONTAINER_PORT"))
	}
	cConn, err := grpc.NewClient(crpcURL, grpc.WithTransportCredentials(grpcCredential))
	if err != nil {
		log.Fatal("Error connecting to content service")
		return
	}
	defer cConn.Close()
	cClient := cpb.NewContentServiceClient(cConn)

	// infrastructure layer
	// persistence layer
	bps := persistence.NewBookmarkPersistence(db)
	// external layer
	cex := external.NewContentExternal(cClient)

	// adapter layer
	// persistence adapter
	bpa := persistenceadapter.NewBookmarkPersistenceAdapter(bps)
	// external adapter
	cea := externaladapter.NewContentExternalAdapter(cex)

	// application layer
	// usecase layer
	buc := usecase.NewBookmarkUseCase(bpa, cea)

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
