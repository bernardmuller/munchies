package service

import (
	"context"
	"fmt"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
	"log"
)

type GrocerylistsService struct {
	DB *postgres.Queries
}

type CreateListParams struct {
	HouseholdId uuid.UUID
	MenuId      uuid.UUID
	UserId      uuid.UUID
}

func NewGrocerylistsService(db *postgres.Queries) *GrocerylistsService {
	return &GrocerylistsService{
		DB: db,
	}
}

func (s *GrocerylistsService) CreateGrocerylist(ctx context.Context, createParams CreateListParams) (postgres.Grocerylist, error) {
	var menuId uuid.NullUUID
	if createParams.MenuId != uuid.Nil {
		menuId = uuid.NullUUID{UUID: createParams.MenuId, Valid: true}
	} else {
		menuId = uuid.NullUUID{UUID: uuid.Nil, Valid: false}
	}

	var householdId uuid.NullUUID
	if createParams.HouseholdId != uuid.Nil {
		householdId = uuid.NullUUID{UUID: createParams.HouseholdId, Valid: true}
	} else {
		householdId = uuid.NullUUID{UUID: uuid.Nil, Valid: false}
	}

	params := postgres.CreateGrocerylistParams{
		ID:          uuid.New(),
		MenuID:      menuId,
		HouseholdID: householdId,
		Createdby:   createParams.UserId,
	}

	fmt.Println("---------------------------------------------")
	fmt.Println(params)
	fmt.Println("---------------------------------------------")

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

func (s *GrocerylistsService) GetLatestGrocerylistByHouseholdId(ctx context.Context, householdId uuid.UUID) (postgres.GetGrocerylistWithItemsByHouseholdIdRow, error) {
	gl, err := s.DB.GetGrocerylistWithItemsByHouseholdId(ctx, uuid.NullUUID{UUID: householdId, Valid: true})
	if err != nil {
		return postgres.GetGrocerylistWithItemsByHouseholdIdRow{}, err
	}
	return gl, nil
}

func (s *GrocerylistsService) GetGrocerylistById(id string) (postgres.Grocerylist, error) {
	gl, err := s.DB.GetGrocerylistById(context.Background(), uuid.MustParse(id))
	if err != nil {
		return postgres.Grocerylist{}, err
	}
	return gl, nil
}
