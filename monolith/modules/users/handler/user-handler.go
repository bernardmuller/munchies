package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/users/service"
	clerk "github.com/clerk/clerk-sdk-go/v2"

	clerk_users "github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UsersHttpHandler struct {
	usersService service.UsersService
}

type UserResponse struct {
	Status string
	Data   interface{}
}

func NewHttpUsersHandler(userService *service.UsersService) *UsersHttpHandler {
	var ps service.UsersService
	ps = *userService
	return &UsersHttpHandler{
		usersService: ps,
	}
}

func (h *UsersHttpHandler) RegisterRouter(router *echo.Echo) {
	router.POST("/users", h.CreateUser)
	router.GET("/users", h.GetUsers)
	router.POST("/users/import", h.ImportUser)
}

func (h *UsersHttpHandler) CreateUser(c echo.Context) error {
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

func (h *UsersHttpHandler) GetUsers(c echo.Context) error {
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

func (h *UsersHttpHandler) GetUserById(c echo.Context) error {
	userId := c.Param("id")

	p, err := h.usersService.GetUserById(c.Request().Context(), userId)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, p)
}

type RegisterUserRequest struct {
	UserId string `json:"userId"`
}

func (h *UsersHttpHandler) ImportUser(c echo.Context) error {
	fmt.Println("RegisterUser")
	var user RegisterUserRequest

	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body users")
	}
	clerk.SetKey("sk_test_QHX2uBzr3J6aCQAEkgoB6MT5arX4TOXeWxakadF806")

	usr, err := clerk_users.Get(c.Request().Context(), user.UserId)
	if err != nil {
		// handle the error
		// panic(err)
		return c.String(http.StatusNotFound, err.Error())
	}

	fmt.Println("usr => ", usr)

	return c.JSON(http.StatusOK, usr)

}

// sk_test_QHX2uBzr3J6aCQAEkgoB6MT5arX4TOXeWxakadF806
