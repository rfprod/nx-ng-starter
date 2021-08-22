#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Printing utils.
##
source tools/shell/print-utils.sh ''

##
# Container registry.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter/

##
# Supported images.
# Associative array mapping: <app name | docker file name> - <docker image name>
##
declare -A SUPPORTED_IMAGES=(
  ["api-development"]="$CONTAINER_REGISTRY""api-development:latest"
  ["api-production"]="$CONTAINER_REGISTRY""api-production:latest"
  ["client-development"]="$CONTAINER_REGISTRY""client-development:latest"
  ["client-production"]="$CONTAINER_REGISTRY""client-production:latest"
  ["documentation"]="$CONTAINER_REGISTRY""documentation:latest"
  ["elements-development"]="$CONTAINER_REGISTRY""elements-development:latest"
  ["elements-production"]="$CONTAINER_REGISTRY""elements-production:latest"
  ["mono-ci"]="$CONTAINER_REGISTRY""mono-ci:latest"
  ["mono-ci-slim"]="$CONTAINER_REGISTRY""mono-ci-slim:latest"
)

##
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printWarningMessage "at least one argument is expected, see examples below"
  printUsageTip "bash tools/shell/docker-run.sh ?" "print help"
  printUsageTip "bash tools/shell/docker-run.sh APPLICATION" "run APPLICATION docker container"
  printUsageTip "bash tools/shell/docker-run.sh APPLICATION debug" "run APPLICATION docker container in debug mode"
  printGap

  printInfoMessage "Supported applications"
  printGap

  for SUPPORTED_IMAGE_KEY in "${!SUPPORTED_IMAGES[@]}"; do
    printValue "${SUPPORTED_IMAGE_KEY}"
  done
  printGap
}

##
# Builds Docker container image for the supported app.
##
runContainer() {
  printInfoTitle "<< Run Docker container image: $1 >>"
  printGap

  local APP_NAME
  APP_NAME=$1

  local IMAGE_NAME
  IMAGE_NAME=${SUPPORTED_IMAGES[$APP_NAME]}

  if [ -z "$IMAGE_NAME" ]; then
    printErrorTitle "Application is not supported"
    printNameAndValue "application key" "$APP_NAME"
    printGap

    reportUsage
    exit 1
  fi

  printSuccessTitle "Application $APP_NAME is supported, proceeding"
  printGap

  echo $CONTAINER_REGISTRY/"$IMAGE_NAME"

  if [ "$2" = "debug" ]; then
    docker run --rm --name "$APP_NAME" -it -p 127.0.0.1:8080:8080 "$IMAGE_NAME" /bin/sh
  else
    docker run --rm --name "$APP_NAME" -it -p 127.0.0.1:8080:8080 "$IMAGE_NAME"
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
elif [ 1 -gt $# ]; then
  reportUsage
  exit 1
else
  runContainer "$1" "$2"
fi
