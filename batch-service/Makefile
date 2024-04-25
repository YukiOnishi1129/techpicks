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
	go run ./cmd/migrate-seed/main.go

create-article-site-and-summary-crawler:
	go run ./cmd/article-site-and-summary-crawler/main.go

create-article-company-crawler:
	go run ./cmd/article-company-crawler/main.go