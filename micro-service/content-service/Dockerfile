FROM golang:1.22-alpine3.18 AS go-builder

RUN apk update && apk add git

WORKDIR /app

COPY ./micro-service/content-service ./

RUN go mod download \
&& go build -o main /app/cmd/main.go

FROM alpine:3.18
WORKDIR /app
COPY --from=go-builder /app/main .

CMD ["/app/main"]