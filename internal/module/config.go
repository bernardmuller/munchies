package module

import (
	"errors"
	"os"

	"github.com/bernardmuller/munchies/internal/utils"
	"github.com/bernardmuller/munchies/store/postgres"
)

type PORT struct {
	HTTP string
	GRPC string
}

type ModuleConfig struct {
	Database *postgres.Queries
	PORT     PORT
}

func CreateConfig(port PORT) (*ModuleConfig, error) {
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

	config := ModuleConfig{
		Database: database,
		PORT:     port,
	}
	return &config, nil
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
