package database

import (
	"database/sql"
	"fmt"
	"os"
)

func Init() (db *sql.DB, err error) {
	db, err = connectDB()
	if err != nil {
		return nil, err
	}
	return db, nil
}

func connectDB() (*sql.DB, error) {
	dsn := fmt.Sprintf("port=%s host=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("POSTGRES_PORT"), os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"))
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}
	return db, nil
}
