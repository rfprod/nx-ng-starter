#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''

source tools/shell/utils/config.sh

##
# Project root reference.
##
PROJECT_ROOT=.

##
# Print help.
##
printHelp() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/test.sh ?" "print help"
  printUsageTip "bash tools/shell/test.sh reports" "copy pregenerated reports to dist"
  reportSupportedModuleAliasesUnit
  printGap
}

##
# Copies all pregenerated coverage reports to the dist folder.
##
copyReportsToDist() {
  printInfoTitle "<< Copy reports to dist >>"
  printGap

  ##
  # Documentation app dist path.
  ##
  local DOCUMENTATION_APP_DIST_PATH
  DOCUMENTATION_APP_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation

  if [ ! -d ${DOCUMENTATION_APP_DIST_PATH} ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "Documentation app dist should be generated first."
    printGap
    exit 1
  fi

  ##
  # Coverage root path.
  ##
  local COVERAGE_DIST_ROOT
  COVERAGE_DIST_ROOT=${DOCUMENTATION_APP_DIST_PATH}/assets

  if [ -d ${COVERAGE_DIST_ROOT} ]; then
    printSuccessMessage "directory $COVERAGE_DIST_ROOT exists, proceeding"
    printGap
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "directory $COVERAGE_DIST_ROOT does not exist"
    printInfoMessage "creating directory $COVERAGE_DIST_ROOT"
    printGap

    mkdir -p $COVERAGE_DIST_ROOT
  fi

  cp -r ./coverage "$COVERAGE_DIST_ROOT" || exit 1
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  printHelp
elif [ "$1" = "reports" ]; then
  copyReportsToDist
else
  printHelp
  exit 1
fi
