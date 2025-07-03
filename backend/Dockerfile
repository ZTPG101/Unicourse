# ---- Base Stage ----
# Use a Node.js LTS version as a base image
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
# Install dependencies first to leverage Docker cache
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# ---- Build Stage ----
# Build the application using the installed dependencies
FROM dependencies AS builder
COPY . .
RUN npm run build

# ---- Production Stage ----
# Create the final, small production-ready image
FROM base AS production
ENV NODE_ENV=production

# Copy only production dependencies from the 'dependencies' stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copy the built application from the 'builder' stage
COPY --from=builder /usr/src/app/dist ./dist

# The command that will be run when the container starts
CMD ["node", "dist/main"]