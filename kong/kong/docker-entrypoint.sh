#!/bin/sh
set -e

export KONG_NGINX_DAEMON=off

if [[ "$1" == "kong" ]]; then
  PREFIX=${KONG_PREFIX:=/usr/local/kong}
  mkdir -p $PREFIX

  if [[ "$2" == "docker-start" ]]; then
    until kong prepare -p $PREFIX && kong migrations bootstrap; do
      echo "Waiting db starting..."
      sleep 10
    done
    KONG_NGINX_DAEMON=on kong start
    /import.sh
    kong stop
    export KONG_NGINX_DAEMON=off
    kong prepare -p $PREFIX
    exec /usr/local/openresty/nginx/sbin/nginx \
      -p $PREFIX \
      -c nginx.conf
  fi
fi

exec "$@"