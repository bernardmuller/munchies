package handler

import (
	"fmt"
	"net/http"

	"github.com/bernardmuller/munchies/monolith/modules/households/service"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/labstack/echo/v4"
)

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
	// const householdData = { createdBy: userId, id: getUuid() };

	// TODO: extract to internal util function
	userId := c.Request().Context().Value("userId").(string)
	if userId == "" {
		return c.JSON(http.StatusUnauthorized, &ErrorResponse{
			Error:   "Unauthorized: User ID not found",
			Message: "No User Id found in the Authorization JWT.",
		})
	}

	fmt.Println("--------------------")
	fmt.Println("userId => %s", userId)
	fmt.Println("--------------------")

	// const user = await getUser(userId);
	// if (user?.householdid) {
	//   throw new Error('You are already part of a household');
	// }
	//
	// const res = await db.households.create({ data: householdData });
	//
	// await updateUser(res.createdBy, {
	//   householdid: res.id,
	// });
	//
	// const newHousehold = householdsModel.parse(res);
	// return newHousehold;
	return c.JSON(http.StatusOK, &Response{
		Status: http.StatusOK,
		Data:   userId,
	})
	return nil
}
