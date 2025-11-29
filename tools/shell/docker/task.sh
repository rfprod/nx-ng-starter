#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Reports usage error.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/task.sh install-docker-ci" "install dependencies for CI docker container image (should be used from inside of docker only)"
  print_usage_tip "bash tools/shell/task.sh cleanup" "utility task, removes stopped containers and cleans up untagged images (should be used on runners which use CI container images)"
  print_usage_tip "bash tools/shell/task.sh login USERNAME PASSWORD" "docker login, requires a user name and a password"
  print_gap

  exit 1
}

docker_login() {
  local DOCKER_REGISTRY_USER
  DOCKER_REGISTRY_USER="$1"
  local DOCKER_REGISTRY_PASS
  DOCKER_REGISTRY_PASS="$2"

  echo "${DOCKER_REGISTRY_PASS}" | docker login -u "$DOCKER_REGISTRY_USER" "$LOGIN_URL" --password-stdin
}

if [ 1 -gt $# ]; then
  print_help
elif [ "$1" = "install-docker-ci" ]; then
  ##
  # Install global dependencies required for linting, testing, and building.
  # This task should be used when building mono-ci container.
  ##
  print_info_title "Installing global dependencies required for linting, testing, and building"
  print_gap

  npm rebuild node-sass --unsafe-perm || exit 1
  # Installing yarn@1.22.18 is mandatory, yarn v2 does not have integrity check which is needed for pipelines.
  npm i --force -g yarn@1.22.19 typescript@latest @angular/cli@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest --unsafe-perm || exit 1
  print_info_message "Setting yarn cache directory"
  print_gap
  yarn config set cache-folder ~/.yarn || exit 1
  yarn install:proto:linux:ci || exit 1
  yarn install:shellcheck:linux:ci || exit 1
elif [ "$1" = "cleanup" ]; then
  ##
  # Removes stopped containers and cleans up untagged images.
  ##
  print_info_title "Cleaning up container images"
  print_gap

  EXIT_CODE=0
  DOCKER_EXISTS=$(command -v docker) || EXIT_CODE=1

  print_name_and_value "docker exists" "$DOCKER_EXISTS"
  print_name_and_value "docker checker exit code" "$EXIT_CODE"
  print_gap

  if [ "$EXIT_CODE" -eq 0 ]; then
    print_info_message "cleaning up docker: removing all stopped containers"
    print_gap
    docker rm -v -f "$(docker ps -qa)" || true

    print_info_message "cleaning up docker: removing all untagged images"
    print_gap
    docker rmi "$(docker images | grep "^<none>" | awk "{print $3}")" || true

    print_info_message "cleaning up docker: removing unused images"
    print_gap
    docker image prune -af
  else
    print_info_message "docker is not installed, nothing to clean up"
    print_gap
  fi
elif [ "$1" = "login" ]; then
  docker_login "$2" "$3"
else
  print_help
fi
