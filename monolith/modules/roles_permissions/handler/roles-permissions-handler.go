package handler

import (
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/roles_permissions/service"
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

type Role struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Permission struct {
	ID string `json:"id"`
}

type RolesPermissionsHandler struct {
	rolesPermissionService service.RolesPermissionsService
}

func NewRolesPermissionsHandler(rolesPermissionServices *service.RolesPermissionsService) *RolesPermissionsHandler {
	var rps service.RolesPermissionsService
	rps = *rolesPermissionServices
	return &RolesPermissionsHandler{
		rolesPermissionService: rps,
	}
}

func (h *RolesPermissionsHandler) RegisterRouter(router *echo.Echo) {
	router.GET("/roles", h.GetAllRoles)
}

func (h *RolesPermissionsHandler) GetAllRoles(c echo.Context) error {
	roles, _ := h.rolesPermissionService.GetAllRoles(c)
	return c.JSON(http.StatusOK, &Response{
		Status: "success",
		Data:   roles,
	})
}
