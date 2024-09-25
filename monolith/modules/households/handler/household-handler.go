package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/bernardmuller/munchies/monolith/modules/households/service"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type Household struct {
	ID        uuid.UUID `json:"id"`
	Createdby uuid.UUID `json:"createdBy"`
	Createdat time.Time `json:"createdAt"`
	Active    bool      `json:"active"`
}

type HouseholdDetails struct {
	ID          string          `json:"id"`
	CreatedBy   string          `json:"createdBy"`
	CreatedAt   string          `json:"createdAt"`
	Active      bool            `json:"active"`
	Members     json.RawMessage `json:"members"`
	GroceryList json.RawMessage `json:"grocerylist"`
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
	router.GET("/households/current", h.GetHousehold)
	router.POST("/households/join", h.AddUserToHousehold)
	router.POST("/households/leave", h.RemoveUserFromHousehold)
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
	if err == nil && user.HouseholdID.UUID.String() != "00000000-0000-0000-0000-000000000000" {
		return c.JSON(http.StatusForbidden, &ErrorResponse{
			Error:   "Forbidden",
			Message: "User is already part of a household.",
		})
	}

	dbHousehold, err := h.householdsService.GetHouseholdByUserId(c.Request().Context(), user.ID)
	if err == nil {
		err := h.householdsService.ActivateHousehold(c.Request().Context(), dbHousehold.ID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, &ErrorResponse{
				Error:   "Internal Server Error",
				Message: "Error activating household.",
			})
		}

		_, err = h.usersService.UpdateUserHousoldId(c.Request().Context(), user.ID, dbHousehold.ID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, &ErrorResponse{
				Error:   "Internal Server Error",
				Message: "Failed to update user household id.",
			})
		}

		return c.JSON(http.StatusOK, &Response{
			Status: http.StatusOK,
			Data: &Household{
				ID:        dbHousehold.ID,
				Createdby: dbHousehold.Createdby,
				Createdat: dbHousehold.Createdat,
				Active:    dbHousehold.Active.Bool,
			},
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
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Error updating user household id.",
		})
	}

	return c.JSON(http.StatusOK, &Response{
		Status: http.StatusOK,
		Data: &Household{
			ID:        household.ID,
			Createdby: household.Createdby,
			Createdat: household.Createdat,
			Active:    household.Active.Bool,
		},
	})
}

func (h *HouseholdsHandler) GetHousehold(c echo.Context) error {
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
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Could not find user.",
		})
	}

	if user.HouseholdID.UUID.String() == "00000000-0000-0000-0000-000000000000" {
		return c.JSON(http.StatusOK, &ErrorResponse{
			Error:   "Not Found",
			Message: "User is not part of a household.",
		})
	}

	hh, err := h.householdsService.GetHouseholdDetailsByUserId(c.Request().Context(), userId)
	if err != nil {
		log.Printf("Error getting household details: %s", err)
		return c.JSON(http.StatusNotFound, &ErrorResponse{
			Error:   "Not Found",
			Message: "Could not find household details for current user.",
		})
	}

	res := HouseholdDetails{
		ID:          hh.ID.String(),
		CreatedBy:   hh.Createdby.String(),
		CreatedAt:   hh.Createdat.String(),
		Active:      hh.Active.Bool,
		Members:     hh.Members,
		GroceryList: hh.Grocerylist,
	}

	return c.JSON(http.StatusOK, res)
}

func (h *HouseholdsHandler) AddUserToHousehold(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	fmt.Println(userId)
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//

	var ReqBody struct {
		HouseholdID string `json:"householdId"`
	}

	err := json.NewDecoder(c.Request().Body).Decode(&ReqBody)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body")
	}

	parsedHouseholdId, err := uuid.Parse(ReqBody.HouseholdID)
	if err != nil {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Household not Found",
			Message: fmt.Sprintf("Household with ID: %s could not be found.", ReqBody.HouseholdID),
		})
	}

	household, err := h.householdsService.GetHousehold(c.Request().Context(), parsedHouseholdId)
	if err != nil || household.Active.Bool == false {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Household not Found",
			Message: fmt.Sprintf("Household with ID: %s could not be found.", parsedHouseholdId),
		})
	}

	err = h.householdsService.AddUserToHousehold(c.Request().Context(), household.ID, userId)
	if err != nil {
		return c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Error adding user to household.",
			Message: "Could not add user to household.",
		})
	}

	// res, _ := h.householdsService.GetHousehold(c.Request().Context(), household.ID)

	return c.JSON(http.StatusOK, &Response{
		Status: http.StatusOK,
		Data:   nil,
	})
}

func (h *HouseholdsHandler) RemoveUserFromHousehold(c echo.Context) error {
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
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Could not find user.",
		})
	}

	household, err := h.householdsService.GetHouseholdDetailsByUserId(c.Request().Context(), user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Error creating household.",
		})
	}

	if household.Createdby.String() == userId.String() {
		err := h.householdsService.DeactivateHousehold(c.Request().Context(), household.ID)
		if err != nil {
			log.Printf("Error deactivating household: %s", err)
		}

		members, err := h.householdsService.GetAllHouseholdMembers(c.Request().Context(), household.ID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, ErrorResponse{
				Error:   "Internal Server Error",
				Message: "Error getting household members to remove.",
			})
		}

		for _, member := range members {
			err = h.householdsService.RemoveUserFromHousehold(c.Request().Context(), member.ID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, ErrorResponse{
					Error:   "Internal Server Error",
					Message: fmt.Sprintf("Could not remove user: %s from household.", member.ID),
				})
			}
		}

	} else {
		err = h.householdsService.RemoveUserFromHousehold(c.Request().Context(), userId)
		if err != nil {
			return c.JSON(http.StatusNotFound, ErrorResponse{
				Error:   "Error adding user to household.",
				Message: "Could not add user to household.",
			})
		}
	}

	return c.JSON(http.StatusOK, &Response{
		Status: http.StatusOK,
		Data:   nil,
	})
}
