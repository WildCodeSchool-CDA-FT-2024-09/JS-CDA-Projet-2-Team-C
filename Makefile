# Target: Build dev environnement
build:
	docker compose -f docker-compose.dev.yml build

rebuild:
	docker compose -f docker-compose.dev.yml build --no-cache

dev:
	docker compose -f docker-compose.dev.yml up

devdown:
	docker compose -f docker-compose.dev.yml down

stopall: 
	@docker stop $(shell docker ps -q)

prune:
	docker system prune -af --volumes
