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
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} USAGE >>"
  printUsageTip "tools/shell/yarn-extension.sh ?" "print script usage"
  printUsageTip "tools/shell/yarn-extension.sh integrity-check" "performs an integrity check, and cleans up workspace if the is no integrity."
  printGap
}

##
# Checks package integrity, and cleans up workspace and caches if there is no integrity.
# No integrity mean that installed node_modules do not correspond versions defined in the package.json.
# This utility is intended to be used by the CI mainly.
##
checkIntegrity() {
  printInfoTitle "<< Checking package integrity >>"
  printGap

  if ! yarn check --verify-tree; then
    printInfoTitle "<< Cleaning up workspace, and caches >>"
    printGap

    yarn workspace:cleanup
    rm -rf /tmp/nx/nx-ng-starter /tmp/jest_rs/nx-ng-starter ./node_modules
    npm cache clean --force
    yarn cache clean
  else
    printSuccessTitle "<< Package integrity verified >>"
    printGap
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "integrity-check" ]; then
  checkIntegrity
fi
