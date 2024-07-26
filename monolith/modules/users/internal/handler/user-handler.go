package handler

import (
	"encoding/json"
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/users/internal/service"
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
	router.GET("/users/:id", h.GetUserById)
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

	// usersSlice := make([]*service.User, len(ps))
	// for i, p := range ps {
	// 	usersSlice[i] = &postgres.User{
	// 		ID:        p.ID,
	// 		Firstname: p.Firstname,
	// 		Lastname:  p.Lastname,
	// 	}
	// }

	res := &UserResponse{
		Status: "success",
		Data:   ps,
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
