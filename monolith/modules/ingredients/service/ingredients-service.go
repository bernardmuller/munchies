package service

import (
	"context"
	"time"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
)

type Ingredient struct {
	ID         uuid.UUID `json:"id"`
	Name       string    `json:"name"`
	CategoryId string    `json:"categoryId"`
	CreatedAt  time.Time `json:"createdAt"`
	Createdby  string    `json:"createdBy"`
	UpdatedAd  time.Time `json:"updatedAt"`
}

type CreateIngredient struct {
	Name       string `json:"name"`
	CategoryId string `json:"categoryId"`
}

type IngredientsService struct {
	DB *postgres.Queries
}

func NewIngredientsService(db *postgres.Queries) *IngredientsService {
	return &IngredientsService{
		DB: db,
	}
}

func (s *IngredientsService) GetAllIngredients(ctx context.Context) ([]postgres.GetAllIngredientsRow, error) {
	ingredients, err := s.DB.GetAllIngredients(ctx)
	if err != nil {
		return nil, err
	}

	return ingredients, nil
}

func (s *IngredientsService) CreateIngredient(ctx context.Context, ingredient CreateIngredient) (postgres.Ingredient, error) {
	createdIngredient, err := s.DB.CreateIngredient(ctx, postgres.CreateIngredientParams{
		ID:         uuid.New(),
		Name:       ingredient.Name,
		CategoryID: uuid.MustParse(ingredient.CategoryId),
	})
	if err != nil {
		return postgres.Ingredient{}, err
	}
	return createdIngredient, nil
}

func (s *IngredientsService) GetIngredientById(ctx context.Context, id uuid.UUID) (postgres.Ingredient, error) {
	ingredient, err := s.DB.GetIngredientById(ctx, id)
	if err != nil {
		return postgres.Ingredient{}, err
	}
	return ingredient, nil
}
