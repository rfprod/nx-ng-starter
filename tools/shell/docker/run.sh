#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Container registry base path.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported images.
# Associative array mapping: <app name | docker file name> - <docker image name>
##
declare -A IMAGES=(
  ["api-development"]="$CONTAINER_REGISTRY"":api-development-latest"
  ["api-production"]="$CONTAINER_REGISTRY"":api-production-latest"
  ["base"]="$CONTAINER_REGISTRY"":base-latest"
  ["client-development"]="$CONTAINER_REGISTRY"":client-development-latest"
  ["client-production"]="$CONTAINER_REGISTRY"":client-production-latest"
  ["documentation"]="$CONTAINER_REGISTRY"":documentation-latest"
  ["elements-development"]="$CONTAINER_REGISTRY"":elements-development-latest"
  ["elements-production"]="$CONTAINER_REGISTRY"":elements-production-latest"
  ["envoy"]="$CONTAINER_REGISTRY"":envoy-latest"
  ["runner-ci"]="$CONTAINER_REGISTRY"":runner-ci-latest"
  ["runner-ci-slim"]="$CONTAINER_REGISTRY"":runner-ci-slim-latest"
)

declare -A PORT_MAPPING=(
  ["default"]="8080:8080"
  ["envoy"]="8090:8090"
)

##
# Reports usage.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/run.sh ?" "print help"
  print_usage_tip "bash tools/shell/run.sh APPLICATION" "run APPLICATION docker container"
  print_usage_tip "bash tools/shell/run.sh APPLICATION debug" "run APPLICATION docker container in debug mode"
  print_gap

  print_info_message "Supported applications"
  print_gap

  for SUPPORTED_IMAGE_KEY in "${!IMAGES[@]}"; do
    print_value "${SUPPORTED_IMAGE_KEY}"
  done
  print_gap
}

##
# Builds Docker container image for the supported app.
##
run_container() {
  print_info_title "<< Run Docker container image: $1 >>"
  print_gap

  local APP_NAME
  APP_NAME=$1

  local IMAGE_NAME
  IMAGE_NAME=${IMAGES[$APP_NAME]}

  local PORTS_MAP
  PORTS_MAP=${PORT_MAPPING[$APP_NAME]:-"8080:8080"}

  if [ -z "$IMAGE_NAME" ]; then
    print_error_title "Application is not supported"
    print_name_and_value "application key" "$APP_NAME"
    print_gap

    print_help
    exit 1
  fi

  print_success_title "Application $APP_NAME is supported, proceeding"
  print_gap

  echo "$IMAGE_NAME"

  if [ "$2" = "debug" ]; then
    docker run --rm --name "$APP_NAME" -it -p 127.0.0.1:"$PORTS_MAP" "$IMAGE_NAME" /bin/sh
  else
    docker run --rm --name "$APP_NAME" -it -p 127.0.0.1:"$PORTS_MAP" "$IMAGE_NAME"
  fi
}

if [ "$1" = "?" ]; then
  print_help
elif [ 1 -gt $# ]; then
  print_help
  exit 1
else
  run_container "$1" "$2"
fi
