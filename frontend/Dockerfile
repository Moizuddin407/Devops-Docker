# Use official Node.js image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use lightweight Nginx server for hosting React build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 for frontend
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
