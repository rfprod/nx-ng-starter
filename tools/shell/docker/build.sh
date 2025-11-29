#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Container registry base path.
##
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported applications.
##
declare -A APPLICATIONS=(
  ["api"]="api"
  ["base"]="base"
  ["client"]="client"
  ["documentation"]="documentation"
  ["elements"]="elements"
  ["envoy"]="envoy"
  ["runner-ci"]="runner-ci"
  ["runner-ci-slim"]="runner-ci-slim"
)

##
# Supported environments.
##
declare -A ENVIRONMENTS=(
  ["development"]="-development"
  ["production"]="-production"
)

##
# Reports usage.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/build-app.sh ?" "print help"
  print_usage_tip "bash tools/shell/app.sh APPLICATION ENVIRONMENT" "build APPLICATION docker container image for a specific ENVIRONMENT"
  print_gap
  print_info_message "Supported container names"
  print_gap

  for APPLICATION_KEY in "${!APPLICATIONS[@]}"; do
    print_value "${APPLICATION_KEY}"
  done

  print_info_message "Supported environments"
  print_gap

  for ENVIRONMENT_KEY in "${!ENVIRONMENTS[@]}"; do
    print_value "${ENVIRONMENT_KEY}"
  done

  print_gap
}

##
# Application support checker.
##
check_application_support() {
  print_info_title "<< Checking application support >>"
  print_name_and_value "environment" "$1"
  print_gap

  local KEY
  KEY="$1"

  if [ -z "$KEY" ]; then
    print_error_title "Application was not provided"
    print_gap

    print_help
    exit 1
  elif [ -z "${APPLICATIONS[$KEY]}" ]; then
    print_error_title "Application does not exist"
    print_name_and_value "application key" "$KEY"
    print_gap

    print_help
    exit 1
  else
    print_success_title "Application exists, proceeding"
    print_gap
  fi
}

##
# Environment support checker.
##
check_environment_support() {
  print_info_title "<< Checking environment support >>"
  print_name_and_value "environment" "$1"
  print_gap

  local KEY
  KEY="$1"

  if [ -z "${ENVIRONMENTS[$KEY]}" ]; then
    print_error_title "Environment does not exist"
    print_name_and_value "environment key" "$KEY"
    print_gap

    print_help
    exit 1
  else
    print_success_title "Environment exists, proceeding"
    print_gap
  fi
}

##
# Builds an application image.
##
build_application_image() {
  print_info_title "<< Building Docker container image >>"
  print_name_and_value "application" "$1"
  print_name_and_value "environment" "$2"
  print_gap

  local APP_NAME
  APP_NAME=$1
  local ENV_NAME
  ENV_NAME=$2

  # if application name has a suffix -e2e, or a suffix -ci, or is the base image, or the documentation app image, or the envoy image, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "${APP_NAME##*"-ci"*}" && "$APP_NAME" != "base" && "$APP_NAME" != "documentation" && "$APP_NAME" != "envoy" && -z "$ENV_NAME" ]]; then
    print_warning_message "Environment name was not provided."
    print_gap

    print_help
    exit 1
  fi

  check_application_support "$APP_NAME"

  local IMAGE_NAME

  # if application name has a suffix -e2e, or a suffix -ci, or is the base image, or the documentation app image, or the envoy image, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "${APP_NAME##*"runner-ci"*}" && "$APP_NAME" != "base" && "$APP_NAME" != "documentation" && "$APP_NAME" != "envoy" ]]; then
    check_environment_support "$ENV_NAME"
    IMAGE_NAME="$CONTAINER_REGISTRY":"$APP_NAME"-"$ENV_NAME""-latest"
  else
    IMAGE_NAME="$CONTAINER_REGISTRY":"$APP_NAME""-latest"
  fi

  docker build -t "$IMAGE_NAME" -f .docker/"$APP_NAME".Dockerfile .
}

if [ "$1" = "?" ]; then
  print_help
else
  build_application_image "$1" "$2"
fi
