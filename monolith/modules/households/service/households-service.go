package service

import (
	"context"
	"time"
  
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
)

type Household struct {
	ID         uuid.UUID `json:"id"`
	Name       string    `json:"name"`
	CategoryId string    `json:"categoryId"`
	CreatedAt  time.Time `json:"createdAt"`
	Createdby  string    `json:"createdBy"`
	UpdatedAd  time.Time `json:"updatedAt"`
}

type CreateHousehold struct {
	Name       string `json:"name"`
	CategoryId string `json:"categoryId"`
}

type HouseholdsService struct {
	DB *postgres.Queries
}

func NewHouseholdsService(db *postgres.Queries) *HouseholdsService {
	return &HouseholdsService{
		DB: db,
	}
}

func (s *HouseholdsService) CreateHousehold(ctx context.Context) (postgres.Household, error) {
  return postgres.Household{}, nil
}

