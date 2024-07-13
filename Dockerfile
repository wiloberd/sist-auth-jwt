# Development stage
FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app using nodemon
CMD ["npm", "run", "dev"]
