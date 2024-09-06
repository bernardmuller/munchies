package main

import (
	"fmt"

	"github.com/bernardmuller/munchies/internal/module"
)

func main() {
	port := module.PORT{
		HTTP: ":8001",
	}

	module, err := module.CreateModule(port)
	if err != nil {
		fmt.Println(err)
	}

	module.Start()
}
