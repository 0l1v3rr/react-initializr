FROM node:16.17.0-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json /app
RUN npm install

COPY . /app

# Stage II
FROM node:16.17.0-alpine
WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000
CMD [ "npm", "start" ]