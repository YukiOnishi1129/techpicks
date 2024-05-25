# Check Picks Monorepo

Check Picks's monorepo

## Project

### Golang

| Project name | overview |
| ---- | ---- |
| [batch-service](https://github.com/YukiOnishi1129/techpicks/tree/main/batch-service) | Service related to batch processing |

### TypeScript

| Project name | overview |
| ---- | ---- |
| [web/client](https://github.com/YukiOnishi1129/techpicks/tree/main/web/client) | Web frontend application |
| [web/admin](https://github.com/YukiOnishi1129/techpicks/tree/main/web/admin) | Control panel |

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
