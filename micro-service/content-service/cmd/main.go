package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	bpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/bookmark"
	cpb "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/content"
	externaladapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/external_adapter"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/application/usecase"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/config/database"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/external"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/interfacess/handler"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/reflection"
)

func main() {
	log.Printf("Start content service")

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
	// bookmark client
	brpcURL := os.Getenv("BOOKMARK_SERVICE_CONTAINER_NAME")
	if isDev {
		brpcURL = fmt.Sprintf("%s:%s", os.Getenv("BOOKMARK_SERVICE_CONTAINER_NAME"), os.Getenv("BOOKMARK_SERVICE_CONTAINER_PORT"))
	}
	bConn, err := grpc.NewClient(brpcURL, grpc.WithTransportCredentials(grpcCredential))
	if err != nil {
		log.Fatal("Error connecting to bookmark service")
		return
	}
	defer bConn.Close()
	bClient := bpb.NewBookmarkServiceClient(bConn)

	// infrastructure layer
	// persistence layer
	aps := persistence.NewArticlePersistence(db)
	// external layer
	bex := external.NewBookmarkExternal(bClient)

	// adapter layer
	// persistence adapter
	apa := persistenceadapter.NewArticlePersistenceAdapter(aps)
	// external adapter
	bea := externaladapter.NewBookmarkExternalAdapter(bex)

	// application layer
	// usecase layer
	cuc := usecase.NewContentUseCase(apa, bea)

	// interface layer
	chd := handler.NewContentHandler(cuc)

	// crate a listener on TCP port 3001
	port := os.Getenv("CONTENT_SERVICE_CONTAINER_PORT")
	if port == "" {
		port = "3001"
	}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}

	// create a new gRPC server
	s := grpc.NewServer()

	// register the greeting service with the gRPC server
	cpb.RegisterContentServiceServer(s, chd)

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
