FROM node:23-slim

# Instalar dependencias necesarias para SQLite
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app/

# Copiar los archivos de dependencias
COPY package*.json /app/

# Instalar las dependencias de producción
RUN npm install --production

# Copiar el resto del código, incluyendo prisma/schema.prisma
COPY . /app/
COPY database/prisma /app/prisma/

# Generar el cliente de Prisma
RUN npx prisma generate --schema=/app/prisma/schema.prisma

# Comando de inicio
CMD [ "node", "/app/googleAuth.js" ]
