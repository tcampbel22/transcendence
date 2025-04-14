FROM nginx:1.27-alpine

RUN mkdir -p /var/log/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY ssl/cert.pem /etc/nginx/ssl/cert.pem
COPY ssl/key.pem /etc/nginx/ssl/key.pem

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
