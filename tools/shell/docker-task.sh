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
# Reports usage error.
##
reportUsageError() {
  printInfoTitle "<< ${0} usage >>"
  printWarningMessage "one argument is expected, see examples below"
  printUsageTip "bash tools/shell/docker-task.sh install-docker-ci" "install dependencies for CI docker container image (should be used from inside of docker only)"
  printUsageTip "bash tools/shell/docker-task.sh cleanup" "utility task, removes stopped containers and cleans up untagged images (should be used on runners which use CI container images)"
  printGap

  exit 1
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
  npm i --force -g yarn typescript@latest @angular/cli@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest --unsafe-perm || exit 1
  printInfoMessage "Setting yarn cache directory"
  printGap
  yarn set version 1.22.1 # this is mandatory, yarn v2 does not have integrity check which is needed for pipeline
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
else
  reportUsageError
fi
