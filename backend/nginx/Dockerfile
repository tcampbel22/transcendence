FROM nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY dist/ /frontend/dist
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
