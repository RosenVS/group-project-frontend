# Stage 1: Build React app
FROM node:16.17.1 as build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY ./monitoringtool-fe/package*.json ./
RUN npm install

# Copy the entire frontend code
COPY ./monitoringtool-fe/ .

# Build the React app
RUN npm run build

# Stage 2: Use NGINX to serve the built React app
FROM nginx:1.19

# Copy custom nginx configuration
COPY ./monitoringtool-fe/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html
