#!/bin/bash

source tools/shell/colors.sh ''
source tools/shell/print-utils.sh ''

##
# Container registry base path.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported images.
##
declare -A IMAGES=(
  ["base"]="$CONTAINER_REGISTRY"":base-latest"
  ["api-development"]="$CONTAINER_REGISTRY"":api-development-latest"
  ["api-production"]="$CONTAINER_REGISTRY"":api-production-latest"
  ["client-development"]="$CONTAINER_REGISTRY"":client-development-latest"
  ["client-production"]="$CONTAINER_REGISTRY"":client-production-latest"
  ["documentation"]="$CONTAINER_REGISTRY"":documentation-latest"
  ["elements-development"]="$CONTAINER_REGISTRY"":elements-development-latest"
  ["elements-production"]="$CONTAINER_REGISTRY"":elements-production-latest"
  ["envoy"]="$CONTAINER_REGISTRY"":envoy-latest"
  ["mono-ci"]="$CONTAINER_REGISTRY"":mono-ci-latest"
  ["mono-ci-slim"]="$CONTAINER_REGISTRY"":mono-ci-slim-latest"
)

##
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/docker-push.sh APPLICATION_NAME_WITH_ENVIRONMENT" "push docker image to the repository"
  printGap

  printInfoMessage "Supported application names"
  printGap

  for IMAGE_KEY in "${!IMAGES[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}\\n" "${IMAGE_KEY}"
  done
}

##
# Image support checker.
##
checkImageSupport() {
  printInfoTitle "<< Checking Docker image support >>"
  printNameAndValue "name" "$1"
  printGap

  local KEY
  KEY="$1"

  if [ -z "${IMAGES[$KEY]}" ]; then
    printErrorTitle "Image is not supported"
    printNameAndValue "image key" "$KEY"
    printGap

    exit 1
  else
    printSuccessTitle "Image is supported, proceeding"
    printGap
  fi
}

##
# Pushes docker container.
##
pushDockerContainer() {
  local IMAGE_KEY
  IMAGE_KEY="$1"

  checkImageSupport "$IMAGE_KEY"

  local IMAGE
  IMAGE=${IMAGES[$IMAGE_KEY]}

  docker push "$IMAGE"
}

##
# Docker registry push control flow.
##
if [ 1 -gt $# ]; then
  reportUsage
  exit 1
elif [ "$1" == "?" ]; then
  reportUsage
else
  pushDockerContainer "$1"
fi
