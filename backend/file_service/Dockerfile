FROM node:23-alpine

WORKDIR /app/

COPY package*.json /app/
COPY index.js /app/

RUN npm install --production

COPY /dist /app/dist/

CMD [ "node", "/app/index.js" ]
