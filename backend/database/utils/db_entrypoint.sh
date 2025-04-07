#!/bin/bash

cd ./app

echo "Initialising db..."
npx prisma generate
npx prisma db push
echo "Starting application"
exec "$@"