#!/bin/bash

cd database
echo "Initialising db..."
if [ "$NODE_ENV" = "production" ]; then
	npx prisma migrate deploy
else
	npx prisma generate
	npx prisma db push
fi
cd ..
echo "Starting application"
exec "$@"
