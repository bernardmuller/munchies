package service

import (
	"context"
	"log"
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
}

type HouseholdsService struct {
	DB *postgres.Queries
}

func NewHouseholdsService(db *postgres.Queries) *HouseholdsService {
	return &HouseholdsService{
		DB: db,
	}
}

func (s *HouseholdsService) CreateHousehold(ctx context.Context, userId uuid.UUID) (postgres.Household, error) {
	params := postgres.CreateHouseholdParams{
		ID: uuid.New(),
    Createdby: userId,
	}

	newHousehold, createErr := s.DB.CreateHousehold(ctx, params)
  if createErr != nil {
    log.Println(createErr)
    return postgres.Household{}, createErr
  }

	return newHousehold, nil
}
