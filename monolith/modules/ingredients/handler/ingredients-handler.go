package handler

import (
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/ingredients/service"
	"github.com/labstack/echo/v4"
)

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
	router.GET("/ingredients", h.GetAllIngredients);
}


func (h *IngredientsHandler) GetAllIngredients(c echo.Context) error {
  ps, err := h.ingredientsService.GetAllIngredients(c.Request().Context())
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	ingredientsSlice := make([]*service.Ingredient, len(ps))
	for i, p := range ps {
		ingredientsSlice[i] = &service.Ingredient{
			ID:        p.ID,
      Name:       p.Name.String,
      CategoryId: p.Categoryid.String,
      CreatedAt: p.Createdat,
      UpdatedAd: p.Updatedat,
		}
	}

	// utils.WriteJSON(w, http.StatusOK, res)
	return c.JSON(http.StatusOK, ingredientsSlice)

}
