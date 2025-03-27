# Step 1: Build the frontend with TypeScript
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the source files
COPY . .

RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine

# Copy the built frontend from the builder image
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/default.conf

# Expose the port that NGINX will listen on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
