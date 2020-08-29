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
    ${DEFAULT} - ${YELLOW} bash tools/shell/build.sh prod documentation${DEFAULT} - build Nx Ng Starter documentation app in production mode
    ${DEFAULT}\n\n" "$TITLE"

  exitWithError
}

##
# Generates compodoc documentation.
##
generateCompodocs() {
  npm run generate:documentation:dist
}

##
# Generates changelog and reports to dist.
##
generateChangelogs() {
  npm run generate:changelog
}

##
# Generates e2e reports and reports to dist.
##
generateEnd2EndReports() {
  npm run e2e:headless:report
}

##
# Generates unit test reports and reports to dist.
##
generateUnitTestReports() {
  npm run test:report
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
  generateCompodocs
  generateChangelogs
  generateEnd2EndReports
  generateUnitTestReports
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
