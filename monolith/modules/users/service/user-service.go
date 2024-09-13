package service

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/bernardmuller/munchies/store/postgres"
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
	// var usersList []User
	// connStr := "host=localhost port=5432 user=postgres password=password dbname=munchies-database-1 sslmode=disable"
	// db, err := sql.Open("postgres", connStr)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// query := "SELECT * FROM users"

	// rows, err := db.QueryContext(ctx, query)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer rows.Close()
	// for rows.Next() {
	// 	var user User
	// 	err = rows.Scan(&user.ID, &user.Firstname, &user.Lastname, &user.Email, &user.ClerkID, &user.Dateofbirth, &user.Role, &user.Bio, &user.Image, &user.Status, &user.Createdat, &user.Updatedat, &user.Householdid)
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}
	// 	usersList = append(usersList, user)
	// }

	// return usersList, nil
	users, err := s.DB.GetAllUsers(ctx)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return users, nil

}

func (s *UsersService) GetUserById(ctx context.Context, id string) (postgres.User, error) {
	user, _ := s.DB.GetUserByClerkId(ctx, id)
	return user, nil
}

