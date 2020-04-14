#!/bin/sh

echo "--start import data--"

KONG_ADMIN_URL=http://localhost:8001
SCRIPT_DIR=$(cd $(dirname $0); pwd)

## Add services
function add_kong_service () {
  service_name=$1
  service_url=$2
  service_path=$3
  curl -s -XPOST --url ${KONG_ADMIN_URL}/services --data "name=${service_name}" --data "url=${service_url}"
  add_kong_route $service_name $service_path
}

## Add routes
function add_kong_route () {
  service_name=$1
  service_path=$2
  ## If routes have existed already, skip creating route process. Because routes is not checked unique.
  route_num=`curl -s -XGET --url ${KONG_ADMIN_URL}/services/${service_name}/routes | grep '{"next":null,"data":\[\]}' | wc -l`
  if [ ${route_num} -ne 0 ]; then
    curl -s -XPOST --url ${KONG_ADMIN_URL}/services/${service_name}/routes --data "paths[]=${service_path}&preserve_host=true"
  fi
}

## Add consumer
function add_consumer () {
  consumer_name=$1
  consumer_tag=$2
  consumer_id=`curl -s -XPOST --url ${KONG_ADMIN_URL}/consumers --data "username=${consumer_name}" --data "tags=${consumer_tag}" | jq -r ".id"`
  echo $consumer_id
}

## Enable basic-auth plugin
function enable_basic_auth () {
  anonymous_user_id=$1
  login_service_name='login'
  login_route_id=`curl -s -XGET --url ${KONG_ADMIN_URL}/services/${login_service_name}/routes | jq -r '.data | .[] | .id'`
  curl -s -XPOST --url ${KONG_ADMIN_URL}/routes/${login_route_id}/plugins --data "name=basic-auth" --data "config.anonymous=${anonymous_user_id}" --data "config.hide_credentials=true"
}
## Enable jwt plugin
function enable_jwt_auth () {
  anonymous_user_id=$1
  service_name=$2
  route_id=`curl -s -XGET --url ${KONG_ADMIN_URL}/services/${service_name}/routes | jq -r '.data | .[] | .id'`
  curl -s -XPOST --url ${KONG_ADMIN_URL}/routes/${route_id}/plugins --data "name=jwt" --data "config.anonymous=${anonymous_user_id}" --data "config.claims_to_verify=exp"
}
## Enable key-auth plugin
function enable_key_auth () {
  anonymous_user_id=$1
  service_name=$2
  route_id=`curl -s -XGET --url ${KONG_ADMIN_URL}/services/${service_name}/routes | jq -r '.data | .[] | .id'`
  curl -s -XPOST --url ${KONG_ADMIN_URL}/routes/${route_id}/plugins --data "name=key-auth" --data "config.anonymous=${anonymous_user_id}"
}

## Enable Request Termination
function enable_request_termination () {
  anonymous_user_id=$1
  curl -s -XPOST --url ${KONG_ADMIN_URL}/plugins --data "name=request-termination" --data "consumer.id=${anonymous_user_id}" --data "config.status_code=403" --data "config.message=required authenticaion"
}

## Set Basic auth
function set_basic_auth () {
  user_name=$1
  user_password=$2
  curl -s -XPOST --url ${KONG_ADMIN_URL}/consumers/${user_name}/basic-auth --data "username=${user_name}" --data "password=${user_password}"
}

## Add cors
function add_kong_cors () {
  
  for i in "$@"
  do
  service_name="$i"
  curl -X POST ${KONG_ADMIN_URL}/services/${service_name}/plugins --data "name=cors" --data "config.origins=${FRONTEND_URL}" \
      --data "config.methods=GET" \
      --data "config.methods=POST" \
      --data "config.methods=PUT" \
      --data "config.methods=HEAD" \
      --data "config.methods=PATCH" \
      --data "config.methods=DELETE"
  done
  ## Default allow methods GET,HEAD,PUT,PATCH,POST
  ## restrict methods e.g. " --data "config.methods=GET" --data "config.methods=POST"
}

## response transformer
function add_response_transformer () {
  
  for i in "$@"
  do
  service_name="$i"
  curl -X POST ${KONG_ADMIN_URL}/services/${service_name}/plugins \
      --data "name=response-transformer" \
      --data "config.append.headers=X-XSS-Protection: 1; mode=block" \
      --data "config.append.headers=X-Content-Type-Options: nosniff" \
      --data "config.append.headers=x-frame-options: SAMEORIGIN" \
      --data "config.append.headers=Content-Security-Policy: default-src 'self'; img-src 'self'; media-src 'self'; script-src 'self'"

  done
}

while read line
do
  echo $line
  set -- $line
  add_kong_service $1 $2 $3
done < $SCRIPT_DIR/service.list

#admin_id=`add_consumer 'opsbear@ml.tis.co.jp' 'admin'`
#anonymous_id=`add_consumer 'anonymous' 'special'`
#collector_id=`add_consumer 'collector_user' 'special'`

#enable_basic_auth $anonymous_id
#enable_jwt_auth $anonymous_id 'core-api'
#enable_jwt_auth $anonymous_id 'logout'
#enable_key_auth $anonymous_id 'core-api'
#enable_request_termination $anonymous_id
#set_basic_auth 'opsbear@ml.tis.co.jp' 'password'
#add_kong_cors 'login' 'logout' 'core-api' 'model-api'
#add_response_transformer 'login' 'logout' 'core-api' 'model-api'
