#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Docker repo name.
##
DOCKER_REPO=nx-ng-starter

##
# Container name
##
CONTAINER_NAME=envoy

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error and exits.
##
reportErrorAndExit() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW}sudo bash tools/shell/docker-build.sh envoy
    ${DEFAULT} - ${YELLOW}sudo bash tools/shell/docker-build.sh envoy:local
    ${DEFAULT}\n\n" "$TITLE"

  exitWithError
}

##
# Composes Envoy proxy for local setup.
##
composeEnvoyLocal() {
  local TITLE="<< DOCKER COMPOSE: Envoy Proxy for Local Setup >>"
  printf "
    ${GREEN}%s ${DEFAULT}\n" "$TITLE"
  docker-compose -f .devops/docker-compose.envoy.local.yml up || exitWithError
}

##
# Composes Envoy proxy for local setup.
##
composeEnvoy() {
  local TITLE="<< DOCKER COMPOSE: Envoy Proxy >>"
  printf "
    ${GREEN}%s ${DEFAULT}\n" "$TITLE"
  docker-compose -f .devops/docker-compose.envoy.yml || exitWithError
}

##
# Dockerization controls flow.
##
if [ "$1" = "envoy" ]; then
  composeEnvoy
elif [ "$1" = "envoy:local" ]; then
  composeEnvoyLocal
else
  reportErrorAndExit
fi
