package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID
	ClerkID   string
	Email     string
	Firstname string
	Lastname  string
	RoleID    uuid.UUID
	Image     string
	Status    string
}

type UsersService struct {
	DB *postgres.Queries
}

func NewUsersService(db *postgres.Queries) *UsersService {
	return &UsersService{
		DB: db,
	}
}

func (s *UsersService) CreateUser(c context.Context, user User) (postgres.User, error) {
	params := postgres.CreateUserParams{
		ID:        user.ID,
		Firstname: sql.NullString{String: user.Firstname, Valid: true},
		Lastname:  sql.NullString{String: user.Lastname, Valid: true},
		ClerkID:   user.ClerkID,
		Email:     user.Email,
		RoleID:    user.RoleID,
	}

	newUser, createErr := s.DB.CreateUser(c, params)
	if createErr != nil {
		return postgres.User{}, createErr
	}

	return newUser, nil
}

func (s *UsersService) GetAllUsers(ctx context.Context) ([]postgres.User, error) {
	users, err := s.DB.GetAllUsers(ctx)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return users, nil

}

func (s *UsersService) GetUserById(ctx context.Context, id uuid.UUID) (postgres.GetUserByIdRow, error) {
	user, err := s.DB.GetUserById(ctx, id)
	if err != nil {
		return postgres.GetUserByIdRow{}, err
	}
	return user, nil
}

func (s *UsersService) GetUserByClerkId(ctx context.Context, id string) (postgres.User, error) {
	user, _ := s.DB.GetUserByClerkId(ctx, id)
	return user, nil
}

func (s *UsersService) AuthenticateUser(ctx context.Context, token string) (uuid.UUID, error) {
	client, err := clerk.NewClient("sk_test_QHX2uBzr3J6aCQAEkgoB6MT5arX4TOXeWxakadF806")
	if err != nil {
		return uuid.Nil, errors.New("Unable to create new clerk client.")
	}

	sessClaims, err := clerk.Client.VerifyToken(client, token)
	if err != nil {
		return uuid.Nil, err
	}

	user, err := s.GetUserByClerkId(ctx, sessClaims.Subject)
	if err != nil {
		return uuid.Nil, errors.New("Unable to find user by Clerk Id")
	}

	return user.ID, nil
}

func (s *UsersService) UpdateUserHousoldId(ctx context.Context, userId uuid.UUID, householdId uuid.UUID) (postgres.User, error) {
	params := postgres.UpdateUserHouseholdIdParams{
		ID:          userId,
		HouseholdID: uuid.NullUUID{UUID: householdId, Valid: true},
	}
	user, err := s.DB.UpdateUserHouseholdId(ctx, params)
	if err != nil {
		return postgres.User{}, err
	}

	return user, nil
}
