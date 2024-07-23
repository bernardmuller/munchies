package postgres

import (
	"database/sql"
	"fmt"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func ConnectDB(uri string) (*Queries, error) {
	fmt.Println("Connecting to DB")
	err := godotenv.Load()
	if uri == "" {
		return nil, fmt.Errorf("error: connecting to DB, POSTGRES_URI required")
	}
	conn, err := sql.Open("postgres", uri)
	if err != nil {
		return nil, fmt.Errorf("failed to open db %s: %w", uri, err)
	}

	return New(conn), nil
}
