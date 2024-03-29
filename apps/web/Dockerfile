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
RUN touch .env
RUN turbo prune @crab-stash/web --docker
 
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
COPY --from=builder /app/.env ./.env
RUN pnpm run prettier:fix
ENV NEXT_PUBLIC_API_URL=https://api.crabstash.tech/ \
    NEXT_PUBLIC_DOCS_URL=https://docs.crabstash.tech
RUN pnpm turbo run build --filter=web
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
CMD node apps/web/server.js
