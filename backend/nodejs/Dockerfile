FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY pong.js .

ENTRYPOINT [ "node", "pong.js" ]
