FROM nginx

COPY conf/loading.conf /etc/nginx/nginx.loading.conf
COPY conf/nginx.conf /etc/nginx/nginx.prod.conf
COPY dist/ /frontend/dist
COPY start-up.sh /start-up.sh
RUN chmod +x /start-up.sh
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

CMD ["/start-up.sh"]
