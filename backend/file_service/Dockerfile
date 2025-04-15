FROM node:23-alpine

#Create api and dist directories
RUN mkdir -p api dist

WORKDIR /app/

COPY package*.json /app/
COPY index.js /app/
RUN npm install --production

COPY /dist /app/dist/
COPY ./api /app/api/

CMD [ "node", "/app/index.js" ]