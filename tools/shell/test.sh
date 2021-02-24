#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Project aliases.
##
source tools/shell/module-aliases.sh ''
##
# Printing utility functions.
##
source tools/shell/print-utils.sh ''
##
# Project root.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< USAGE >>"
  printUsageTip "bash tools/shell/test.sh single-run all" "run all unit tests"
  printUsageTip "bash tools/shell/test.sh single-run <MODULE_ALIAS_FROM_TSCONFIG>" "run unit tests for a specific application/library"
  printUsageTip "bash tools/shell/test.sh single-run:coverage <MODULE_ALIAS_FROM_TSCONFIG>" "run unit tests for a specific application/library, and collect coverage report"
  printUsageTip "bash tools/shell/test.sh report all" "copy all coverage reports to the documentation app dist"
  printUsageTip "bash tools/shell/test.sh run <MODULE_ALIAS_FROM_TSCONFIG>" "run unit tests for a specific application/library in watch mode"

  reportSupportedModuleAliasesUnit

  printGap

  exit 1
}

##
# Copies all pregenerated coverage reports to the dist folder.
##
copyReportsToDist() {
  printInfoTitle "<< COPY REPORTS TO DIST >>"
  printGap

  ##
  # Documentation app dist path.
  ##
  local DOCUMENTATION_APP_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation

  if [ ! -d ${DOCUMENTATION_APP_DIST_PATH} ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "Documentation app dist should be generated first."
    printGap
    exit 1
  fi

  ##
  # Coverage root path.
  ##
  local COVERAGE_DIST_ROOT=${DOCUMENTATION_APP_DIST_PATH}/assets

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
# Performs module testing considering optional action.
##
performModuleTesting() {
  printInfoTitle "<< TESTING MODULE >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "optional action (coverage, watch)" "$2"
  printGap

  if [ "$2" = "watch" ]; then
    npx nx test "$1" --passWithNoTests --watchAll
  elif [ "$2" = "coverage" ]; then
    npx nx test "$1" --watch=false --silent --code-coverage --run-in-band --passWithNoTests || exit 1
  else
    npx nx test "$1" --watch=false --silent --run-in-band --passWithNoTests || exit 1
  fi
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=test --base=origin/master --passWithNoTests --watch=false --run-in-band --ci
}

##
# Tests module.
##
testModule() {
  printInfoTitle "<< TESTING MODULE (unit) >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action (report, watch)" "$2"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"        # remove lib: prefix

  printNameAndValue "module name" "$MODULE_NAME"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    printInfoTitle "<< ALIAS ESISTS >>"

    performModuleTesting "$MODULE_NAME" "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES_UNIT[@]}"; do testModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    printInfoTitle "<< TESTING CHANGED APPS AND LIBS >>"
    printGap
    ##
    # Import Git helpers.
    ##
    source tools/shell/git-extension.sh
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do testModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "affected" ]; then
    printInfoTitle "<< TESTING AFFECTED APPS AND LIBS >>"
    printGap

    testAffected
  else
    reportUsageErrorAndExit
  fi
}

##
# Testing control flow.
##
if [ $# -lt 2 ]; then
  reportUsageErrorAndExit
else
  if [ "$1" = "single-run" ]; then
    testModule "$2" "none" # test single run.
  elif [ "$1" = "single-run:coverage" ]; then
    testModule "$2" "coverage" # test single run, generate coverage report.
  elif [ "$1" = "report" ]; then
    copyReportsToDist # copy pregenerated reports to dist.
  elif [ "$1" = "run" ]; then
    testModule "$2" "watch" # run in watch mode.
  else
    reportUsageErrorAndExit
  fi
fi
