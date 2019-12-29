#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh
##
# Project aliases.
##
source shell/module-aliases.sh

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
  printf "\n ${RED} ERROR: ${YELLOW}firebase deploy token must be provided as a first argument.\n
    ${LIGHT_BLUE}Usage:${DEFAULT}\n
    # ${LIGHT_GREEN}< NX-NG-STARTER app >${DEFAULT}\n
    # > CI environment - ${YELLOW}bash shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN app:nx-ng-starter${DEFAULT}\n
    # > LOCALHOST environment, firebase authentication required - ${YELLOW}bash shell/firebase-deploy.sh localhost app:nx-ng-starter${DEFAULT}\n
    # ${LIGHT_GREEN}< API app >${DEFAULT}\n
    # > CI environment - ${YELLOW}bash shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN app:api${DEFAULT}\n
    # > LOCALHOST environment, firebase authentication required - ${YELLOW}bash shell/firebase-deploy.sh localhost app:api${DEFAULT}\n
    # > ${YELLOW}bash shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN localhost app:api${DEFAULT}\n
    # ${LIGHT_GREEN}< ALL apps >${DEFAULT}\n
    # > CI environment - ${YELLOW}bash shell/firebase-deploy.sh \$FIREBASE_DEPLOY_TOKEN${DEFAULT}\n
    # > LOCALHOST environment, firebase authentication required - ${YELLOW}bash shell/firebase-deploy.sh localhost${DEFAULT}\n
    ${DEFAULT}\n\n"

  exitWithError
}

##
# Project directory
##
PROJECT_DIRECTORY=./apps/nx-ng-starter/

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
  ##
  # Copy firebase files to project root for deployment.
  # Later both will be removed.
  ##
  cp ${PROJECT_DIRECTORY}.firebaserc ./.firebaserc
  cp ${PROJECT_DIRECTORY}firebase.json ./firebase.json
}

##
# Deploys client application.
##
deployClientApp() {
  PROJECT_DIRECTORY=./apps/nx-ng-starter/

  config

  if [ "$1" = "localhost" ]; then
    firebase deploy --only hosting || exitWithError
  else
    firebase deploy --only hosting --token $1 || exitWithError
  fi

  cleanup
}

##
# Deploys api to firebase functions.
##
deployApiApp() {
  PROJECT_DIRECTORY=./apps/api/

  config

  if [ "$1" = "localhost" ]; then
    firebase deploy --only functions || exitWithError
  else
    firebase deploy --only functions --token $1 || exitWithError
  fi

  cleanup
}

##
# Deploys both client app, and api.
##
deployAll() {
  deployClientApp $1
  deployApiApp $1
}

##
# Firebase deployment control flow.
##
if [ $# -lt 1 ]; then
  reportUsageError
elif [ $# -ge 2 ]; then
  if [ $2 = $MODULE_ALIAS_APP_NX_NG_STARTER ]; then
    deployClientApp $1
  elif [ $2 = $MODULE_ALIAS_APP_API ]; then
    deployApiApp $1
  else
    deployAll $1
  fi
fi
