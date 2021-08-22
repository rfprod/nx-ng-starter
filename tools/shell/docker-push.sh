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
# Variables.
##
DOCKER_REPO=hub.docker.com
##
# Docker registry.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported images.
##
declare -A IMAGES=(
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
# Reports usage error.
##
reportUsageError() {
  printInfoTitle "<< ${0} usage >>"
  printWarningMessage "three arguments are expected, see examples below"
  printUsageTip "bash tools/shell/docker-push.sh USERNAME PASSWORD APPLICATION_NAME_WITH_ENVIRONMENT" "push docker image to the repository"
  printGap

  printInfoMessage "Supported application names"
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
  local USERNAME
  USERNAME="$1"
  local PASSWORD
  PASSWORD="$2"
  local IMAGE
  IMAGE="$3"
  local REPO
  REPO="$4"
  # log in to registry only if username and password are provided
  if [ "$USERNAME" != "noop" ] && [ "$PASSWORD" != "noop" ]; then
    docker login -u "$USERNAME" -p "$PASSWORD" "$REPO"
  else
    if [ -z "$REGISTRY_LOGIN" ] || [ -z "$REGISTRY_PASS" ]; then
      if [ ! -f '.env' ]; then
        printInfoTitle "<< .env file does not exist and credentials were not provided >>"
        printGap

        exit 1
      else
        printInfoTitle "<< locading variables from .env file >>"
        printGap
        set -a
        # shellcheck source=./.env
        . ./.env
        set +a
      fi
    fi
  fi

  checkImageSupport "$IMAGE"

  docker push "$IMAGE"

  # Unset env values that were set before
  if [ ! -f '.env' ]; then
    printWarningMessage "<< .env file does not exist, its values were not used >>"
  else
    printSuccessTitle "<< unsettings variable values that were loaded from the .env file >>"

    unset "$(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)"
  fi
}

##
# Docker registry push control flow.
##
if [ 3 -gt $# ]; then
  reportUsageError
else
  pushDockerContainer "$1" "$2" "$3" "$DOCKER_REPO"
fi
