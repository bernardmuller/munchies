package main

import (
	"context"
	"fmt"
	"github.com/bernardmuller/munchies/store/postgres"
)

// NOTE: This is a temporary script to move ingredients from one database to another.
// It is not meant to be used in production.

// To run this script, you will need to set the DB_URL_ONE and DB_URL_TWO
// then run the script with `go run move-items-to-new-db.go`

const DB_URL = "postgresql://postgres:RtNCiGBNpOtSyIaHbJLlBhcWSfPOqbFC@junction.proxy.rlwy.net:35158/railway"

func main() {
	db, err := postgres.ConnectDB(DB_URL)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	categories, err := db.GetAllCategories(ctx)
	if err != nil {
		panic(err)
	}

	for _, category := range categories {
		fmt.Printf("( id '%s', name '%s' )\n", category.ID.String(), category.Name)
	}
}
