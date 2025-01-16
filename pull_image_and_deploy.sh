#!/bin/sh
# fetch-and-deploy.sh
echo "File executed" >> ./logs.txt
docker compose -f docker-compose.staged.yml down && \
    docker compose -f docker-compose.staged.yml pull && \
    docker compose -f docker-compose.staged.yml up;