#!/bin/bash

source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/firebase-deploy.sh ?" "print help"
  print_info_message "Client app"
  print_usage_tip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN client" "CI environment"
  print_usage_tip "bash tools/shell/firebase-deploy.sh localhost client" "Local environment, firebase authentication required"
  print_info_message "Elements app"
  print_usage_tip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN elements" "CI environment"
  print_usage_tip "bash tools/shell/firebase-deploy.sh localhost elements" "Local environment, firebase authentication required"
  print_info_message "API app"
  print_usage_tip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN api" "CI environment"
  print_usage_tip "bash tools/shell/firebase-deploy.sh localhost api" "Local environment, firebase authentication required"
  print_info_message "All apps"
  print_usage_tip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN" "CI environment"
  print_usage_tip "bash tools/shell/firebase-deploy.sh localhost" "Local environment, firebase authentication required"
  print_gap
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
  print_info_title "<< CONFIG >>"
  print_name_and_value "project directory" "$1"
  print_gap

  ##
  # Copy firebase files to the project root for deployment.
  ##
  cp "$1".firebaserc ./.firebaserc
  cp "$1"firebase.json ./firebase.json
}

##
# Deploys a client application to Firebase hosting.
##
deploy_hosting() {
  print_info_title "<< Deploying hosting >>"
  print_name_and_value "project directory" "$2"
  print_gap

  config "$2"

  if [ "$1" = "localhost" ]; then
    print_info_message ">> deploying from localhost"
    print_gap

    firebase deploy --only hosting || exit 1
  else
    print_info_message ">> deploying using deployment token"
    print_gap

    firebase deploy --only hosting --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys an api application to Firebase functions.
##
deploy_functions() {
  print_info_title "<< Deploying hosting >>"
  print_name_and_value "project directory" "$2"
  print_gap

  config "$2"

  if [ "$1" = "localhost" ]; then
    print_info_message ">> deploying from localhost, firebase auth is assumed"
    print_gap

    firebase deploy --only functions || exit 1
  else
    print_info_message ">> deploying using deployment token"
    print_gap

    firebase deploy --only functions --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys all applications.
##
deploy_all() {
  deploy_functions "$1" "${PROJECT_DIRECTORIES["api"]}"
  deploy_hosting "$1" "${PROJECT_DIRECTORIES["client"]}"
  deploy_hosting "$1" "${PROJECT_DIRECTORIES["elements"]}"
  deploy_hosting "$1" "${PROJECT_DIRECTORIES["documentation"]}"
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  print_help
elif [ $# -ge 2 ]; then
  APP_DIRECTORY="${PROJECT_DIRECTORIES["$2"]}"
  if [ "$2" = "client" ] || [ "$2" = "elements" ] || [ "$2" = "documentation" ]; then
    deploy_hosting "$1" "$APP_DIRECTORY"
  elif [ "$2" = "api" ]; then
    deploy_functions "$1" "$APP_DIRECTORY"
  else
    deploy_all "$1"
  fi
else
  print_help
  exit 1
fi
