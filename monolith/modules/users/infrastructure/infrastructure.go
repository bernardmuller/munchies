package infrastructure

import (
	"log"
	"net/http"

	"github.com/bernardmuller/munchies/internal/module"
	"github.com/bernardmuller/munchies/monolith/modules/users/internal/handler"
	"github.com/bernardmuller/munchies/monolith/modules/users/internal/service"
	"github.com/bernardmuller/munchies/store/postgres"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type httpServer struct {
	addr string
	DB   *postgres.Queries
}

// CORS middleware
func corsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")                                                                                                                // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")                                                                                 // Allowed methods
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Allow-Origin") // Allowed headers

		// If it's a preflight request, stop here
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler, which can be another middleware in the chain, or the final handler.
		handler.ServeHTTP(w, r)
	})
}

func NewHttpServer(config *module.ModuleConfig) *httpServer {
	return &httpServer{addr: config.PORT.HTTP, DB: config.Database}
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

func (s *httpServer) Start() error {
	router := CreateRouter()

	plantService := service.NewUsersService(s.DB)
	plantHandler := handler.NewHttpUsersHandler(plantService)
	plantHandler.RegisterRouter(router)

	log.Println("Starting server on", s.addr)

	return http.ListenAndServe(s.addr, router)
}
