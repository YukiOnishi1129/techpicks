empty:
	echo "empty"

lint:
	golangci-lint run ./...

test:
	go test -v ./...

## make test-single name="TestFunctionName"
test-single:
	go test -v -run ${name} ./...

## example: make gen-client-mock source=grpc/content/content_grpc.pb.go output=content_service.go 
gen-client-mock:
	mockgen -source=${source} -destination=internal/util/testutil/mock/${output} -package=mock