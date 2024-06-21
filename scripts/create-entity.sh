#!/usr/bin/env bash

sqlboiler psql \
    -c batch-service/database/sqlboiler.toml \
    -o batch-service/entity \
    -p entity \
    --no-tests --wipe

sqlboiler psql \
    -c micro-service/article-service/database/sqlboiler.toml \
    -o micro-service/article-service/entity \
    -p entity \
    --no-tests --wipe
