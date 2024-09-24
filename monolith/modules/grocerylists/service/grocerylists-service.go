package service

import (
	"context"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
	"log"
)

type GrocerylistsService struct {
	DB *postgres.Queries
}

func NewGrocerylistsService(db *postgres.Queries) *GrocerylistsService {
	return &GrocerylistsService{
		DB: db,
	}
}

func (s *GrocerylistsService) CreateGrocerylist(ctx context.Context, userId uuid.UUID) (postgres.Grocerylist, error) {
	params := postgres.CreateGrocerylistParams{
		ID:          uuid.New(),
		MenuID:      uuid.NullUUID{UUID: uuid.Nil, Valid: false},
		HouseholdID: uuid.NullUUID{UUID: uuid.Nil, Valid: false},
		Createdby:   userId,
	}

	newGrocerylist, createErr := s.DB.CreateGrocerylist(ctx, params)
	if createErr != nil {
		log.Println(createErr)
		return postgres.Grocerylist{}, createErr
	}
	return newGrocerylist, nil
}

func (s *GrocerylistsService) GetLatestGrocerylistByUserId(ctx context.Context, userId uuid.UUID) (postgres.GetGrocerylistWithItemsByUserIdRow, error) {
	gl, err := s.DB.GetGrocerylistWithItemsByUserId(ctx, userId)
	if err != nil {
		return postgres.GetGrocerylistWithItemsByUserIdRow{}, err
	}
	return gl, nil
}

func (s *GrocerylistsService) GetLatestGrocerylistHouseholdId(ctx context.Context, householdId uuid.UUID) (postgres.GetGrocerylistWithItemsByHouseholdIdRow, error) {
	gl, err := s.DB.GetGrocerylistWithItemsByHouseholdId(ctx, uuid.NullUUID{UUID: householdId, Valid: true})
	if err != nil {
		return postgres.GetGrocerylistWithItemsByHouseholdIdRow{}, err
	}
	return gl, nil
}
