# frontend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy project files
COPY . /app/

# Build the app
RUN npm run build

# Install a static server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the static server
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:3000"]
