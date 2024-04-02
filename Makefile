empty:
	echo "empty"

## supabase

create-migrate-file:
	supabase migration new ${name}
migrate:
	supabase migration up
reset-migrate:
	supabase db reset


# create entity
create-entity:
	$(shell ./scripts/create-entity.sh)