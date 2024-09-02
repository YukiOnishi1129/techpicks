#!/usr/bin/env bash

# batch-service
sqlboiler psql \
    -c batch-service/database/sqlboiler.toml \
    -o batch-service/entity \
    -p entity \
    --no-tests --wipe

# content-service
sqlboiler psql \
    -c micro-service/content-service/internal/config/database/sqlboiler.toml \
    -o micro-service/content-service/internal/domain/entity \
    -p entity \
    --no-tests --wipe

# bookmark-service
sqlboiler psql \
    -c micro-service/bookmark-service/database/sqlboiler.toml \
    -o micro-service/bookmark-service/entity \
    -p entity \
    --no-tests --wipe

# my-feed-service
sqlboiler psql \
    -c micro-service/my-feed-service/database/sqlboiler.toml \
    -o micro-service/my-feed-service/entity \
    -p entity \
    --no-tests --wipe

# favorite-service
sqlboiler psql \
    -c micro-service/favorite-service/database/sqlboiler.toml \
    -o micro-service/favorite-service/entity \
    -p entity \
    --no-tests --wipe

# user-service
sqlboiler psql \
    -c micro-service/user-service/database/sqlboiler.toml \
    -o micro-service/user-service/entity \
    -p entity \
    --no-tests --wipe


