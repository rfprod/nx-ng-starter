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
# Supported applications.
##
declare -A APPLICATIONS=(
  ["api"]="api"
  ["client"]="client"
  ["documentation"]="documentation"
  ["elements"]="elements"
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
  printWarningMessage "two argument are expected, see examples below"
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

  exit 1
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

  if [ -z "${APPLICATIONS[$KEY]}" ]; then
    printErrorTitle "Application does not exist"
    printNameAndValue "application key" "$KEY"
    printGap

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
  printInfoTitle "<< Building Docker container image: $1 >>"
  printNameAndValue "application" "$1"
  printNameAndValue "environment" "$2"
  printGap

  local APP_NAME
  APP_NAME=$1
  local ENV_NAME
  ENV_NAME=$2

  # if application name has suffix -e2e or equals documentation, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "$APP_NAME" != "documentation" && -z "$ENV_NAME" ]]; then
    printWarningMessage "Environment name was not provided."
    printGap

    reportUsage
    exit 1
  fi

  checkApplicationSupport "$APP_NAME"

  # if application name has suffix -e2e or equals documentation, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "$APP_NAME" != "documentation" ]]; then
    checkEnvironmentSupport "$ENV_NAME"
  fi

  local IMAGE_NAME

  # if application name has suffix -e2e or equals documentation, it does not have a specific environment
  if [[ "${APP_NAME##*"-e2e"*}" && "$APP_NAME" != "documentation" ]]; then
    checkEnvironmentSupport "$ENV_NAME"
    IMAGE_NAME="$CONTAINER_REGISTRY""$APP_NAME"-"$ENV_NAME"
  else
    IMAGE_NAME="$CONTAINER_REGISTRY""$APP_NAME"
  fi

  docker build -t "$IMAGE_NAME":latest -f .docker/"$APP_NAME".Dockerfile .
}

if [ "$1" = "?" ]; then
  reportUsage
else
  buildApplicationImage "$1" "$2"
fi
