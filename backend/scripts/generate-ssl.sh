#!/bin/bash

mkdir -p ../backend/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ../backend/nginx/ssl/key.pem \
    -out ../backend/nginx/ssl/cert.pem \
    -subj "/C=FI/ST=Uusimaa/L=Helsinki/O=42/OU=42/CN=localhost"
