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
		ID:        uuid.New(),
		Createdby: userId,
	}

	newHousehold, createErr := s.DB.CreateHousehold(ctx, params)
	if createErr != nil {
		log.Println(createErr)
		return postgres.Household{}, createErr
	}

	return newHousehold, nil
}

func (s *HouseholdsService) GetHousehold(ctx context.Context, id uuid.UUID) (postgres.Household, error) {
	household, err := s.DB.GetHouseholdById(ctx, id)
	if err != nil {
		return postgres.Household{}, err
	}
	return household, nil
}

func (s *HouseholdsService) GetHouseholdDetailsByUserId(ctx context.Context, id uuid.UUID) (postgres.GetHouseholdDetailsByUserIdRow, error) {
	household, err := s.DB.GetHouseholdDetailsByUserId(ctx, id)
	if err != nil {
		return postgres.GetHouseholdDetailsByUserIdRow{}, err
	}
	return household, nil
}

func (s *HouseholdsService) AddUserToHousehold(ctx context.Context, householdId uuid.UUID, userId uuid.UUID) error {
	params := postgres.AddUserToHouseholdParams{
		HouseholdID: uuid.NullUUID{UUID: householdId, Valid: true},
		ID:          userId,
	}
	_, err := s.DB.AddUserToHousehold(ctx, params)
	if err != nil {
		return err
	}
	return nil
}

func (s *HouseholdsService) RemoveUserFromHousehold(ctx context.Context, userId uuid.UUID) error {
	_, err := s.DB.RemoveUserFromHousehold(ctx, userId)
	if err != nil {
		return err
	}
	return nil
}

func (s *HouseholdsService) ActivateHousehold(ctx context.Context, householdId uuid.UUID) error {
	_, err := s.DB.ActivateHousehold(ctx, householdId)
	if err != nil {
		return err
	}
	return nil
}

func (s *HouseholdsService) DeactivateHousehold(ctx context.Context, householdId uuid.UUID) error {
	_, err := s.DB.DeactivateHousehold(ctx, householdId)
	if err != nil {
		return err
	}
	return nil
}

func (s *HouseholdsService) GetHouseholdByUserId(ctx context.Context, userId uuid.UUID) (postgres.Household, error) {
	hh, err := s.DB.GetHouseholdByUserId(ctx, userId)
	if err != nil {
		return postgres.Household{}, err
	}
	return hh, nil
}

func (s *HouseholdsService) GetAllHouseholdMembers(ctx context.Context, householdId uuid.UUID) ([]postgres.User, error) {
	members, err := s.DB.GetAllHouseholdMembers(ctx, uuid.NullUUID{UUID: householdId, Valid: true})
	if err != nil {
		return []postgres.User{}, err
	}
	return members, nil
}
