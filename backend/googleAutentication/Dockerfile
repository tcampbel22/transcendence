FROM node:23-slim

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/

COPY package*.json /app/
RUN npm install --production

COPY serverFas.js /app/

CMD [ "node", "/app/serverFas.js" ]