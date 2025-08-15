#!/bin/sh

echo "Loading the loading conf"
nginx -c /etc/nginx/nginx.loading.conf
echo "Loading page now live"

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
nginx_pid=$(cat /var/run/nginx.pid 2>/dev/null || echo 0)
echo "$nginx_pid"
if [ "$nginx_pid" -gt 0 ]; then
	kill -QUIT "$nginx_pid"
	while [ -e /var/run/nginx.pid ]; do
		sleep 0.5
	done
fi
echo "Loading configuration stopped."

echo "Adding prod config"
cp /etc/nginx/nginx.prod.conf /etc/nginx/nginx.conf

echo "Launching new config"
exec nginx -g "daemon off;"