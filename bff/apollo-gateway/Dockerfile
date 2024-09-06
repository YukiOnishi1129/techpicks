FROM --platform=linux/amd64 node:20-alpine AS base

FROM base AS deps

WORKDIR /app

COPY ./bff/apollo-gateway/package.json ./bff/apollo-gateway/package-lock.json   ./

RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY ./bff/apollo-gateway .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/package-lock.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]