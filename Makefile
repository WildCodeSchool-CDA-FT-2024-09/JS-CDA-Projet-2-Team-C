# Env
include .env
export

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
	docker system prune -af

seed-dev:
	docker compose -f docker-compose.dev.yml run coreapi npm run seed-dev

codegen:
	docker compose -f docker-compose.dev.yml run client npm run codegen

seed-full:
	docker compose -f docker-compose.dev.yml run --rm \
	-e PGPASSWORD=${POSTGRES_PASSWORD} \
	-v ./postgres/seed_scripts/full_seed.sql:/seed.sql \
	${DB_HOST} psql -U postgres -d postgres -h ${DB_HOST} -f /seed.sql
