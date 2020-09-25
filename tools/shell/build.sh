#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Printing utility functions.
##
source tools/shell/print-utils.sh ''

##
# Reports usage error.
##
reportUsage() {
  printInfoTitle "<< USAGE >>"
  printUsageTip "bash tools/shell/build.sh" "print usage"
  printUsageTip "bash tools/shell/build.sh dev" "build all apps in development mode"
  printUsageTip "bash tools/shell/build.sh prod" "build all apps in production mode"
  printUsageTip "bash tools/shell/build.sh prod api" "build API app in production mode"
  printUsageTip "bash tools/shell/build.sh prod client" "build client app in production mode"
  printUsageTip "bash tools/shell/build.sh prod documentation" "build documentation app in production mode"
  printGap

  exit 1
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
  printInfoTitle "<< BUILDING Nx Ng Starter client app PRODUCTION mode >>"
  printGap

  ng build --project client --configuration production || exit 1
}

##
# Builds Nx Ng Starter documentation app in production mode.
##
buildNxNgStarterDocsProd() {
  printInfoTitle "<< BUILDING Nx Ng Starter documentation app PRODUCTION mode >>"
  printGap

  ng build --project documentation --configuration production || exit 1
  generateCompodocs
  generateChangelogs
  generateEnd2EndReports
  generateUnitTestReports
}

##
# Builds API app in production mode.
##
buildAPIProd() {
  printInfoTitle "<< BUILDING API app PRODUCTION mode >>"
  printGap

  ng build --project api --configuration firebase || exit 1
}

##
# Builds all dists in production mode.
##
buildAllProd() {
  printInfoTitle "<< BUILDING ALL apps PRODUCTION mode >>"
  printGap

  buildAPIProd
  buildNxNgStarterClientProd
  buildNxNgStarterDocsProd
}

##
# Builds all dists in production mode.
##
buildAllDev() {
  printInfoTitle "<< BUILDING ALL apps DEVELOPMENT mode >>"
  printGap

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
