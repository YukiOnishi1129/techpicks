#!/bin/bash
rpc_list=("content" "bookmark" "favorite" "my_feed")

for rpc in ${rpc_list[@]}; do
    PACKAGE="github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/${rpc}"
    SRC_PATH=$(go list -f '{{.Dir}}' $PACKAGE)
    INTERFACES=$(grep -o 'type [^ ]* interface {' $SRC_PATH/*.go | awk '{print $2}' | tr '\n' ',' | sed 's/,$//')
    if [ -n "$INTERFACES" ]; then
        mockgen -destination=internal/util/testutil/mock/${rpc}_service.go -package=mock $PACKAGE $INTERFACES
    else
        echo "No interfaces found in $PACKAGE"
    fi
done