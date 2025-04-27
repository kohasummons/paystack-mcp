FROM node:20-slim AS builder

WORKDIR /app

ENV DOCKER=true

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src/ ./src/

# Build the application
RUN npm run build

# Start a new stage for a smaller production image
FROM node:20-slim

WORKDIR /app

# Set environment variables
ENV DOCKER=true
ENV NODE_ENV=production
ENV PAYSTACK_SECRET_KEY=${PAYSTACK_SECRET_KEY}

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/build ./build

# Run the application
CMD ["node", "build/index.js"] 