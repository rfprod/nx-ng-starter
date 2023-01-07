#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Reports usage error.
##
reportUsageError() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/task.sh install-docker-ci" "install dependencies for CI docker container image (should be used from inside of docker only)"
  printUsageTip "bash tools/shell/task.sh cleanup" "utility task, removes stopped containers and cleans up untagged images (should be used on runners which use CI container images)"
  printUsageTip "bash tools/shell/task.sh login USERNAME PASSWORD" "docker login, requires a user name and a password"
  printGap

  exit 1
}

dockerLogin() {
  local DOCKER_REGISTRY_USER
  DOCKER_REGISTRY_USER="$1"
  local DOCKER_REGISTRY_PASS
  DOCKER_REGISTRY_PASS="$2"

  echo "${DOCKER_REGISTRY_PASS}" | docker login -u "$DOCKER_REGISTRY_USER" "$LOGIN_URL" --password-stdin
}

if [ 1 -gt $# ]; then
  reportUsageError
elif [ "$1" = "install-docker-ci" ]; then
  ##
  # Install global dependencies required for linting, testing, and building.
  # This task should be used when building mono-ci container.
  ##
  printInfoTitle "Installing global dependencies required for linting, testing, and building"
  printGap

  npm rebuild node-sass --unsafe-perm || exit 1
  # Installing yarn@1.22.18 is mandatory, yarn v2 does not have integrity check which is needed for pipelines.
  npm i --force -g yarn@1.22.19 typescript@latest @angular/cli@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest --unsafe-perm || exit 1
  printInfoMessage "Setting yarn cache directory"
  printGap
  yarn config set cache-folder ~/.yarn || exit 1
  yarn install:proto:linux:ci || exit 1
  yarn install:shellcheck:linux:ci || exit 1
elif [ "$1" = "cleanup" ]; then
  ##
  # Removes stopped containers and cleans up untagged images.
  ##
  printInfoTitle "Cleaning up container images"
  printGap

  EXIT_CODE=0
  DOCKER_EXISTS=$(command -v docker) || EXIT_CODE=1

  printNameAndValue "docker exists" "$DOCKER_EXISTS"
  printNameAndValue "docker checker exit code" "$EXIT_CODE"
  printGap

  if [ "$EXIT_CODE" -eq 0 ]; then
    printInfoMessage "cleaning up docker: removing all stopped containers"
    printGap
    docker rm -v -f "$(docker ps -qa)" || true

    printInfoMessage "cleaning up docker: removing all untagged images"
    printGap
    docker rmi "$(docker images | grep "^<none>" | awk "{print $3}")" || true

    printInfoMessage "cleaning up docker: removing unused images"
    printGap
    docker image prune -af
  else
    printInfoMessage "docker is not installed, nothing to clean up"
    printGap
  fi
elif [ "$1" = "login" ]; then
  dockerLogin "$2" "$3"
else
  reportUsageError
fi
