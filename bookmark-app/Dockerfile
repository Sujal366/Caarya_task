# Use Node.js official image for building the frontend
FROM node:20

# Set the working directory for the frontend
WORKDIR /app

# Copy the frontend package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the port on which the frontend will run
EXPOSE 5173

# Start the frontend application
CMD ["npm", "run", "dev"]