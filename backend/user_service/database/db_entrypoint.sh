#!/bin/bash

cd database
echo "Initialising db..."
npx prisma generate
npx prisma db push
cd ..
echo "Starting application"
exec "$@"
