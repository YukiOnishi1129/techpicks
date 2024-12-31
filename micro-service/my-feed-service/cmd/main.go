package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	mfpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/my_feed"

	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/adapter/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/application/usecase"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/config/database"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/infrastructure/persistence"
	"github.com/YukiOnishi1129/techpicks/micro-service/my-feed-service/internal/interfaces/handler"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	fmt.Println("Start my feed service")

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

	// systemRoots, err := x509.SystemCertPool()
	// if err != nil {
	// 	fmt.Println("failed to read system root certificate pool")
	// }
	// grpcCredential := credentials.NewTLS(&tls.Config{
	// 	RootCAs: systemRoots,
	// })
	// if isDev {
	// 	grpcCredential = insecure.NewCredentials()
	// }

	// infrastructure layer
	// persistence layer
	tps := persistence.NewTransactionPersistence(db)
	mffps := persistence.NewMyFeedFolderPersistence(db)

	// adapter layer
	// persistence adapter
	tpa := persistenceadapter.NewTransactionPersistenceAdapter(tps)
	mffpa := persistenceadapter.NewMyFeedFolderPersistenceAdapter(mffps)

	// application layer
	// usecase layer
	muc := usecase.NewMyUseCase(tpa, mffpa)

	// interface layer
	mhd := handler.NewMyHandler(muc)

	// crate a listener on TCP port 3003
	port := os.Getenv("MY_FEED_SERVICE_CONTAINER_PORT")
	if port == "" {
		port = "3003"
	}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}

	// create a new gRPC server
	s := grpc.NewServer()

	// register the greeting service with the gRPC server
	mfpb.RegisterMyFeedServiceServer(s, mhd)

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
