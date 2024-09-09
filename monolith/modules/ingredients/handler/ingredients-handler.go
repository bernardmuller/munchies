package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"

	"github.com/bernardmuller/munchies/monolith/modules/ingredients/service"
	"github.com/labstack/echo/v4"
)

type ErrorResponse struct {
  Error string
  Message string
}

type Response struct {
	Status string
	Data   interface{}
}

type IngredientsHandler struct {
	ingredientsService service.IngredientsService
}

func NewIngredientsHandler(ingredientsService *service.IngredientsService) *IngredientsHandler {
	var is service.IngredientsService
	is = *ingredientsService
	return &IngredientsHandler{
		ingredientsService: is,
	}
}

func (h *IngredientsHandler) RegisterRouter(router *echo.Echo) {
	router.GET("/ingredients", h.GetAllIngredients)
	router.GET("/ingredients/:id", h.GetIngredientById)
	router.POST("/ingredients", h.CreateIngredient)
}

func (h *IngredientsHandler) GetAllIngredients(c echo.Context) error {
	ps, err := h.ingredientsService.GetAllIngredients(c.Request().Context())
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	ingredientsSlice := make([]*service.Ingredient, len(ps))
	for i, p := range ps {
		ingredientsSlice[i] = &service.Ingredient{
			ID:         p.ID,
			Name:       p.Name,
			CategoryId: p.CategoryID.String(),
		}
	}

	// utils.WriteJSON(w, http.StatusOK, res)
	return c.JSON(http.StatusOK, ingredientsSlice)

}

func (h *IngredientsHandler) CreateIngredient(c echo.Context) error {
  var ingredient service.Ingredient

	err := json.NewDecoder(c.Request().Body).Decode(&ingredient)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error decoding request body users")
	}

  if len(ingredient.Name) == 0 {
		return c.String(http.StatusBadRequest, "Name is required")
  }

  if len(ingredient.ID) == 0 {
		return c.String(http.StatusBadRequest, "CategoryID is required")
  }

  newIngredient, err := h.ingredientsService.CreateIngredient(c.Request().Context(), ingredient)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

  res := &Response{
		Status: "success",
		Data:   &newIngredient,
	}
	return c.JSON(http.StatusCreated, res)

}

func (h *IngredientsHandler) GetIngredientById(c echo.Context) error {
	id := c.Param("id")
  parsedId, err := uuid.Parse(id)
  if err != nil {
    return c.JSON(http.StatusNotFound, ErrorResponse{
      Error: "Ingredient not Found",
      Message: fmt.Sprintf("Ingredient with ID: %s could not be found.", id),
    })
  }
  
	ingredient, err := h.ingredientsService.GetIngredientById(c.Request().Context(), parsedId)
	if err != nil {
		return c.String(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, ingredient)
}
