FROM kong:2.0.3-alpine

USER root
RUN apk update && apk add jq
COPY docker-entrypoint.sh /
COPY import.sh /
COPY /kong_dev_script /kong_dev_script
COPY service.list /
ENV KONG_DATABASE cassandra
ENV KONG_CASSANDRA_CONTACT_POINTS cassandra
ENV KONG_PROXY_ACCESS_LOG /dev/stdout
ENV KONG_ADMIN_ACCESS_LOG /dev/stdout
ENV KONG_PROXY_ERROR_LOG /dev/stderr
ENV KONG_ADMIN_ERROR_LOG /dev/stderr
ENV KONG_ADMIN_LISTEN 0.0.0.0:8001
ENV KONG_ADMIN_LISTEN_SSL 0.0.0.0:8444
