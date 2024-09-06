package module

import (
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/bernardmuller/munchies/internal/utils"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type PORT struct {
	HTTP string
	GRPC string
}

type Module struct {
	Database *postgres.Queries
	PORT     PORT
}

func corsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Allow-Origin")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler.ServeHTTP(w, r)
	})
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
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAccessControlAllowOrigin,
			echo.HeaderAccessControlAllowCredentials,
		},
	}))
	e.Static("/static/images", "images")
	e.Static("/static/css", "css")

	return e
}

func (m *Module) Start() error {
	router := CreateRouter()

	// userService := service.NewUsersService(m.Database)
	// userHandler := handler.NewHttpUsersHandler(userService)
	// userHandler.RegisterRouter(router)

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
