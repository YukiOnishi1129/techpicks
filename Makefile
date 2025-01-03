include .env

empty:
	echo "empty"

# docker compose
dcb:
	docker compose build
dcu:
	docker compose up -d bff
dcd:
	docker compose down

# enter the container
## bff container
bff-ssh:
	docker exec -it $(BFF_CONTAINER_NAME) sh
## content service container
content-ssh:
	docker exec -it $(CONTENT_SERVICE_CONTAINER_NAME) sh
## bookmark service container
bookmark-ssh:
	docker exec -it $(BOOKMARK_SERVICE_CONTAINER_NAME) sh

## favorite service container
favorite-ssh:
	docker exec -it $(FAVORITE_SERVICE_CONTAINER_NAME) sh

# supabase
supabase-start:
	supabase start
supabase-stop:
	supabase stop

# migration
##  make create-migrate-file name=""
create-migrate-file:
	supabase migration new ${name}
migrate:
	supabase migration up
reset-migrate:
	supabase db reset

# generate
## generate proto
# gen-proto:
# 	$(shell ./scripts/protoc-generate.sh)

# create entity
create-entity:
	$(shell ./scripts/create-entity.sh)