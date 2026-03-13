FROM node:20-alpine AS build                                                                                                                                            │

WORKDIR /app                                                                                                                                                            │

# Install dependencies                                                                                                                                                  │
COPY package*.json ./                                                                                                                                                   │
RUN npm install                                                                                                                                                         │

# Copy application code and build                                                                                                                                       │
COPY . .                                                                                                                                                                │
RUN npm run build                                                                                                                                                       │                                                                                                                                                  │

# Serve static files using a simple HTTP server                                                                                                                         │
# Install 'serve' package globally                                                                                                                                      │
RUN npm install -g serve                                                                                                                                                │

# Expose the port the server will run on                                                                                                                                │
EXPOSE 3000                                                                                                                                                             │

# Command to run the server                                                                                                                                             │
# 'serve' by default serves files from the current directory (which will be /app)                                                                                       │
# We specify the build output directory for 'serve'                                                                                                                     │
CMD ["serve", "-s", "dist", "-l", "3000"]