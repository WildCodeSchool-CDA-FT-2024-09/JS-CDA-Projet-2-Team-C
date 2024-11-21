
DOCKER_COMPOSE_FILE_TEST = docker-compose.dev.yml

# Define the services you want to manage
SERVICE_NAME = my_service

# Target: Build dev environnement
build:
	docker compose -f docker-compose.dev.yml build

rebuild:
	docker compose -f docker-compose.dev.yml build --no-cache

dev:
	docker compose -f docker-compose.dev.yml up -d

devdown:
	docker compose -f docker-compose.dev.yml down

stopall: 
	@docker stop $(shell docker ps -q)

prune:
	docker system prune -af
