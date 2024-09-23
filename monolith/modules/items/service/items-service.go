package service

import (
	"github.com/bernardmuller/munchies/store/postgres"
)

type ItemsService struct {
	DB *postgres.Queries
}

func NewItemsService(db *postgres.Queries) *ItemsService {
	return &ItemsService{
		DB: db,
	}
}
