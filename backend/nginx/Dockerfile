FROM nginx:1.27-alpine

RUN mkdir -p /var/log/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY ssl/ /etc/nginx/ssl/
COPY ssl/ /etc/nginx/ssl/

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
