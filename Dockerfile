# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production || npm install --omit=dev

# Copy application source code
COPY . .

# Cloud Run injects $PORT environment variable, default to 8080
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Start Express server
CMD [ "node", "server.js" ]
