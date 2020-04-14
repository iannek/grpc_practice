#!/bin/sh

echo "--stop termination--"

KONG_ADMIN_URL=http://localhost:8001

termination_id=`curl -s --url  ${KONG_ADMIN_URL}/plugins |  jq -r '.data | .[] | select(.name == "request-termination") | .id'`
echo ${termination_id}

curl -s -X DELETE --url http://localhost:8001/plugins/${termination_id}