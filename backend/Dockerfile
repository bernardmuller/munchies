# FROM node:lts

# WORKDIR /app

# COPY package.json .
# COPY prisma ./prisma

# COPY . . 

# RUN npm install --force --legacy-peer-deps && npm i -g prisma --force --legacy-peer-deps && npm install @prisma/client --force --legacy-peer-deps

# ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# RUN npm config set strict-ssl false
# RUN npm uninstall bcrypt && npm i bcrypt
# RUN npx prisma generate


# EXPOSE 5000

# CMD npm start

# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Expose the application port (e.g., 3000)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]