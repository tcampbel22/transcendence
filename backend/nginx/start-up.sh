#!/bin/sh

nginx -c /etc/nginx/nginx.loading.conf -g 'daemon off;' &
NGINX_PID=$!

		echo "Warming up other services"
		echo "Warming up user service"
		
		http_code_user=$(curl -s -o /dev/null -w '%{http_code}' --retry 5 --retry-delay 3 --max-time 30 https://tc-user-service.fly.dev/api/health )
		if [ "$http_code_user" != "200" ] && [ "$http_code_user" != "401" ]; then
			echo "Failed to start user service: HTTP $http_code_user"
    		exit 1
		fi
		echo "User service is running"

		echo "Warming up game service"
		http_code_game=$(curl -s -o /dev/null -w '%{http_code}' --retry 5 --retry-delay 3 --max-time 30 https://tc-game-service.fly.dev/api/health)
		if [ "$http_code_game" != "200" ] && [ "$http_code_game" != "401" ]; then
			echo "Failed to start game service: HTTP $http_code_game"
    		exit 1
		fi
		echo "Game service is running"

	echo "All services responded, starting Nginx..."

cp /etc/nginx/nginx.prod.conf /etc/nginx/nginx.conf
nginx -s reload
if [ $? -ne 0 ]; then
  echo "Nginx reload failed!"
  exit 1
fi
sleep 1
# wait $NGINX_PID
# exec "nginx", "-g", "daemon off;"