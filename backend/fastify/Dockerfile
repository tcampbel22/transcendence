FROM node:23-alpine

#Create api and database directories
RUN mkdir api database

WORKDIR /app/

COPY package*.json /app/
RUN npm install --production

COPY ./api /app/api/
COPY ./database/ /app/database/
COPY ./logs /app/logs/


RUN chmod +x /app/database/db_entrypoint.sh
ENTRYPOINT ["/bin/sh", "/app/database/db_entrypoint.sh"]

CMD [ "node", "/app/api/index.js" ]