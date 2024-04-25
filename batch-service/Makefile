empty:
	echo "empty"

lint:
	golangci-lint run ./...

test:
	go test -v ./...

seed:
	go run ./database/seed/main.go

create-article-batch:
	go run ./cmd/main.go