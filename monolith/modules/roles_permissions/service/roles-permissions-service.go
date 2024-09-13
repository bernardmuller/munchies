package service

import (
	_ "database/sql"
	"fmt"

	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/labstack/echo/v4"
)

type RolesPermissionsService struct {
	DB *postgres.Queries
}

func NewRolesPermissionsService(db *postgres.Queries) *RolesPermissionsService {
	return &RolesPermissionsService{
		DB: db,
	}
}

func (s *RolesPermissionsService) GetAllRoles(c echo.Context) ([]postgres.Role, error) {
  roles, err := s.DB.GetAllRoles(c.Request().Context())
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return roles, nil
}
