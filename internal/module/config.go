package module

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/bernardmuller/munchies/internal/utils"
	ch "github.com/bernardmuller/munchies/monolith/modules/categories/handler"
	cs "github.com/bernardmuller/munchies/monolith/modules/categories/service"
	ih "github.com/bernardmuller/munchies/monolith/modules/ingredients/handler"
	is "github.com/bernardmuller/munchies/monolith/modules/ingredients/service"
	rph "github.com/bernardmuller/munchies/monolith/modules/roles_permissions/handler"
	rps "github.com/bernardmuller/munchies/monolith/modules/roles_permissions/service"
	uh "github.com/bernardmuller/munchies/monolith/modules/users/handler"
	us "github.com/bernardmuller/munchies/monolith/modules/users/service"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type PORT struct {
	HTTP string
	GRPC string
}

type Module struct {
	Database *postgres.Queries
	PORT     PORT
	Auth     interface{}
	Session  interface{}
}

func CreateModule(port PORT) (*Module, error) {
	if os.Getenv("ENV") != "production" {
		err := utils.InitEnv()
		if err != nil {
			return nil, err
		}
	}

	uri := os.Getenv("POSTGRES_URI")
	if uri == "" {
		return nil, errors.New("POSTGRES_URI not set in environment.")
	}

	database, err := postgres.ConnectDB(uri)
	if err != nil {
		return nil, errors.New("Error connecting to Database.")
	}

	config := Module{
		Database: database,
		PORT:     port,
	}
	return &config, nil
}

func CreateRouter() *echo.Echo {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())

	// e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	// 	AllowOrigins: []string{"http://localhost:4000/"},
	// 	AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	// 	AllowHeaders: []string{
	// 		echo.HeaderOrigin,
	// 		echo.HeaderContentType,
	// 		echo.HeaderAccept,
	// 		echo.HeaderAccessControlAllowOrigin,
	// 		echo.HeaderAccessControlAllowCredentials,
	// 	},
	// }))
	e.Static("/static/images", "images")
	e.Static("/static/css", "css")

	return e
}

type ErrorResponse struct {
	Status int    `json:"status"`
	Error  string `json:"error"`
}

// func authenticationMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
// 	return func(c echo.Context) error {
// 		if c.Request().URL.RequestURI() != "/users/authenticate" {
// 			authorization := c.Request().Header.Get("Authorization")
// 			bearerToken := strings.Split(authorization, " ")
// 			if len(bearerToken) < 2 {
// 				return c.JSON(http.StatusUnauthorized, &ErrorResponse{
// 					Status: http.StatusUnauthorized,
// 					Error:  "Unauthorized",
// 				})
// 			}
// 			authToken := bearerToken[1]
//
// 			if authToken != "Test" {
// 				return c.JSON(http.StatusUnauthorized, &ErrorResponse{
// 					Status: http.StatusUnauthorized,
// 					Error:  "Unauthorized",
// 				})
// 			}
// 		}
// 		err := next(c)
// 		return err
// 	}
// }

func authenticationMiddleware(userService *us.UsersService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if c.Request().URL.RequestURI() != "/users/authenticate" {
				authorization := c.Request().Header.Get("Authorization")
				bearerToken := strings.Split(authorization, " ")
				if len(bearerToken) < 2 {
					return c.JSON(http.StatusUnauthorized, &ErrorResponse{
						Status: http.StatusUnauthorized,
						Error:  "Unauthorized: No Token found.",
					})
				}
				authToken := bearerToken[1]

				// Use the user service to authenticate the user with the third-party service
				user, err := userService.AuthenticateUser(c.Request().Context(), authToken)
				if err != nil || user == nil {
					return c.JSON(http.StatusUnauthorized, &ErrorResponse{
						Status: http.StatusUnauthorized,
						Error:  fmt.Sprintf("Unauthorized: %s", err.Error()),
					})
				}
			}

			return next(c)
		}
	}
}

func adaptHTTPMiddleware(httpMiddleware func(http.Handler) http.Handler) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Create a custom http.Handler to wrap the Echo context
			handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				c.SetRequest(r)         // Set request from Echo context
				c.Response().Writer = w // Set response writer
				err := next(c)          // Call next handler
				if err != nil {
					c.Error(err) // Handle errors from next handler
				}
			})

			// Apply the http middleware to the handler
			httpMiddleware(handler).ServeHTTP(c.Response(), c.Request())
			return nil // Return nil since we're handling errors within the middleware
		}
	}
}

func (m *Module) Start() error {
	router := CreateRouter()

	client, err := clerk.NewClient("sk_test_QHX2uBzr3J6aCQAEkgoB6MT5arX4TOXeWxakadF806")
	if err != nil {
		return errors.New("Unable to create new clerk client.")
	}

	m.Auth = client

	userService := us.NewUsersService(m.Database)
	router.Use(authenticationMiddleware(userService))

	rolesPermissionsService := rps.NewRolesPermissionsService(m.Database)
	rolesPermissionsHandler := rph.NewRolesPermissionsHandler(rolesPermissionsService)
	rolesPermissionsHandler.RegisterRouter(router)

	userHandler := uh.NewUsersHandler(userService, rolesPermissionsService)
	userHandler.RegisterRouter(router)

	ingredientsService := is.NewIngredientsService(m.Database)
	ingredientsHandler := ih.NewIngredientsHandler(ingredientsService)
	ingredientsHandler.RegisterRouter(router)

	categoriesService := cs.NewCategoriesService(m.Database)
	categoriesHandler := ch.NewCategoriesHandler(categoriesService)
	categoriesHandler.RegisterRouter(router)

	log.Println("Starting server on", m.PORT.HTTP)

	return http.ListenAndServe(m.PORT.HTTP, router)
}

//
//type (
//	PGConfig struct {
//		Conn string `required:"true"`
//	}
//
//	AppConfig struct {
//		Environment     string
//		LogLevel        string `envconfig:"LOG_LEVEL" default:"DEBUG"`
//		PG              PGConfig
//		Rpc             rpc.RpcConfig
//		Web             web.WebConfig
//		ShutdownTimeout time.Duration `envconfig:"SHUTDOWN_TIMEOUT" default:"30s"`
//	}
//)
//
//func InitConfig() (cfg AppConfig, err error) {
//	if err = dotenv.Load(dotenv.EnvironmentFiles(os.Getenv("ENVIRONMENT"))); err != nil {
//		return
//	}
//
//	err = envconfig.Process("", &cfg)
//
//	return
//}

// This can maybe become the main module interface
//
//type Monolith interface {
//	Config() config.AppConfig
//	DB() *sql.DB
//	Logger() zerolog.Logger
//	Mux() *chi.Mux
//	RPC() *grpc.Server
//	Waiter() waiter.Waiter
//}
//
//type Module interface {
//	Startup(context.Context, Monolith) error
//}
