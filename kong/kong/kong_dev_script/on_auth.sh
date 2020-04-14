#!/bin/sh

echo "--start add termination--"

KONG_ADMIN_URL=http://localhost:8001

## list consumer
function list_consumer () {
  consumer_name=$1
  consumer_id=`curl -s --url ${KONG_ADMIN_URL}/consumers/${consumer_name} | jq -r ".id"`
  echo $consumer_id
}

## Enable Request Termination
function enable_request_termination () {
  anonymous_user_id=$1
  termination_id=`curl -s -XPOST --url ${KONG_ADMIN_URL}/plugins --data "name=request-termination" --data "consumer.id=${anonymous_user_id}" --data "config.status_code=403" --data "config.message=required authenticaion" | jq -r ".id"`
  echo ${termination_id} | tee termination_id
}

anonymous_id=`list_consumer 'anonymous'`
enable_request_termination $anonymous_id