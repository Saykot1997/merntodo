# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy package.json and packege-lock.json fle
COPY package*.json ./
#installing nedemodules
RUN npm install
#coppy all files
COPY . .
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# server link
ENV REACT_APP_SERVER "http://localhost:8000"
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]