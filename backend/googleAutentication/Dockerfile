FROM node:23-slim

RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/

COPY package*.json /app/
COPY .env /app/
RUN npm install --production

COPY googleAuth.js /app/

CMD [ "node", "/app/googleAuth.js" ]