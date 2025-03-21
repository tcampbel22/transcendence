# Step 1: Build the frontend with TypeScript
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files
COPY . .

RUN npm install -g typescript

# Build the frontend using TypeScript
RUN tsc

# Step 2: Serve with NGINX
FROM nginx:alpine

# Copy the built frontend from the builder image
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the index.html file to the NGINX directory
COPY --from=builder /app/public/index.html /usr/share/nginx/html

# Expose the port that NGINX will listen on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
