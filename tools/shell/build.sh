#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

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
    ${DEFAULT}\n\n" "$TITLE"

  exitWithError
}

##
# Builds Nx Ng Starter app in production mode.
##
buildNxNgStarterProd() {
  local TITLE="<< BUILDING Nx Ng Starter app PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  ng build --project client --configuration production || exitWithError
}

##
# Builds API app in production mode.
##
buildAPIProd() {
  local TITLE="<< BUILDING API apps PRODUCTION mode >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  ng build --project api --configuration firebase || exitWithError # TODO: firebase configuration does not include grpc module
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
  buildNxNgStarterProd
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
# Generates documentation with compodoc.
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
# Building control flow.
##
if [ $# -lt 1 ]; then
  reportUsage
elif [ "$1" = "dev" ]; then
  buildAllDev
elif [ "$1" = "prod" ]; then
  # build project
  if [ "$2" = "api" ]; then
    buildAPIProd
  elif [ "$2" = "client" ]; then
    buildNxNgStarterProd
  else
    buildAllProd
  fi
  # generate documentation and changelog
  if [ "$3" = "doc" ]; then
    generateDocumentation
    generateChangelog
  fi
else
  reportUsage
fi
