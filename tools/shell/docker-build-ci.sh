#!/bin/bash

source tools/shell/colors.sh ''
source tools/shell/print-utils.sh ''

##
# Container registry base path.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported applications.
##
declare -A IMAGES=(
  ["mono-ci"]="mono-ci"
  ["mono-ci-slim"]="mono-ci-slim"
)

##
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/docker-build-ci.sh ?" "print help"
  printUsageTip "bash tools/shell/docker-build-ci.sh IMAGE" "build CI docker container image"
  printGap

  printInfoMessage "Supported images"
  printGap

  for IMAGE_KEY in "${!IMAGES[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}\\n" "${IMAGE_KEY}"
  done

  exit 1
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
    printErrorTitle "Image does not exist"
    printNameAndValue "image key" "$KEY"
    printGap

    exit 1
  else
    printSuccessTitle "Image exists, proceeding"
    printGap
  fi
}

##
# Builds docker image.
##
buildDockerImage() {
  printInfoTitle "<< Building CI Docker image: $1 >>"
  printNameAndValue "image name" "$1"
  printGap

  local IMAGE_NAME
  IMAGE_NAME=$1

  if [ -z "$IMAGE_NAME" ]; then
    printWarningMessage "Image name was not provided."
    printGap

    reportUsage
  else
    checkImageSupport "$IMAGE_NAME"

    docker rmi "$CONTAINER_REGISTRY":"$IMAGE_NAME""-latest"
    docker build --force-rm -t "$CONTAINER_REGISTRY":"$IMAGE_NAME""-latest" -f .docker/"$IMAGE_NAME".Dockerfile .
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
else
  buildDockerImage "$1"
fi
