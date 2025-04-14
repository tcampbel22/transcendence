FROM node:23-slim

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir api database

WORKDIR /app/

COPY package*.json /app/
RUN npm install --production

COPY ./api /app/api/
COPY ./database/ /app/database/

RUN chmod +x /app/database/db_entrypoint.sh
ENTRYPOINT ["/bin/sh", "/app/database/db_entrypoint.sh"]

CMD [ "node", "/app/api/index.js" ]