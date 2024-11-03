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

const DB_URL_ONE = ""
const DB_URL_TWO = ""

func main() {
	dbOne, err := postgres.ConnectDB(DB_URL_ONE)
	if err != nil {
		panic(err)
	}

	dbTwo, err := postgres.ConnectDB(DB_URL_TWO)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	ingredients, err := dbOne.GetAllIngredients(ctx)
	if err != nil {
		panic(err)
	}

	for _, ingredient := range ingredients {
		cid := ingredient.CategoryID.UUID
		i, err := dbTwo.CreateIngredient(ctx, postgres.CreateIngredientParams{
			ID:         ingredient.ID,
			Name:       ingredient.Name,
			CategoryID: cid,
		})
		if err != nil {
			fmt.Printf("Error moving item %s: %s", ingredient.Name, err)
		}

		fmt.Printf("Moved %s to new db\n", i.Name)
	}

	fmt.Println("Done")
}
