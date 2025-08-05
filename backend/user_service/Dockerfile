FROM node:23-alpine

WORKDIR /app/

COPY package*.json /app/
COPY index.js /app/
RUN npm install

COPY ./api /app/api/
COPY ./database/ /app/database/

WORKDIR /app/database
RUN npx prisma generate
WORKDIR /app

RUN chmod +x /app/database/db_entrypoint.sh
ENTRYPOINT ["/bin/sh", "/app/database/db_entrypoint.sh"]

CMD [ "node", "--use-system-ca", "/app/index.js" ]
