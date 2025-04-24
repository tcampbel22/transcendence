FROM node:23-slim

RUN apt-get update && apt-get install -y \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app/

COPY package*.json /app/
COPY .env /app/
COPY ssl/cert.pem /app/ssl/cert.pem
COPY ssl/key.pem /app/ssl/key.pem
RUN npm install --production

COPY googleAuth.js /app/

CMD [ "node", "/app/googleAuth.js" ]
