FROM nginx

COPY conf/nginx.conf /etc/nginx/nginx.prod.conf
COPY dist/ /frontend/dist
COPY start-up.sh /start-up.sh
RUN chmod +x /start-up.sh
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

ENTRYPOINT ["/start-up.sh"]
