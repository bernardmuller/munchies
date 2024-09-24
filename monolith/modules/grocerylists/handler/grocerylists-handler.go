package handler

import (
	"database/sql"
	"github.com/bernardmuller/munchies/monolith/modules/grocerylists/service"
	hs "github.com/bernardmuller/munchies/monolith/modules/households/service"
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
}

func NewGrocerylistsHandler(grocerylistsService *service.GrocerylistsService, householdsService *hs.HouseholdsService, usersService *us.UsersService) *GrocerylistsHandler {
	return &GrocerylistsHandler{
		grocerylistsService: *grocerylistsService,
		householdsService:   *householdsService,
		usersService:        *usersService,
	}
}

func (h *GrocerylistsHandler) RegisterRouter(router *echo.Echo) {
	router.GET("/grocerylists/user", h.GetLatestOrCreateNewGrocerylistByUserId)
	router.GET("/grocerylists/household/:householdId", h.GetLatestGrocerylistByHouseholdId)
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
	return nil
}
