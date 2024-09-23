package handler

import (
	"github.com/bernardmuller/munchies/monolith/modules/items/service"
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

type ItemsHandler struct {
	itemsService service.ItemsService
	usersService      us.UsersService
}

func NewItemsHandler(itemsService *service.ItemsService, usersService *us.UsersService) *ItemsHandler {
	return &ItemsHandler{
    itemsService: *itemsService,
		usersService:      *usersService,
	}
}

func (h *ItemsHandler) RegisterRouter(router *echo.Echo) {
}

