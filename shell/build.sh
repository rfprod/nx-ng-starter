#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

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
  printf "\n${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/build.sh${DEFAULT} - build all apps\n
    ${DEFAULT} # > ${YELLOW} bash shell/build.sh prod${DEFAULT} - build all apps in production mode\n
    ${DEFAULT} # > ${YELLOW} bash shell/build.sh prod api${DEFAULT} - build API app in production mode\n
    ${DEFAULT} # > ${YELLOW} bash shell/build.sh prod nx-ng-starter${DEFAULT} - build Nx Ng Starter app in production mode\n
    ${DEFAULT}\n\n"

  exitWithError
}

##
# Builds Nx Ng Starter app in production mode.
##
buildNxNgStarterProd() {
  printf "\n ${LIGHT_BLUE}<< BUILDING Nx Ng Starter app PRODUCTION mode >>${DEFAULT}\n\n"
  ng build --project nx-ng-starter --configuration production || exitWithError
}

##
# Builds API app in production mode.
##
buildAPIProd() {
  printf "\n ${LIGHT_BLUE}<< BUILDING API app PRODUCTION mode >>${DEFAULT}\n\n"
  ng build --project api --configuration production || exitWithError
}

##
# Builds all dists in production mode.
##
buildAllProd() {
  printf "\n ${LIGHT_BLUE}<< BUILDING ALL apps PRODUCTION mode >>${DEFAULT}\n\n"
  buildAPIProd
  buildNxNgStarterProd
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
  reportUsageError
elif [ "$1" = "prod" ]; then
  # build project
  if [ "$2" = "api" ]; then
    buildAPIProd
  elif [ "$2" = "nx-ng-starter" ]; then
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
  reportUsageError
fi
