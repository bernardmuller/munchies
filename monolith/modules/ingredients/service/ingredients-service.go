package service

import (
	"context"
	"time"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
)

type Ingredient struct {
	ID         uuid.UUID
	Name       string
	CategoryId string
	CreatedAt  time.Time
	Createdby  string
	UpdatedAd  time.Time
}

type IngredientsService struct {
	DB *postgres.Queries
}

func NewIngredientsService(db *postgres.Queries) *IngredientsService {
	return &IngredientsService{
		DB: db,
	}
}

func (s *IngredientsService) GetAllIngredients(ctx context.Context) ([]postgres.Ingredient, error) {
	ingredients, err := s.DB.GetAllIngredients(ctx)
	if err != nil {
		return nil, err
	}
	return ingredients, nil
}
