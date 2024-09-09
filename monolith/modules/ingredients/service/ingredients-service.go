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

func (s *IngredientsService) CreateIngredient(ctx context.Context, ingredient Ingredient) (postgres.Ingredient, error) {
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
