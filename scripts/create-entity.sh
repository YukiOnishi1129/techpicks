#!/usr/bin/env bash

# batch-service
sqlboiler psql \
    -c batch-service/database/sqlboiler.toml \
    -o batch-service/entity \
    -p entity \
    --no-tests --wipe

# article-service
sqlboiler psql \
    -c micro-service/article-service/database/sqlboiler.toml \
    -o micro-service/article-service/entity \
    -p entity \
    --no-tests --wipe

# bookmark-service
sqlboiler psql \
    -c micro-service/bookmark-service/database/sqlboiler.toml \
    -o micro-service/bookmark-service/entity \
    -p entity \
    --no-tests --wipe

