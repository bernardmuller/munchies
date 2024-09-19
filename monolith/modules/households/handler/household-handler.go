package handler

import (
	"log"
	"net/http"
	"time"

	"github.com/bernardmuller/munchies/monolith/modules/households/service"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type Household struct {
	ID         uuid.UUID `json:"id"`
	Createdby  uuid.UUID `json:"createdBy"`
	Createdat  time.Time `json:"createdAt"`
	Active     bool      `json:"active"`
}

// TODO: extract to internal util type
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

// TODO: extract to internal util type
type Response struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
}

type CreateHousehold struct {
	ID        string `json:"id"`
	Createdby string
}

type HouseholdsHandler struct {
	householdsService service.HouseholdsService
	usersService      us.UsersService
}

func NewHouseholdsHandler(householdsService *service.HouseholdsService, usersService *us.UsersService) *HouseholdsHandler {
	return &HouseholdsHandler{
		householdsService: *householdsService,
		usersService:      *usersService,
	}
}

func (h *HouseholdsHandler) RegisterRouter(router *echo.Echo) {
	router.POST("/households", h.CreateHousehold)
}

func (h *HouseholdsHandler) CreateHousehold(c echo.Context) error {
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
	if err == nil && user.HouseholdID.UUID.String() != "" {
		return c.JSON(http.StatusForbidden, &ErrorResponse{
			Error:   "Forbidden",
			Message: "User is already part of a household.",
		})
	}

	household, err := h.householdsService.CreateHousehold(c.Request().Context(), user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Error creating household.",
		})
	}

	_, err = h.usersService.UpdateUserHousoldId(c.Request().Context(), user.ID, household.ID)
    if err != nil {
        log.Println(err)
        return c.JSON(http.StatusInternalServerError, &ErrorResponse{
            Error:   "Internal Server Error",
            Message: "Error updating user household id.",
        })
    }

	return c.JSON(http.StatusOK, &Response{
		Status: http.StatusOK,
		Data:   &Household{
      ID: household.ID, 
      Createdby: household.Createdby, 
      Createdat: household.Createdat, 
      Active: household.Active.Bool,
    },
	})
}
