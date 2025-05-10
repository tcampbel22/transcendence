FROM node:23-slim

RUN apt-get update && apt-get install -y \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app/
RUN mkdir api public

COPY package*.json /app/
COPY ssl/cert.pem /app/ssl/cert.pem
COPY ssl/key.pem /app/ssl/key.pem
RUN npm install --production

COPY api /app/api/
COPY public /app/public/
COPY index.js /app/

CMD [ "node", "/app/index.js" ]
