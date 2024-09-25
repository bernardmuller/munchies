package service

import (
	"database/sql"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"time"
)

type ItemsService struct {
	DB *postgres.Queries
}

func NewItemsService(db *postgres.Queries) *ItemsService {
	return &ItemsService{
		DB: db,
	}
}

type CreateItem struct {
	IngredientId  uuid.UUID `json:"ingredientId"`
	GrocerylistId uuid.UUID `json:"grocerylistId"`
	UserId        uuid.UUID `json:"userId"`
}

func (s *ItemsService) CreateGrocerylistItem(c echo.Context, item CreateItem) (postgres.Item, error) {
	newItem, err := s.DB.CreateItem(c.Request().Context(), postgres.CreateItemParams{
		ID:            uuid.New(),
		Check:         false,
		Typeid:        2,
		Description:   sql.NullString{String: "", Valid: false},
		Createdat:     time.Now(),
		Createdby:     item.UserId,
		GrocerylistID: item.GrocerylistId,
		IngredientID:  item.IngredientId,
	})
	if err != nil {
		return postgres.Item{}, err
	}
	return newItem, nil
}
