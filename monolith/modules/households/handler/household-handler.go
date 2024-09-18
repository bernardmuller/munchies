package handler

import (
	"github.com/bernardmuller/munchies/monolith/modules/households/service"
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

type HouseholdsHandler struct {
	householdsService service.HouseholdsService
}

func NewHouseholdsHandler(householdsService *service.HouseholdsService) *HouseholdsHandler {
	return &HouseholdsHandler{
		householdsService: *householdsService,
	}
}

func (h *HouseholdsHandler) RegisterRouter(router *echo.Echo) {
	router.POST("/households", h.CreateHousehold)
}

func (h *HouseholdsHandler) CreateHousehold(c echo.Context) error {
	return nil
}
