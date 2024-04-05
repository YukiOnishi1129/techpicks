empty:
	echo "empty"

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

seed:
	go run ./database/seed/seed.go


# create entity
create-entity:
	$(shell ./scripts/create-entity.sh)