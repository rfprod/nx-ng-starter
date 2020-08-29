#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Project aliases.
##
source tools/shell/module-aliases.sh ''

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error.
##
reportUsageError() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED} %s\n
    ${LIGHT_RED}firebase deploy token must be provided as a first argument.\n
    ${DEFAULT}# ${LIGHT_GREEN}NX-NG-STARTER app\n
    ${DEFAULT}- CI environment - ${YELLOW}bash tools/shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN app:client\n
    ${DEFAULT}- LOCALHOST environment, firebase authentication required - ${YELLOW}bash tools/shell/firebase-deploy.sh localhost app:client\n
    ${DEFAULT}# ${LIGHT_GREEN}API app\n
    ${DEFAULT}- CI environment - ${YELLOW}bash tools/shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN app:api\n
    ${DEFAULT}- LOCALHOST environment, firebase authentication required - ${YELLOW}bash tools/shell/firebase-deploy.sh localhost app:api\n
    ${DEFAULT}- ${YELLOW}bash tools/shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN localhost app:api\n
    ${DEFAULT}# ${LIGHT_GREEN}ALL apps\n
    ${DEFAULT}- CI environment - ${YELLOW}bash tools/shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN\n
    ${DEFAULT}- LOCALHOST environment, firebase authentication required - ${YELLOW}bash tools/shell/firebase-deploy.sh localhost\n
    ${DEFAULT}\n\n" "$TITLE"

  exitWithError
}

##
# Project directories
##
declare -A PROJECT_DIRECTORIES=(
  ["api"]=./apps/api/
  ["client"]=./apps/client/
  ["documentation"]=./apps/documentation/
)

##
# Removes junky files from project root.
##
cleanup() {
  ##
  # Remove firebase files from project root which are copied there from project directory.
  ##
  rm -f ./.firebaserc ./firebase.json
}

##
# Copies firebase config from application root to project root for deployment.
##
config() {
  local TITLE="<< CONFIG >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} %s
    ${DEFAULT}" "$TITLE" "$1"
  ##
  # Copy firebase files to project root for deployment.
  # Later both will be removed.
  ##
  cp "$1".firebaserc ./.firebaserc
  cp "$1"firebase.json ./firebase.json
}

##
# Deploys client application.
##
deployClientApp() {
  config "${PROJECT_DIRECTORIES["client"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only hosting || exitWithError
  else
    firebase deploy --only hosting --token "$1" || exitWithError
  fi

  cleanup
}

##
# Deploys documentation application.
##
deployDocumentationApp() {
  config "${PROJECT_DIRECTORIES["documentation"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only hosting || exitWithError
  else
    firebase deploy --only hosting --token "$1" || exitWithError
  fi

  cleanup
}

##
# Deploys api to firebase functions.
##
deployApiApp() {
  config "${PROJECT_DIRECTORIES["api"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only functions || exitWithError
  else
    firebase deploy --only functions --token "$1" || exitWithError
  fi

  cleanup
}

##
# Deploys both client app, and api.
##
deployAll() {
  deployApiApp "$1"
  deployClientApp "$1"
  deployDocumentationApp "$1"
}

##
# Firebase deployment control flow.
##
if [ $# -lt 1 ]; then
  reportUsageError
elif [ $# -ge 2 ]; then
  if [ "$2" = "client" ]; then
    deployClientApp "$1"
  elif [ "$2" = "documentation" ]; then
    deployDocumentationApp "$1"
  elif [ "$2" = "api" ]; then
    deployApiApp "$1"
  else
    deployAll "$1"
  fi
fi
