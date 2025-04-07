FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY . .

COPY ./backend/database/utils/db_entrypoint.sh /app/db_entrypoint.sh

RUN chmod +x /app/db_entrypoint.sh

# ENTRYPOINT [ "node", "index.js" ]
ENTRYPOINT ["/bin/sh", "/app/db_entrypoint.sh", "npm", "start"]
