package main

import (
	"fmt"

	"github.com/bernardmuller/munchies/internal/module"
	"github.com/bernardmuller/munchies/monolith/modules/users/infrastructure"
)

func main() {
	port := module.PORT{
		HTTP: ":8001",
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
