package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	rs "github.com/bernardmuller/munchies/monolith/modules/roles_permissions/service"
	"github.com/bernardmuller/munchies/monolith/modules/users/service"
	clerk "github.com/clerk/clerk-sdk-go/v2"

	clerk_users "github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type UsersHandler struct {
	usersService            service.UsersService
	rolesPermissionsService rs.RolesPermissionsService
}

type UserResponse struct {
	Status string
	Data   interface{}
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

func NewUsersHandler(
	userService *service.UsersService,
	rolesPermissionsService *rs.RolesPermissionsService,
) *UsersHandler {
	return &UsersHandler{
		usersService:            *userService,
		rolesPermissionsService: *rolesPermissionsService,
	}
}

func (h *UsersHandler) RegisterRouter(router *echo.Echo) {
	router.POST("/users", h.CreateUser)
	router.GET("/users", h.GetUsers)
	router.POST("/users/import", h.ImportUser)
	router.GET("/users/current", h.GetCurrentLoggedInUserByID)
}

func (h *UsersHandler) CreateUser(c echo.Context) error {
	var user service.User

	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body users")
	}

	if len(user.Firstname) == 0 {
		return c.String(http.StatusBadRequest, "Firstname is required")
	}

	if len(user.Lastname) == 0 {
		return c.String(http.StatusBadRequest, "Lastname is required")
	}

	user.ID = uuid.New()

	_, err = h.usersService.CreateUser(c.Request().Context(), user)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	res := &UserResponse{
		Status: "success",
		Data:   &user,
	}
	return c.JSON(http.StatusCreated, res)
}

func (h *UsersHandler) GetUsers(c echo.Context) error {
	ps, err := h.usersService.GetAllUsers(c.Request().Context())
	if err != nil {
		return c.String(http.StatusNoContent, err.Error())
	}

	usersSlice := make([]*service.User, len(ps))
	for i, p := range ps {
		usersSlice[i] = &service.User{
			ID:        p.ID,
			Firstname: p.Firstname.String,
			Lastname:  p.Lastname.String,
		}
	}

	res := &UserResponse{
		Status: "success",
		Data:   usersSlice,
	}
	// utils.WriteJSON(w, http.StatusOK, res)
	return c.JSON(http.StatusOK, res)
}

func (h *UsersHandler) GetUserByClerkId(c echo.Context) error {
	userId := c.Param("id")

	p, err := h.usersService.GetUserByClerkId(c.Request().Context(), userId)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, p)
}

type RegisterUserRequest struct {
	UserId string `json:"userId"`
}

func (h *UsersHandler) ImportUser(c echo.Context) error {
	var user RegisterUserRequest

	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body users")
	}
	// TODO: Extract this to a service method //
	secret := os.Getenv("CLERK_SECRET")
	if secret == "" {
		return errors.New("CLERK_SECRET not set in environment.")
	}
	clerk.SetKey(secret)

	usr, err := clerk_users.Get(c.Request().Context(), user.UserId)
	if err != nil {
		return c.String(http.StatusNotFound, err.Error())
	}
	// --------------------------------------//

	dbUser, err := h.usersService.GetUserByClerkId(c.Request().Context(), user.UserId)
	if dbUser.ClerkID != "" {
		return c.JSON(http.StatusOK, &UserResponse{
			Status: "success",
			Data:   "User already exists",
		})
	}

	userRoles, roleErr := h.rolesPermissionsService.GetAllRoles(c)
	if roleErr != nil {
		return c.JSON(http.StatusOK, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Failed to assign user to role",
		})
	}

	newDBUser := service.User{
		ID:      uuid.New(),
		Email:   *usr.PrimaryEmailAddressID,
		ClerkID: usr.ID,
		RoleID:  userRoles[0].ID,
	}

	if len(*usr.FirstName) > 0 {
		newDBUser.Firstname = *usr.FirstName
	}

	if len(*usr.LastName) > 0 {
		newDBUser.Lastname = *usr.LastName
	}

	_, err = h.usersService.CreateUser(c.Request().Context(), newDBUser)
	if err != nil {
		log.Print(err.Error())
		return c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Failed to create new user",
		})
	}

	res := &UserResponse{
		Status: "success",
		Data:   &newDBUser,
	}
	return c.JSON(http.StatusCreated, res)
}

func (h *UsersHandler) AuthenticateUserWithClerkJWT(c echo.Context) error {
	return nil
}

type User struct {
	ID            uuid.UUID `json:"id"`
	ClerkID       string    `json:"clerkId"`
	HouseholdID   uuid.UUID `json:"householdId"`
	Email         string    `json:"email"`
	Firstname     *string   `json:"firstName"`
	Lastname      *string   `json:"lastName"`
	RoleID        uuid.UUID `json:"roleId"`
	Image         *string   `json:"image"`
	Status        string    `json:"status"`
	NumberOfLists int64     `json:"numberOfLists"`
	NumberOfItems int64     `json:"numberOfItems"`
}

func (h *UsersHandler) GetCurrentLoggedInUserByID(c echo.Context) error {
	// TODO: extract to internal util function //
	userId := c.Request().Context().Value("userId").(uuid.UUID)
	fmt.Println(c.Request().Context())
	if userId == uuid.Nil {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}
	// ----------------------------------------//

	user, getErr := h.usersService.GetUserById(c.Request().Context(), userId)
	if getErr != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: fmt.Sprintf("Error getting user: %s", getErr.Error()),
		})
	}

	secret := os.Getenv("CLERK_SECRET")
	if secret == "" {
		return errors.New("CLERK_SECRET not set in environment.")
	}
	clerk.SetKey(secret)

	usr, err := clerk_users.Get(c.Request().Context(), user.ClerkID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &ErrorResponse{
			Error:   "Internal Server Error",
			Message: fmt.Sprintf("Error getting Clerk user: %s", err.Error()),
		})
	}

	activeEmail := usr.EmailAddresses[0].EmailAddress

	return c.JSON(http.StatusOK, User{
		ID:            user.ID,
		ClerkID:       usr.ID,
		HouseholdID:   user.HouseholdID.UUID,
		Email:         activeEmail,
		Firstname:     usr.FirstName,
		Lastname:      usr.LastName,
		RoleID:        user.RoleID,
		Image:         usr.ImageURL,
		Status:        user.Status.String,
		NumberOfLists: user.NumberOfLists,
		NumberOfItems: user.NumberOfItems,
	})
}
