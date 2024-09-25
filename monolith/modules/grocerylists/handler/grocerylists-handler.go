package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/bernardmuller/munchies/monolith/modules/grocerylists/service"
	hs "github.com/bernardmuller/munchies/monolith/modules/households/service"
	is "github.com/bernardmuller/munchies/monolith/modules/items/service"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"log"
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

type Grocerylist struct {
	GrocerylistID string      `json:"id"`
	HouseholdID   interface{} `json:"householdId"`
	MenuID        interface{} `json:"mealplanID"`
	Items         interface{} `json:"items"`
}

type GrocerylistsHandler struct {
	grocerylistsService service.GrocerylistsService
	householdsService   hs.HouseholdsService
	usersService        us.UsersService
	itemsService        is.ItemsService
}

func NewGrocerylistsHandler(grocerylistsService *service.GrocerylistsService, householdsService *hs.HouseholdsService, usersService *us.UsersService, itemsService *is.ItemsService) *GrocerylistsHandler {
	return &GrocerylistsHandler{
		grocerylistsService: *grocerylistsService,
		householdsService:   *householdsService,
		usersService:        *usersService,
		itemsService:        *itemsService,
	}
}

func (h *GrocerylistsHandler) RegisterRouter(router *echo.Echo) {
	router.GET("/grocerylists/user", h.GetLatestOrCreateNewGrocerylistByUserId)
	router.GET("/grocerylists/household", h.GetLatestGrocerylistByHouseholdId)
	router.POST("/grocerylists/:id/add", h.AddItemToGrocerylist)
}

func (h *GrocerylistsHandler) GetLatestOrCreateNewGrocerylistByUserId(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//
	gl, err := h.grocerylistsService.GetLatestGrocerylistByUserId(c.Request().Context(), userId)
	if err != nil && err == sql.ErrNoRows {
		log.Println(err.Error())

		_, err := h.grocerylistsService.CreateGrocerylist(c.Request().Context(), userId)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, ErrorResponse{
				Error:   "Internal Server Error",
				Message: err.Error(),
			})
		}

		gl, err := h.grocerylistsService.GetLatestGrocerylistByUserId(c.Request().Context(), userId)
		if err != nil {
			return c.JSON(http.StatusNotFound, ErrorResponse{
				Error:   "Not Found",
				Message: "Could not find grocerylist after creation.",
			})
		}
		return c.JSON(http.StatusOK, Grocerylist{
			GrocerylistID: gl.GrocerylistID.String(),
			HouseholdID:   gl.HouseholdID,
			MenuID:        gl.MenuID,
			Items:         gl.Items,
		})
	}

	return c.JSON(http.StatusOK, Grocerylist{
		GrocerylistID: gl.GrocerylistID.String(),
		HouseholdID:   gl.HouseholdID,
		MenuID:        gl.MenuID,
		Items:         gl.Items,
	})
}

func (h *GrocerylistsHandler) GetLatestGrocerylistByHouseholdId(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//

	user, err := h.usersService.GetUserById(c.Request().Context(), userId)
	if err != nil || user.HouseholdID.UUID.String() == "00000000-0000-0000-0000-000000000000" {
		return c.JSON(http.StatusForbidden, &ErrorResponse{
			Error:   "Forbidden",
			Message: "User is not part of a household.",
		})
	}

	gl, err := h.grocerylistsService.GetLatestGrocerylistByHouseholdId(c.Request().Context(), user.HouseholdID.UUID)
	if err != nil && err == sql.ErrNoRows {
		log.Println(err.Error())

		_, err := h.grocerylistsService.CreateHouseholdGrocerylist(c.Request().Context(), userId, user.HouseholdID.UUID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, ErrorResponse{
				Error:   "Internal Server Error",
				Message: fmt.Sprintf("Error creating household grocerylist: %s", err),
			})
		}

		gl, err := h.grocerylistsService.GetLatestGrocerylistByHouseholdId(c.Request().Context(), user.HouseholdID.UUID)
		if err != nil {
			return c.JSON(http.StatusNotFound, ErrorResponse{
				Error:   "Not Found",
				Message: "Could not find grocerylist after creation.",
			})
		}

		return c.JSON(http.StatusOK, Grocerylist{
			GrocerylistID: gl.GrocerylistID.String(),
			HouseholdID:   gl.HouseholdID,
			MenuID:        gl.MenuID,
			Items:         gl.Items,
		})
	}

	return c.JSON(http.StatusOK, Grocerylist{
		GrocerylistID: gl.GrocerylistID.String(),
		HouseholdID:   gl.HouseholdID,
		MenuID:        gl.MenuID,
		Items:         gl.Items,
	})
}

func (h *GrocerylistsHandler) AddItemToGrocerylist(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//

	var ReqBody struct {
		IngredientId string `json:"ingredientId"`
	}

	err := json.NewDecoder(c.Request().Body).Decode(&ReqBody)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body")
	}

	grocerylistId := c.Param("id")

	grocerylist, err := h.grocerylistsService.GetGrocerylistById(grocerylistId)
	if err != nil || grocerylist.ID.String() == "00000000-0000-0000-0000-000000000000" {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Not Found",
			Message: fmt.Sprintf("Grocerylist with ID: %s could not be found.", grocerylistId),
		})
	}

	if grocerylist.Archived.Bool {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Not Found",
			Message: fmt.Sprintf("Grocerylist with ID: %s is archived.", grocerylistId),
		})
	}

	newItem, err := h.itemsService.CreateGrocerylistItem(c, is.CreateItem{
		IngredientId:  uuid.MustParse(ReqBody.IngredientId),
		GrocerylistId: grocerylist.ID,
		UserId:        userId,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "Internal Server Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, Response{
		Status: "success",
		Data:   newItem,
	})
}
