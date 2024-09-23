package handler

import (
	"github.com/bernardmuller/munchies/monolith/modules/grocerylists/service"
  hs "github.com/bernardmuller/munchies/monolith/modules/households/service"
  us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/labstack/echo/v4"
)

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

type Response struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type GrocerylistsHandler struct {
	grocerylistsService service.GrocerylistsService
	householdsService hs.HouseholdsService
	usersService      us.UsersService
}

func NewGrocerylistsHandler(grocerylistsService *service.GrocerylistsService ,householdsService *hs.HouseholdsService, usersService *us.UsersService) *GrocerylistsHandler {
	return &GrocerylistsHandler{
    grocerylistsService: *grocerylistsService,
		householdsService: *householdsService,
		usersService:      *usersService,
	}
}

func (h *GrocerylistsHandler) RegisterRouter(router *echo.Echo) {
}

