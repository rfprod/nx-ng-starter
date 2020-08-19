#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Project root.
##
PROJECT_ROOT=.
CLIENT_DIST_PATH=${PROJECT_ROOT}/dist/apps/client
DOCUMENTATION_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error.
##
reportUsage() {
  local TITLE="<< USAGE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh${DEFAULT} - print usage
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh dev${DEFAULT} - build all apps in development mode
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh prod${DEFAULT} - build all apps in production mode
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh prod api${DEFAULT} - build API app in production mode
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh prod client${DEFAULT} - build Nx Ng Starter app in production mode
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh prod documentation${DEFAULT} - build Nx Ng Starter documentation app in production mode
    ${DEFAULT}\n\n" "$TITLE"

  exitWithError
}

##
# Generates compodoc documentation.
##
generateDocumentation() {
  npm run document:all:generate-and-report-to-dist
}

##
# Generates changelog and reports to dist.
##
generateChangelog() {
  npm run changelog:all:generate
}

##
# Builds Nx Ng Starter client app in production mode.
##
buildNxNgStarterClientProd() {
  local TITLE="<< BUILDING Nx Ng Starter client app PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  ng build --project client --configuration production || exitWithError
}

##
# Builds Nx Ng Starter documentation app in production mode.
##
buildNxNgStarterDocsProd() {
  local TITLE="<< BUILDING Nx Ng Starter documentation app PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  ng build --project documentation --configuration production || exitWithError
  generateDocumentation
  generateChangelog

  # TODO: wrap as separate functions in this script
  npm run e2e:headless:report
  npm run test:all:single-run-and-report-to-dist

  ##
  # Copy documentation app to the client app for deployment.
  # TODO: deploy documentation app to GitHub pages instead.
  ##
  cp -r "$DOCUMENTATION_DIST_PATH" "$CLIENT_DIST_PATH" || exitWithError
}

##
# Builds API app in production mode.
##
buildAPIProd() {
  local TITLE="<< BUILDING API app PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  ng build --project api --configuration firebase || exitWithError
}

##
# Builds all dists in production mode.
##
buildAllProd() {
  local TITLE="<< BUILDING ALL apps PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  buildAPIProd
  buildNxNgStarterClientProd
  buildNxNgStarterDocsProd
}

##
# Builds all dists in production mode.
##
buildAllDev() {
  local TITLE="<< BUILDING ALL apps DEVELOPMENT mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  npm run build:all
}

##
# Building control flow.
##
if [ $# -lt 1 ]; then
  reportUsage
elif [ "$1" = "dev" ]; then
  buildAllDev
elif [ "$1" = "prod" ]; then
  if [ "$2" = "api" ]; then
    buildAPIProd
  elif [ "$2" = "client" ]; then
    buildNxNgStarterClientProd
  elif [ "$2" = "documentation" ]; then
    buildNxNgStarterDocsProd
  else
    buildAllProd
  fi
else
  reportUsage
fi
