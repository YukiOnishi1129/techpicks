# Check Picks Monorepo

Check Picks's monorepo

## Project





### Web

| Project name | overview | skill |
| ---- | ---- | ---- |
| [web/client-v2](https://github.com/YukiOnishi1129/techpicks/tree/main/web/client-v2) | Web frontend application | Typescript, Next.js, Apollo Client, supabase-js, shadcn ui, tailwind, Cloud Run |
| [web/admin](https://github.com/YukiOnishi1129/techpicks/tree/main/web/admin) | Control panel | Typescript, Next.js, supabase-js, shadcn ui, tailwind, Cloud Run |

<!-- ### Mobile
| Project name | overview | skill |
| ---- | ---- | ---- |
| [mobile/rn-client](https://github.com/YukiOnishi1129/techpicks/tree/main/mobile/rn-client) | Mobile application | Typescript, ReactNative, Expo | -->

### BFF
| Project name | overview | skill |
| ---- | ---- | ---- |
| [bff/apollo-gateway](https://github.com/YukiOnishi1129/techpicks/tree/main/bff/apollo-gateway) | Bff gateway | Typescript, NestJS, Apollo Server, Cloud Run |

### GraphQL Schema

https://github.com/YukiOnishi1129/techpicks/tree/develop/bff/apollo-gateway/src/schema

### Micro Service

| Project name | overview | skill |
| ---- | ---- | ---- |
| [content-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/content-service) | Content service | go, sql boiler, gRPC, Cloud Run |
| [bookmark-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/bookmark-service) | Bookmark service | go, sql boiler, gRPC, Cloud Run |
| [my-feed-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/my-feed-service) | My feed service | go, sql boiler, gRPC, Cloud Run |
| [favorite-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/favorite-service) | Favorite service | go, sql boiler, gRPC, Cloud Run |
| [user-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/user-service) | User service | go, sql boiler, gRPC, Cloud Run |
| [batch-service](https://github.com/YukiOnishi1129/techpicks/tree/main/batch-service) | Service related to batch processing | go, sql boiler, gRPC, Cloud Run Jobs |

### Protocol Buffers

https://github.com/YukiOnishi1129/checkpicks-protocol-buffers

### DB
| Project name | overview |
| ---- | ---- |
| [supabase](https://github.com/YukiOnishi1129/techpicks/tree/main/supabase) | SQL file for migration and configuration file for local DB environment |



## Getting Started

### 1. Setting environment

### [supabase](https://supabase.com/)

1. install supabase-cli into mac

```
brew install supabase/tap/supabase
```

2. local supabase start

```
make supabase-start
```

3. local supabase stop

```
make supabase-stop
```

### [sqlboiler](https://github.com/volatiletech/sqlboiler)

1. install sqlboiler & sqlboiler-psql into mac

````
go install github.com/volatiletech/sqlboiler/v4@latest
go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest
````

### [golangci-lint](https://github.com/golangci/golangci-lint)

 1. install golangci-lint into mac

```
brew install golangci-lint
```

<!-- ### [protoc-gen-go](https://grpc.io/docs/languages/go/)

1. install protoc-gen-go into mac

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

``` -->
