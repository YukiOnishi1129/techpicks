#!/usr/bin/env bash

sqlboiler psql \
    -c batch-service/database/sqlboiler.toml \
    -o batch-service/entity \
    -p entity \
    --no-tests --wipe
