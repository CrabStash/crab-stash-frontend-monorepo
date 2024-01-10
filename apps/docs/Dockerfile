# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

ARG PNPM_VERSION=8.6.2
ENV PNPM_HOME=/usr/local/bin
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set the working directory to /app
WORKDIR /app

RUN pnpm add turbo --global

# Copy package.json and package-lock.json to the working directory
COPY . .
RUN turbo prune @crab-stash/docs --docker


# Copy the content of the local apps/docs directory to the working directory
COPY apps/docs/ .

# Build the Docusaurus app
RUN pnpm install
RUN pnpm run build

# Use a lightweight Node image for the production environment
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy only the production files from the builder stage
COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/config.ts ./config.ts
COPY --from=builder /app/docusaurus.config.ts ./docusaurus.config.ts

# Define environment variable
ENV NODE_ENV=production

# Run app when the container launches
CMD npx --yes http-server ./build -p 3001
