empty:
	echo "empty"

lint:
	golangci-lint run ./...

test:
	go test -v ./...

## make test-single name="TestFunctionName"
test-single:
	go test -v -run ${name} ./...

seed:
	go run ./database/seed/main.go

create-article-batch:
	go run ./cmd/main.go