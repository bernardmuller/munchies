include .env

docker-compose-build:
	@docker compose -f docker/docker-compose.yml build --no-cache

docker-compose-up:
	@docker-compose -f docker/docker-compose.yml up -d

docker-compose-down:
	@docker-compose -f docker/docker-compose.yml down

docker-build-backend-service:
	@docker build -t munchies-backend -f docker/monolith/Dockerfile --build-arg POSTGRES_URI={POSTGRES_URI} GOOGLE_CLIENT_ID={GOOGLE_CLIENT_ID} GOOGLE_CLIENT_SECRET={GOOGLE_CLIENT_SECRET} SESSION_SECRET={SESSION_SECRET} JWT_SECRET={JWT_SECRET} ENV={ENV} ./monolith

docker-build-web-service:
	@docker build -t web-service -f docker/web/Dockerfile ./client/web --no-cache

docker-build-web-app:
	@docker build -t web-app -f docker/web-app/Dockerfile ./client/web-app --no-cache

docker-build-all-services:
	@echo "Building all services..."
	@make docker-build-backend-service & make docker-build-web-service

docker-run:
	@make docker-build-all-services
	@echo "Running all services..."
	@make run-local-db
	@docker run -dp 8001:8001 plants-service
	@docker run -dp 8000:8000 web-service

run-local-db:
	@cd ./docker/local && docker-compose up -d

run-plants-service:
	@go run services/plants-service/main.go

run-all-services:
	@echo "Running all services..."
	@make run-plants-service & make run-web-service

db_migrate_up:
	@echo "Migrating up..."
	@cd ./store/postgres/schema &&	goose postgres ${POSTGRES_URI} up

db_migrate_down:
	@echo "Migrating down..."
	@cd ./store/postgres/schema &&	goose postgres ${POSTGRES_URI} down

db_generate_queries:
	@echo "Generating queries..."
	@sqlc generate

run-api: 
	@go run ./monolith/main.go

run-client:
	@cd ./client/web-app && npm run dev

# Live Reload
#watch:
#	@if command -v air > /dev/null; then \
#	    air; \
#	    echo "Watching...";\
#	else \
#	    read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
#	    if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
#	        go install github.com/cosmtrek/air@latest; \
#	        air; \
#	        echo "Watching...";\
#	    else \
#	        echo "You chose not to install air. Exiting..."; \
#	        exit 1; \
#	    fi; \
#	fi
