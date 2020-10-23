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
  printUsageTip "bash tools/shell/test.sh single-run:report <MODULE_ALIAS_FROM_TSCONFIG>" "run unit tests for a specific application/library, and collect coverage report"
  printUsageTip "bash tools/shell/test.sh run <MODULE_ALIAS_FROM_TSCONFIG>" "run unit tests for a specific application/library in watch mode"

  reportSupportedModuleAliasesUnit

  printGap

  exit 1
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  printInfoTitle "<< COPY REPORT TO DIST >>"
  printNameAndValue "module partial path" "$1"
  printNameAndValue "coverage dist path" "$2"
  printNameAndValue "optional action (report, watch)" "$3"
  printGap

  ##
  # Coverage root path.
  ##
  local COV_DISTR_ROOT=${2}

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d "${COV_DISTR_ROOT}" ]; then
      printSuccessMessage "coverage directory $COV_DISTR_ROOT exists, proceeding"
      printGap
    else
      printErrorTitle "<< ERROR >>"
      printWarningMessage "directory $COV_DISTR_ROOT does not exist"
      printInfoMessage "creating directory $COV_DISTR_ROOT"
      printGap

      mkdir -p "$COV_DISTR_ROOT"
    fi
    cp -r ${PROJECT_ROOT}/coverage/"${1}" "$2" || exit 1
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  printInfoTitle "<< TESTING MODULE >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "coverage dist path" "$3"
  printNameAndValue "optional action (report, watch)" "$4"
  printGap

  if [ "$4" = "watch" ]; then
    npx nx test "$1" --passWithNoTests --watchAll
  elif [ "$4" = "report" ]; then
    npx nx test "$1" --watch=false --silent --passWithNoTests --code-coverage || exit 1
    copyReportToDist "$2" "$3" "$4"
  else
    npx nx test "$1" --watch=false --silent --passWithNoTests || exit 1
  fi
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=test --base=origin/master --passWithNoTests --watch=false --maxWorkers=2 --ci
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

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/client for subsequent path formation

  local COVERAGE_BASE_PATH=${PROJECT_ROOT}/dist/apps/documentation/coverage

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printNameAndValue "coverage report base path" "$MODULE_COVERAGE_BASE_PATHNAME"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    printInfoTitle "<< ALIAS ESISTS >>"

    local COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}

    printNameAndValue "coverage dist path" "$COVERAGE_DIST_PATH"
    printGap

    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
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
  elif [ "$1" = "single-run:report" ]; then
    testModule "$2" "report" # test single run, generate coverage report, and copy report to dist.
  elif [ "$1" = "run" ]; then
    testModule "$2" "watch" # run in watch mode.
  else
    reportUsageErrorAndExit
  fi
fi
