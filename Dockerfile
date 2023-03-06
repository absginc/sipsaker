# Base image
FROM node:latest

# Install sipsak
RUN apt-get update && \
    apt-get install -y sipsak

# Create app directory
WORKDIR /app

# Copy app.js to app directory
COPY app.js .

# Install dependencies
RUN npm install express

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
