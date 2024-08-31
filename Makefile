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
reset-migrate:
	supabase db reset

# generate
## generate proto
gen-proto:
	$(shell ./scripts/protoc-generate.sh)

# create entity
create-entity:
	$(shell ./scripts/create-entity.sh)