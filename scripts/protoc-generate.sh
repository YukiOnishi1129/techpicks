#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

PROTO_FILE_DIR=./bff/apollo-gateway/src/proto
API_PROTO_FILES=$(find ${PROTO_FILE_DIR} -type f -name '*.proto')

# Content Service Generate
OUT_DIR_CONTENT_SEVICE="${ROOT_DIR}/micro-service/content-service/grpc"
PROTO_OUT_DIR_CONTENT_SEVICE="./micro-service/content-service/grpc"

## Clean all existing generated files
rm -r "${OUT_DIR_CONTENT_SEVICE}"
mkdir "${OUT_DIR_CONTENT_SEVICE}"

## Generate code at Content Service
protoc \
  -I=${PROTO_FILE_DIR} \
  --go_out=paths=source_relative:${PROTO_OUT_DIR_CONTENT_SEVICE} \
  --go-grpc_out=paths=source_relative,require_unimplemented_servers=false:${PROTO_OUT_DIR_CONTENT_SEVICE} \
  ${API_PROTO_FILES};



# BFF Generate
SRC_DIR="${ROOT_DIR}/bff/apollo-gateway/src/proto"
## Path to Protoc Plugin
PROTOC_GEN_TS_PATH="${ROOT_DIR}/bff/apollo-gateway/node_modules/.bin/protoc-gen-ts_proto"
## Directory to write generated code (.d.ts files)
OUT_DIR_BFF="${ROOT_DIR}/bff/apollo-gateway/src/grpc"

## Clean all existing generated files
rm -r "${OUT_DIR_BFF}"
mkdir "${OUT_DIR_BFF}"

## Generate code at BFF
protoc \
    --ts_proto_opt=nestJs=true \
    --plugin="${PROTOC_GEN_TS_PATH}" \
    --ts_proto_out="${OUT_DIR_BFF}" \
    --proto_path="${SRC_DIR}" \
     $(find "${SRC_DIR}" -iname "*.proto")