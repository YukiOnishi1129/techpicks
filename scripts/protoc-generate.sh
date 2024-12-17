#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

PROTO_FILE_DIR=./bff/apollo-gateway/src/proto
API_PROTO_FILES=$(find ${PROTO_FILE_DIR} -type f -name '*.proto')

# ===============================

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

# 修正: 生成されたファイルのインポート文を修正
# find "${OUT_DIR_CONTENT_SEVICE}" -name "my_feed.pb.go" -exec sed -i 's|import "github.com/YukiOnishi1129/techpicks/grpc/common"|import "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/common|g' {} +

# ===============================

# Bookmark Service Generate
OUT_DIR_BOOKMARK_SEVICE="${ROOT_DIR}/micro-service/bookmark-service/grpc"
PROTO_OUT_DIR_BOOKMARK_SEVICE="./micro-service/bookmark-service/grpc"

## Clean all existing generated files
rm -r "${OUT_DIR_BOOKMARK_SEVICE}"
mkdir "${OUT_DIR_BOOKMARK_SEVICE}"

## Generate code at Bookmark Service
protoc \
  -I=${PROTO_FILE_DIR} \
  --go_out=paths=source_relative:${PROTO_OUT_DIR_BOOKMARK_SEVICE} \
  --go-grpc_out=paths=source_relative,require_unimplemented_servers=false:${PROTO_OUT_DIR_BOOKMARK_SEVICE} \
  ${API_PROTO_FILES};

# ===============================

# My Feed Service Generate
# OUT_DIR_MY_FEED_SEVICE="${ROOT_DIR}/micro-service/my-feed-service/grpc"
# PROTO_OUT_DIR_MY_FEED_SEVICE="./micro-service/my-feed-service/grpc"

# ## Clean all existing generated files
# rm -r "${OUT_DIR_MY_FEED_SEVICE}"
# mkdir "${OUT_DIR_MY_FEED_SEVICE}"

# ## Generate code at My Feed Service
# protoc \
#   -I=${PROTO_FILE_DIR} \
#   --go_out=paths=source_relative:${PROTO_OUT_DIR_MY_FEED_SEVICE} \
#   --go-grpc_out=paths=source_relative,require_unimplemented_servers=false:${PROTO_OUT_DIR_MY_FEED_SEVICE} \
#   ${API_PROTO_FILES};

# ===============================

# Favorite Service Generate
OUT_DIR_FAVORITE_SEVICE="${ROOT_DIR}/micro-service/favorite-service/grpc"
PROTO_OUT_DIR_FAVORITE_SEVICE="./micro-service/favorite-service/grpc"

## Clean all existing generated files
rm -r "${OUT_DIR_FAVORITE_SEVICE}"
mkdir "${OUT_DIR_FAVORITE_SEVICE}"

## Generate code at Favorite Service
protoc \
  -I=${PROTO_FILE_DIR} \
  --go_out=paths=source_relative:${PROTO_OUT_DIR_FAVORITE_SEVICE} \
  --go-grpc_out=paths=source_relative,require_unimplemented_servers=false:${PROTO_OUT_DIR_FAVORITE_SEVICE} \
  ${API_PROTO_FILES};

# ===============================

# User Service Generate
OUT_DIR_USER_SEVICE="${ROOT_DIR}/micro-service/user-service/grpc"
PROTO_OUT_DIR_USER_SEVICE="./micro-service/user-service/grpc"

## Clean all existing generated files
rm -r "${OUT_DIR_USER_SEVICE}"
mkdir "${OUT_DIR_USER_SEVICE}"

## Generate code at User Service
protoc \
  -I=${PROTO_FILE_DIR} \
  --go_out=paths=source_relative:${PROTO_OUT_DIR_USER_SEVICE} \
  --go-grpc_out=paths=source_relative,require_unimplemented_servers=false:${PROTO_OUT_DIR_USER_SEVICE} \
  ${API_PROTO_FILES};

# ===============================

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
# protoc \
#     --ts_proto_opt=nestJs=true \
#     --plugin="${PROTOC_GEN_TS_PATH}" \
#     --ts_proto_out="${OUT_DIR_BFF}" \
#     --proto_path="${SRC_DIR}" \
#      $(find "${SRC_DIR}" -iname "*.proto")

cd "${ROOT_DIR}/bff/apollo-gateway"
npm run gen:proto > /dev/null 2>&1 || exit 1

# Generate mock rpc client
cd "${ROOT_DIR}/micro-service/content-service"
make gen-client-mock source=grpc/bookmark/bookmark_grpc.pb.go output=bookmark_service.go > /dev/null 2>&1 || exit 1
make gen-client-mock source=grpc/favorite/favorite_grpc.pb.go output=favorite_service.go > /dev/null 2>&1 || exit 1

cd "${ROOT_DIR}/micro-service/bookmark-service"
make gen-client-mock source=grpc/content/content_grpc.pb.go output=content_service.go > /dev/null 2>&1 || exit 1
make gen-client-mock source=grpc/favorite/favorite_grpc.pb.go output=favorite_service.go > /dev/null 2>&1 || exit 1

cd "${ROOT_DIR}/micro-service/favorite-service"
make gen-client-mock source=grpc/content/content_grpc.pb.go output=content_service.go > /dev/null 2>&1 || exit 1
make gen-client-mock source=grpc/bookmark/bookmark_grpc.pb.go output=bookmark_service.go > /dev/null 2>&1 || exit 1

