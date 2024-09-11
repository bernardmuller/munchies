package handler

import (
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/categories/service"
	"github.com/google/uuid"
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

type CategoriesHandler struct {
	categoriesService service.CategoriesService
}

func NewCategoriesHandler(categoriesService *service.CategoriesService) *CategoriesHandler {
	var cs service.CategoriesService
	cs = *categoriesService
	return &CategoriesHandler{
		categoriesService: cs,
	}
}

func (h *CategoriesHandler) RegisterRouter(router *echo.Echo) {
	router.GET("/categories", h.GetAllCategories)
	router.GET("/categories/:id", h.GetCategoryById)
}

func (h *CategoriesHandler) GetAllCategories(c echo.Context) error {
	ps, err := h.categoriesService.GetAllCAtegories(c.Request().Context())
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	res := make([]*Category, len(ps))
	for i, p := range ps {
		res[i] = &Category{
			ID:   p.ID.String(),
			Name: p.Name,
		}
	}

	return c.JSON(http.StatusOK, res)
}

func (h *CategoriesHandler) GetCategoryById(c echo.Context) error {
	id := uuid.MustParse(c.Param("id"))

	cat, err := h.categoriesService.GetCtegoryById(c.Request().Context(), id)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	res := &Category{
		ID:   cat.ID.String(),
		Name: cat.Name,
	}

	return c.JSON(http.StatusOK, res)
}
