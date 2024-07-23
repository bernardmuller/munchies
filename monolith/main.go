package main

import (
	"fmt"

	"github.com/bernardmuller/plantpal/internal/module"
	"github.com/bernardmuller/plantpal/services/plants-service/internal/infrastructure"
)

func main() {
	port := module.PORT{
		HTTP: ":8001",
		GRPC: ":9001",
	}

	moduleConfig, err := module.CreateConfig(port)
	if err != nil {
		fmt.Println(err)
	}

	httpServer := infrastructure.NewHttpServer(moduleConfig)
	httpServer.Start()

	// grpcServer := infrastructure.NewGrpcServer(moduleConfig)
	// grpcServer.Start()
}
