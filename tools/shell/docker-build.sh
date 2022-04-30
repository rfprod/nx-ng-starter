#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/print-utils.sh ''

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
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/docker-build-app.sh ?" "print help"
  printUsageTip "bash tools/shell/docker-app.sh APPLICATION ENVIRONMENT" "build APPLICATION docker container image for a specific ENVIRONMENT"
  printGap
  printInfoMessage "Supported container names"
  printGap

  for APPLICATION_KEY in "${!APPLICATIONS[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}\\n" "${APPLICATION_KEY}"
  done

  printInfoMessage "Supported environments"
  printGap

  for ENVIRONMENT_KEY in "${!ENVIRONMENTS[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}\\n" "${ENVIRONMENT_KEY}"
  done

  printGap
}

##
# Application support checker.
##
checkApplicationSupport() {
  printInfoTitle "<< Checking application support >>"
  printNameAndValue "environment" "$1"
  printGap

  local KEY
  KEY="$1"

  if [ -z "$KEY" ]; then
    printErrorTitle "Application was not provided"
    printGap

    reportUsage
    exit 1
  elif [ -z "${APPLICATIONS[$KEY]}" ]; then
    printErrorTitle "Application does not exist"
    printNameAndValue "application key" "$KEY"
    printGap

    reportUsage
    exit 1
  else
    printSuccessTitle "Application exists, proceeding"
    printGap
  fi
}

##
# Environment support checker.
##
checkEnvironmentSupport() {
  printInfoTitle "<< Checking environment support >>"
  printNameAndValue "environment" "$1"
  printGap

  local KEY
  KEY="$1"

  if [ -z "${ENVIRONMENTS[$KEY]}" ]; then
    printErrorTitle "Environment does not exist"
    printNameAndValue "environment key" "$KEY"
    printGap

    reportUsage
    exit 1
  else
    printSuccessTitle "Environment exists, proceeding"
    printGap
  fi
}

##
# Builds an application image.
##
buildApplicationImage() {
  printInfoTitle "<< Building Docker container image >>"
  printNameAndValue "application" "$1"
  printNameAndValue "environment" "$2"
  printGap

  local APP_NAME
  APP_NAME=$1
  local ENV_NAME
  ENV_NAME=$2

  # if application name has a suffix -e2e, or a suffix -ci, or is the base image, or the documentation app image, or the envoy image, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "${APP_NAME##*"-ci"*}" && "$APP_NAME" != "base" && "$APP_NAME" != "documentation" && "$APP_NAME" != "envoy" && -z "$ENV_NAME" ]]; then
    printWarningMessage "Environment name was not provided."
    printGap

    reportUsage
    exit 1
  fi

  checkApplicationSupport "$APP_NAME"

  local IMAGE_NAME

  # if application name has a suffix -e2e, or a suffix -ci, or is the base image, or the documentation app image, or the envoy image, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "${APP_NAME##*"runner-ci"*}" && "$APP_NAME" != "base" && "$APP_NAME" != "documentation" && "$APP_NAME" != "envoy" ]]; then
    checkEnvironmentSupport "$ENV_NAME"
    IMAGE_NAME="$CONTAINER_REGISTRY":"$APP_NAME"-"$ENV_NAME""-latest"
  else
    IMAGE_NAME="$CONTAINER_REGISTRY":"$APP_NAME""-latest"
  fi

  docker build -t "$IMAGE_NAME" -f .docker/"$APP_NAME".Dockerfile .
}

if [ "$1" = "?" ]; then
  reportUsage
else
  buildApplicationImage "$1" "$2"
fi
