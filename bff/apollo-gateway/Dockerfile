FROM node:20-alpine3.18 AS base

FROM base AS deps

WORKDIR /app

COPY ./bff/apollo-gateway/package.json ./bff/apollo-gateway/package-lock.json   ./
# COPY ./package.json ./package-lock.json   ./

RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY ./bff/apollo-gateway .
# COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/package-lock.json ./

# COPY .env .env

EXPOSE 8080

# ENV PORT 3000

CMD ["node", "dist/main"]