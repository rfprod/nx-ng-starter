#!/bin/bash

source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Print help.
##
printHelp() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/firebase-deploy.sh ?" "print help"
  printInfoMessage "Client app"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN client" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost client" "Local environment, firebase authentication required"
  printInfoMessage "Elements app"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN elements" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost elements" "Local environment, firebase authentication required"
  printInfoMessage "API app"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN api" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost api" "Local environment, firebase authentication required"
  printInfoMessage "All apps"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost" "Local environment, firebase authentication required"
  printGap
}

##
# Project directories
##
declare -A PROJECT_DIRECTORIES=(
  ["api"]=./apps/api/
  ["client"]=./apps/client/
  ["documentation"]=./apps/documentation/
  ["elements"]=./apps/elements/
)

##
# Removes unneeded files from the project root.
##
cleanup() {
  ##
  # Delete the firebase configuration files from the project root that were previously copied from the project directory.
  ##
  rm -f ./.firebaserc ./firebase.json
  ##
  # Delete .firebase cache.
  ##
  rm -rf ./.firebase/
}

##
# Copies firebase config from the application root to the project root.
##
config() {
  printInfoTitle "<< CONFIG >>"
  printNameAndValue "project directory" "$1"
  printGap

  ##
  # Copy firebase files to the project root for deployment.
  ##
  cp "$1".firebaserc ./.firebaserc
  cp "$1"firebase.json ./firebase.json
}

##
# Deploys a client application to Firebase hosting.
##
deployHosting() {
  printInfoTitle "<< Deploying hosting >>"
  printNameAndValue "project directory" "$2"
  printGap

  config "$2"

  if [ "$1" = "localhost" ]; then
    printInfoMessage ">> deploying from localhost"
    printGap

    firebase deploy --only hosting || exit 1
  else
    printInfoMessage ">> deploying using deployment token"
    printGap

    firebase deploy --only hosting --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys an api application to Firebase functions.
##
deployFunctions() {
  printInfoTitle "<< Deploying hosting >>"
  printNameAndValue "project directory" "$2"
  printGap

  config "$2"

  if [ "$1" = "localhost" ]; then
    printInfoMessage ">> deploying from localhost, firebase auth is assumed"
    printGap

    firebase deploy --only functions || exit 1
  else
    printInfoMessage ">> deploying using deployment token"
    printGap

    firebase deploy --only functions --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys all applications.
##
deployAll() {
  deployFunctions "$1" "${PROJECT_DIRECTORIES["api"]}"
  deployHosting "$1" "${PROJECT_DIRECTORIES["client"]}"
  deployHosting "$1" "${PROJECT_DIRECTORIES["elements"]}"
  deployHosting "$1" "${PROJECT_DIRECTORIES["documentation"]}"
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  printHelp
elif [ $# -ge 2 ]; then
  APP_DIRECTORY="${PROJECT_DIRECTORIES["$2"]}"
  if [ "$2" = "client" ] || [ "$2" = "elements" ] || [ "$2" = "documentation" ]; then
    deployHosting "$1" "$APP_DIRECTORY"
  elif [ "$2" = "api" ]; then
    deployFunctions "$1" "$APP_DIRECTORY"
  else
    deployAll "$1"
  fi
else
  printHelp
  exit 1
fi
