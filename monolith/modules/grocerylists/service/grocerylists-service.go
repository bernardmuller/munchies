package service

import (
	"github.com/bernardmuller/munchies/store/postgres"
)

type GrocerylistsService struct {
	DB *postgres.Queries
}

func NewGrocerylistsService(db *postgres.Queries) *GrocerylistsService {
	return &GrocerylistsService{
		DB: db,
	}
}
