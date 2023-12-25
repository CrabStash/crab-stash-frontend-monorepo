
FROM node:18-alpine AS base
 
FROM base AS builder
ARG PNPM_VERSION=8.6.2
ENV PNPM_HOME=/usr/local/bin
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set working directory
WORKDIR /app
RUN pnpm add turbo --global
COPY . .
RUN turbo prune @crab-stash/ui --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
ARG PNPM_VERSION=8.6.2
ENV PNPM_HOME=/usr/local/bin
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pmpl-lock.yaml
RUN pnpm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm run prettier:fix
RUN pnpm turbo run build --filter=ui
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 storybook
USER storybook
 
COPY --from=installer /app/packages/ui/package.json .
COPY --from=installer /app/packages/ui/storybook-static ./storybook-static
 
CMD npx --yes http-server /app/storybook-static -p 6006
