FROM node:23-alpine

WORKDIR /app/

COPY package*.json /app/
COPY index.js /app/
COPY ssl/cert.pem /app/ssl/cert.pem
COPY ssl/key.pem /app/ssl/key.pem
RUN npm install --production

COPY /dist /app/dist/

CMD [ "node", "/app/index.js" ]
