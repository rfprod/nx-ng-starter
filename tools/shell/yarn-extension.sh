#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/git-extension.sh ''

##
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "tools/shell/yarn-extension.sh ?" "print help"
  printUsageTip "tools/shell/yarn-extension.sh integrity-check" "performs an integrity check, and cleans up workspace if the is no integrity."
  printGap
}

##
# Checks Yarn version.
# Yarn v1 is required to use the feature that checks the packages integrity.
##
checkYarnVersion() {
  printInfoTitle "<< Checking yarn version >>"
  printGap

  local FULL_VERSION
  FULL_VERSION=$(yarn --version)
  local MAJOR_VERSION
  MAJOR_VERSION=$(yarn --version | grep -E -o "^[0-9].")

  if [ "$MAJOR_VERSION" != "1." ]; then
    printInfoTitle "<< Yarn version mismatch >>"
    printGap

    printInfoMessage "Expected yarn version: 1.x.x"
    printInfoMessage "Installed yarn version: $FULL_VERSION"
    printGap
    exit 1
  else
    printInfoTitle "<< Yarn version match >>"
    printGap

    printInfoMessage "Expected yarn version: 1.x.x"
    printInfoMessage "Installed yarn version: $FULL_VERSION"
    printGap
  fi
}

##
# Checks package integrity, and cleans up workspace and caches if there is no integrity.
# No integrity mean that installed node_modules do not correspond versions defined in the package.json.
# This utility is intended to be used by the CI mainly.
##
checkIntegrity() {
  printInfoTitle "<< Checking package integrity >>"
  printGap

  checkYarnVersion

  checkYarnLockChanges

  if ! yarn check --integrity || [ "$YARN_LOCK_CHANGED" -eq 1 ]; then
    printInfoTitle "<< Cleaning up workspace, and caches >>"
    printGap

    yarn workspace:cleanup
    rm -rf ./node_modules
    npm cache clean --force
    yarn cache clean
  else
    printSuccessTitle "<< Package integrity verified >>"
    printInfoMessage ">> will verify tree additionally without erroring"
    printGap

    yarn check --verify-tree || true
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "integrity-check" ]; then
  checkIntegrity
fi
