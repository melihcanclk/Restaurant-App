FROM node:alpine

ENV ENV HOST=0.0.0.0
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install