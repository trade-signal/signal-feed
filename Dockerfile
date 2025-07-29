# Use the official Node.js image as the base image
FROM node:20-slim AS base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Set the npm registry to the mirror
RUN npm config set registry https://registry.npmmirror.com

# Install the application dependencies and dotenv-cli
RUN npm install && npm install -g dotenv-cli

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Set timezone
ARG tz=Asia/Shanghai
RUN  ln -sf /usr/share/zoneinfo/$tz /etc/localtime \
  && echo $tz > /etc/timezone

# Expose the application port
EXPOSE 8000

# Command to run the application with dotenv
CMD ["dotenv", "-e", ".env", "node", "dist/main"]