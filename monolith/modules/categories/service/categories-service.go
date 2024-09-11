package service

import (
	"context"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
)

type CategoriesService struct {
	DB *postgres.Queries
}

func NewCategoriesService(db *postgres.Queries) *CategoriesService {
	return &CategoriesService{
		DB: db,
	}
}

func (s *CategoriesService) GetAllCAtegories(ctx context.Context) ([]postgres.Category, error) {
	categories, err := s.DB.GetAllCategories(ctx)
	if err != nil {
		return nil, err
	}

	return categories, nil
}

func (s *CategoriesService) GetCtegoryById(ctx context.Context, id uuid.UUID) (postgres.Category, error) {
	categories, err := s.DB.GetCategoryById(ctx, id)
	if err != nil {
		return postgres.Category{}, err
	}

	return categories, nil
}
