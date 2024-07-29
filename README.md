# Check Picks Monorepo

Check Picks's monorepo

## Project





### Web

| Project name | overview | skill |
| ---- | ---- | ---- |
| [web/client](https://github.com/YukiOnishi1129/techpicks/tree/main/web/client) | Web frontend application | Typescript, Next.js |
| [web/admin](https://github.com/YukiOnishi1129/techpicks/tree/main/web/admin) | Control panel | Typescript, Next.js |

### Mobile
| Project name | overview | skill |
| ---- | ---- | ---- |
| [mobile/rn-client](https://github.com/YukiOnishi1129/techpicks/tree/main/mobile/rn-client) | Mobile application | Typescript, ReactNative, Expo |

## BFF
| Project name | overview | skill |
| ---- | ---- | ---- |
| [bff/apollo-gateway](https://github.com/YukiOnishi1129/techpicks/tree/main/bff/apollo-gateway) | Bff gateway | Typescript, NestJS, Apollo Server |


### Micro Service

| Project name | overview | skill |
| ---- | ---- | ---- |
| [article-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/article-service) | Article service | go |
| [bookmark-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/bookmark-service) | Bookmark service | go |
| [feed-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/feed-service) | Feed service | go |
| [platform-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/platform-service) | Platform service | go |
| [user-service](https://github.com/YukiOnishi1129/techpicks/tree/main/micro-service/user-service) | User service | go |
| [batch-service](https://github.com/YukiOnishi1129/techpicks/tree/main/batch-service) | Service related to batch processing | go |

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
