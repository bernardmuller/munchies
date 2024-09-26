package handler

import (
	"fmt"
	"github.com/bernardmuller/munchies/monolith/modules/items/service"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"net/http"
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
	usersService us.UsersService
}

func NewItemsHandler(itemsService *service.ItemsService, usersService *us.UsersService) *ItemsHandler {
	return &ItemsHandler{
		itemsService: *itemsService,
		usersService: *usersService,
	}
}

func (h *ItemsHandler) RegisterRouter(router *echo.Echo) {
	router.POST("/items/:id/check", h.CheckOrUncheckItem)
}

func (h *ItemsHandler) CheckOrUncheckItem(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//

	id := c.Param("id")
	parsedId, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Item not Found",
			Message: fmt.Sprintf("Item with ID: %s could not be found.", id),
		})
	}

	item, err := h.itemsService.GetItemById(c, parsedId)
	if err != nil {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Item not Found",
			Message: fmt.Sprintf("Item with ID: %s could not be found.", id),
		})
	}

	if item.Check == false {
		_, err := h.itemsService.CheckItem(c, parsedId)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, ErrorResponse{
				Error:   "Internal Server Error",
				Message: fmt.Sprintf("Unable to check item with ID: %s.", id),
			})
		}

		return c.JSON(http.StatusOK, Response{
			Status: "success",
			Data:   nil,
		})
	} else {
		_, err := h.itemsService.UnCheckItem(c, parsedId)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, ErrorResponse{
				Error:   "Internal Server Error",
				Message: fmt.Sprintf("Unable to uncheck item with ID: %s.", id),
			})
		}

		return c.JSON(http.StatusOK, Response{
			Status: "success",
			Data:   nil,
		})
	}
}
