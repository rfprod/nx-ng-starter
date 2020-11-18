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
buildNxNgStarterDocs() {
  printInfoTitle "<< BUILDING Nx Ng Starter documentation app PRODUCTION mode >>"
  printNameAndValue "configuration" "$1"
  printGap

  if [ "$1" = "dev" ] || [ "$1" = "prod" ]; then
    ng run tools:clear-nx-cache || exit 0
    yarn test:coverage || exit 1
    ng run tools:coverage-stats || exit 1
    yarn generate:env:documentation || exit 1

    if [ "$1" = "dev" ]; then
      ng build --project documentation || exit 1
    else
      ng build --project documentation --configuration production || exit 1
    fi

    yarn test:reports || exit 1
    ng run tools:compodoc-build || exit 1
    yarn generate:changelog || exit 1
    yarn e2e:headless:report || exit 1
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "Environment $1 is not supported"
  fi
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
  buildNxNgStarterDocs "prod"
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
  if [ "$2" = "documentation" ]; then
    buildNxNgStarterDocs "$1"
  else
    buildAllDev
  fi
elif [ "$1" = "prod" ]; then
  if [ "$2" = "api" ]; then
    buildAPIProd
  elif [ "$2" = "client" ]; then
    buildNxNgStarterClientProd
  elif [ "$2" = "documentation" ]; then
    buildNxNgStarterDocs "$1"
  else
    buildAllProd
  fi
else
  reportUsage
fi
