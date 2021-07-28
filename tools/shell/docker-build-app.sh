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
CONTAINER_REGISTRY=rfprod/nx-ng-starter

##
# Supported applications.
##
declare -A APPLICATIONS=(
  ["api"]="api"
  ["client"]="client"
  ["elements"]="elements"
  ["documentation"]="documentation"
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
  printInfoTitle "<< ${0} USAGE >>"
  printWarningMessage "at least one argument is expected depending on the application: \$APPLICATION \$ENVIRONMENT"
  printUsageTip "tools/shell/docker-build-app.sh ?" "print script usage"
  printUsageTip "bash tools/shell/docker-app.sh APPLICATION ENVIRONMENT" "build APPLICATION docker container image for a specific ENVIRONMENT"
  printGap
  printInfoMessage "Supported container names"
  printGap

  for APPLICATION_KEY in "${!APPLICATIONS[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}" "${APPLICATION_KEY}"
  done

  printGap
  printInfoMessage "Supported environments"
  printGap

  for ENVIRONMENT_KEY in "${!ENVIRONMENTS[@]}"; do
    printf "${DEFAULT} - ${YELLOW}%s${DEFAULT}" "${ENVIRONMENT_KEY}"
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
  ENV_NAME=$1

  if [ -z "$APP_NAME" ]; then
    printWarningMessage "Application name was not provided."
    printGap

    reportUsage
  elif [ -z "$ENV_NAME" ]; then
    printWarningMessage "Environment name was not provided."
    printGap

    reportUsage
  else
    checkApplicationSupport "$APP_NAME"
    checkEnvironmentSupport "$ENV_NAME"

    docker build -t $CONTAINER_REGISTRY/"$APP_NAME""$ENV_NAME" -f .docker/"$APP_NAME".Dockerfile .
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
else
  buildApplicationImage "$1" "$2"
fi
