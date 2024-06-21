package testonly

import (
	"context"
	"database/sql"
	"log"
	"os"
	"testing"
	"time"

	_ "github.com/lib/pq"

	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
)

type PostgresContainer struct {
	postgres.PostgresContainer
	ConnectionString string
	DB               *sql.DB
}

func (c PostgresContainer) Down() {
	if err := c.Terminate(context.Background()); err != nil {
		log.Printf("Could not stop postgres: %s\n", err)
	}
}

func SetupDB(t *testing.T, schemaPath string) (*PostgresContainer, error) {
	t.Helper()
	ctx := context.Background()

	dbName := "postgres"
	dbUser := "root"
	dbPassword := "password"

	entries, err := os.ReadDir(schemaPath)
	if err != nil {
		t.Fatal(err)
	}
	scripts := make([]string, 0, len(entries))
	for _, e := range entries {
		scripts = append(scripts, schemaPath+e.Name())
	}

	pgContainer, err := postgres.RunContainer(ctx,
		testcontainers.WithImage("docker.io/postgres:16-alpine"),
		postgres.WithInitScripts(scripts...),
		postgres.WithDatabase(dbName),
		postgres.WithUsername(dbUser),
		postgres.WithPassword(dbPassword),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").
				WithOccurrence(2).
				WithStartupTimeout(5*time.Second)),
	)
	if err != nil {
		log.Fatalf("postgres run container: %s", err)
		return nil, err
	}

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		t.Fatal(err)
		return nil, err
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		t.Fatalf("Failed to open database: %s", err)
		return nil, err
	}

	return &PostgresContainer{
		PostgresContainer: *pgContainer,
		ConnectionString:  connStr,
		DB:                db,
	}, nil
}
