FROM golang:1.23.4-alpine3.21 AS go-builder

RUN apk update && apk add git

WORKDIR /app

COPY ./batch-service/go.mod ./
COPY ./batch-service/go.sum ./
COPY ./batch-service/cmd/article-site-and-summary-crawler ./cmd/article-site-and-summary-crawler
COPY ./batch-service/database/init_db.go ./database/init_db.go
COPY ./batch-service/domain ./domain
COPY ./batch-service/entity ./entity
COPY ./batch-service/infrastructure/api ./infrastructure/api
COPY ./batch-service/infrastructure/rss ./infrastructure/rss
COPY ./batch-service/internal ./internal

RUN go mod download \
&& go build -o main /app/cmd/article-site-and-summary-crawler/main.go


FROM alpine:3.21
WORKDIR /app
COPY --from=go-builder /app/main .

CMD ["/app/main"]