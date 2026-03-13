# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application code and build
COPY . .
RUN npm run build

# Serve stage
FROM node:20-alpine

# Patch OS-level vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Install 'serve' locally in the production stage
RUN npm install serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Use a non-root user for better security
USER node

# Expose port 3000 as requested
EXPOSE 3000

# Command to run the server
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]