FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY index.js ./
COPY routes ./routes 

ENTRYPOINT [ "node", "index.js" ]
