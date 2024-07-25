package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID
	Firstname string
	Lastname  string
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
	// params := postgres.CreateUserParams{
	// 	ID:        user.ID,
	// 	Firstname: user.Firstname,
	// 	Lastname:  user.Lastname,
	// }
	// newUser, createErr := s.DB.CreateUser(c, params)
	// if createErr != nil {
	// 	return postgres.User{}, createErr
	// }
	return postgres.User{}, errors.New("not implemented")
}

func (s *UsersService) GetAllUsers(ctx context.Context) ([]User, error) {
	var res string
	var usersList []User
	connStr := "host=localhost port=5432 user=postgres password=password dbname=munchies-database-1 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	users, err := db.Query("SELECT * FROM User")
	if err != nil {
		log.Fatal(err)
	}
	defer users.Close()
	fmt.Println(users)
	for users.Next() {
		var user User
		err = users.Scan(&res)
		if err != nil {
			log.Fatal(err)
		}
		usersList = append(usersList, user)
	}

	return usersList, nil
	// users, err := s.DB.GetAllUsers(ctx)
	// if err != nil {
	// return nil, err
	// }
	// fmt.Println(users)
	// return users, nil

}

func (s *UsersService) GetUserById(ctx context.Context, id string) (postgres.User, error) {
	user, _ := s.DB.GetUserByClerkId(ctx, sql.NullString{String: id, Valid: true})
	return user, nil
}
