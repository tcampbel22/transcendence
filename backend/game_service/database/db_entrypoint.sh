#!/bin/bash

cd /app/database
echo "Initialising game db..."
npx prisma db push
cd /app
echo "Starting game service"
exec "$@"