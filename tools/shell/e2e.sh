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
  printUsageTip "bash tools/shell/e2e.sh all" "run all e2e tests"
  printUsageTip "bash tools/shell/e2e.sh all headless" "run all e2e tests in headless mode"
  printUsageTip "bash tools/shell/e2e.sh <MODULE_E2E_ALIAS_FROM_TSCONFIG>" "run e2e tests for a specific application/library"
  printUsageTip "bash tools/shell/e2e.sh <MODULE_ALIAS_E2E_FROM_TSCONFIG> headless" "run e2e tests for a specific application/library in headless mode"

  reportSupportedModuleAliasesE2E

  printGap

  exit 1
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  printInfoTitle "<< COPY REPORT TO DIST >>"
  printNameAndValue "module partial path" "$1"
  printNameAndValue "e2e dist path" "$2"
  printNameAndValue "optional action (report)" "$3"
  printGap

  ##
  # E2E root path.
  ##
  local E2E_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/documentation/assets/cypress
  ##
  # Report directory
  ##
  local REPORT_DIR="${2}/mochawesome"
  ##
  # Reports glob for mochawesome merge.
  ##
  local REPORTS_GLOB="${REPORT_DIR}/json/mochawesome*.json"
  ##
  # Merged report path
  ##
  local MERGED_JSON_REPORT_PATH="${REPORT_DIR}/mochawesome-merge.json"
  ##
  # Report title
  ##
  local REPORT_TITLE="Nx Ng Starter E2E"
  ##
  # Html report filename
  ##
  local REPORT_FILENAME="mochawesome.html"

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d ${E2E_DISTR_ROOT} ]; then
      printSuccessMessage "e2e directory $E2E_DISTR_ROOT exists, proceeding"
    else
      printErrorTitle "<< ERROR >>"
      printWarningMessage "directory $E2E_DISTR_ROOT does not exist"
      printInfoMessage "creating directory $E2E_DISTR_ROOT"
      printGap

      mkdir -p $E2E_DISTR_ROOT
    fi
    # merge json reports
    npx mochawesome-merge "$REPORTS_GLOB" >"$MERGED_JSON_REPORT_PATH"
    # generate html report from merged json
    npx marge --reportDir="$REPORT_DIR" --reportTitle="$REPORT_TITLE" --reportFilename=$REPORT_FILENAME --showSkipped --enableCharts "$MERGED_JSON_REPORT_PATH"
    # copy report
    cp -r "$2" $E2E_DISTR_ROOT || exit 1
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  printInfoTitle "<< TESTING MODULE >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "e2e dist path" "$3"
  printNameAndValue "optional action (headless)" "$4"
  printNameAndValue "optional action (report)" "$5"
  printGap

  if [ "$4" = "headless" ]; then
    npx nx e2e "$1" --headless
  else
    npx nx e2e "$1"
  fi

  copyReportToDist "$2" "$3" "$5"
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=e2e --base=origin/master --headless
}

##
# Tests module.
##
testModule() {
  printInfoTitle "<< TESTING MODULE (e2e) >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action (headless)" "$2"
  printNameAndValue "optional action (report)" "$3"
  printGap

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2
  local COPY_REPORT=$3

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix

  local MODULE_PARTIAL_PATH
  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # replace ': ' with 's/ ' to get parial path (e.g. apps/client-e2e) for paths formation

  local E2E_DIST_PATH
  E2E_DIST_PATH=${PROJECT_ROOT}/dist/cypress/${MODULE_PARTIAL_PATH}

  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path name" "$1"
  printNameAndValue "e2e dist path" "$1"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH" "$OPTIONAL_ACTION" "$COPY_REPORT"
  elif
    [[ "$MODULE_ALIAS" = "all" ]]
  then
    for MODULE_ALIAS_VAR_E2E in "${EXISTING_MODULE_ALIASES_E2E[@]}"; do testModule "$MODULE_ALIAS_VAR_E2E" "$OPTIONAL_ACTION" "$COPY_REPORT"; done
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
if [ $# -lt 1 ]; then
  reportUsageErrorAndExit
else
  testModule "$1" "$2" "$3"
fi
