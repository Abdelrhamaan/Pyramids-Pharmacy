# frontend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Create a script to handle environment variables at runtime
RUN echo '#!/bin/sh' > /app/env.sh && \
    echo 'echo "window.ENV = {" > /app/build/env-config.js' && \
    echo 'echo "  REACT_APP_API_BASE_URL: \"$REACT_APP_API_BASE_URL\"," >> /app/build/env-config.js' && \
    echo 'echo "}" >> /app/build/env-config.js' && \
    chmod +x /app/env.sh

# Build the app
RUN npm run build

# Install serve
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Start script that sets up environment and runs the server
CMD ["/bin/sh", "-c", "/app/env.sh && serve -s build --single --listen tcp://0.0.0.0:3000"]