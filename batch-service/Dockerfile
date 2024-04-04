FROM golang:1.22.0-alpine3.18

WORKDIR /app

COPY /batch-service /app

RUN go mod tidy && \
    go install github.com/cosmtrek/air@v1.46.0 &&  \
    go install github.com/volatiletech/sqlboiler/v4@latest && \
    go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest

EXPOSE 5555

CMD ["air", "-c", ".air.toml"]