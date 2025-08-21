#!/bin/sh

echo "Warming up other services"

check_service() {
	local service_url="$1"
	local retries
	code=$(curl -s -o /dev/null -w '%{http_code}' "$service_url" || true)
	[ "$code" = "200" ] || [ "$code" = "401" ]
}

until check_service https://tc-user-service.fly.dev/api/health; do
	sleep 1
done
echo "User service is running"

until check_service https://tc-game-service.fly.dev/api/health; do
	sleep 1
done
echo "Game service is running"


echo "All services responded, starting Nginx..."

echo "Adding prod config"
cp /etc/nginx/nginx.prod.conf /etc/nginx/nginx.conf

echo "Launching new config"
exec nginx -g "daemon off;"