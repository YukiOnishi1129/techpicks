package testutil

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"testing"
	"time"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util/testutil/mock"
	_ "github.com/lib/pq"
	"github.com/volatiletech/sqlboiler/v4/boil"

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

	pgContainer, err := postgres.Run(ctx, "docker.io/postgres:16-alpine",
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

func SetupTest(ctx context.Context, t *testing.T, schemaPath string) (*PostgresContainer, error) {
	t.Helper()

	c, err := SetupDB(t, schemaPath)
	if err != nil {
		t.Fatal(err)
		return nil, err
	}

	platforms := mock.GetPlatformMock()
	if len(platforms) == 0 {
		return nil, fmt.Errorf("platforms is empty %d", len(platforms))
	}
	categories := mock.GetCategoryMock()
	if len(categories) == 0 {
		return nil, fmt.Errorf("categories is empty %d", len(categories))
	}
	feeds := mock.GetFeedMock()
	if len(feeds) == 0 {
		return nil, fmt.Errorf("feeds is empty %d", len(feeds))
	}

	profiles := mock.GetProfileMock()
	if len(profiles) == 0 {
		return nil, fmt.Errorf("profiles is empty %d", len(profiles))
	}

	for _, v := range mock.GetPlatformMock() {
		err = v.Insert(ctx, c.DB, boil.Infer())
		if err != nil {
			t.Fatal(err)
			return nil, err
		}
	}

	for _, v := range mock.GetCategoryMock() {
		err = v.Insert(ctx, c.DB, boil.Infer())
		if err != nil {
			t.Fatal(err)
			return nil, err
		}
	}

	for _, v := range mock.GetFeedMock() {
		err = v.Insert(ctx, c.DB, boil.Infer())
		if err != nil {
			t.Fatal(err)
			return nil, err
		}
	}

	for _, v := range profiles {
		err = v.Insert(ctx, c.DB, boil.Infer())
		if err != nil {
			t.Fatal(err)
			return nil, err
		}
	}

	return c, nil
}
