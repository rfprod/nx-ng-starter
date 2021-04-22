#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Printing utils.
##
source tools/shell/print-utils.sh ''

##
# Project aliases.
##
source tools/shell/module-aliases.sh ''

##
# Project root.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} USAGE >>"
  printUsageTip "bash tools/shell/e2e.sh reports" "copy e2e reports to dist"
  printUsageTip "bash tools/shell/e2e.sh all" "run all e2e apps"
  printUsageTip "bash tools/shell/e2e.sh all headless" "run all e2e apps in the headless mode"
  printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS>" "run a single e2e app"
  printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS> headless" "run a single e2e app in the headless mode"
  printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS> headless report" "run a single e2e app in the headless mode and save report"
  printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS> headless report CONFIGURATION" "run a single e2e app in the headless mode and save report versus a specific configuration/environment"

  reportSupportedModuleAliasesE2E

  printGap

  exit 1
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  printInfoTitle "<< Copy report to dist >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "e2e dist path" "$3"
  printNameAndValue "optional action (report)" "$4"
  printGap

  ##
  # E2E root paths.
  ##
  local -A E2E_DIST_ROOTS=(
    ["${PROJECT_ROOT}/dist/apps/documentation/assets/cypress"]="${PROJECT_ROOT}"/dist/apps/documentation/assets/cypress
  )

  ##
  # Report directory
  ##
  local REPORT_DIR
  REPORT_DIR="${3}/mochawesome"
  ##
  # Reports glob for mochawesome merge.
  ##
  local REPORTS_GLOB
  REPORTS_GLOB="${REPORT_DIR}/json/mochawesome*.json"
  ##
  # Merged report path
  ##
  local MERGED_JSON_REPORT_PATH
  MERGED_JSON_REPORT_PATH="${REPORT_DIR}/mochawesome-merge.json"
  ##
  # Report title
  ##
  local REPORT_TITLE
  REPORT_TITLE="Transport E2E"
  ##
  # Html report filename
  ##
  local REPORT_FILENAME
  REPORT_FILENAME="mochawesome.html"

  if [ "$4" = "report" ]; then
    for E2E_DISTR_ROOT in "${E2E_DIST_ROOTS[@]}"; do
      # check coverage dist path existence
      if [ -d "$E2E_DISTR_ROOT" ]; then
        printSuccessMessage "e2e directory $E2E_DISTR_ROOT exists, proceeding"
      else
        printErrorTitle "<< ERROR >>"
        printWarningMessage "directory $E2E_DISTR_ROOT does not exist"
        printSuccessMessage "creating directory $E2E_DISTR_ROOT"
        printGap

        mkdir -p "$E2E_DISTR_ROOT"
      fi
      # proceed only if report exists
      if [ -d "$REPORT_DIR" ]; then
        printSuccessMessage "e2e directory $REPORT_DIR exists, proceeding"

        # merge json reports
        npx mochawesome-merge "$REPORTS_GLOB" >"$MERGED_JSON_REPORT_PATH"
        # generate html report from merged json
        npx marge --reportDir="$REPORT_DIR" --reportTitle="${REPORT_TITLE}" --reportFilename=$REPORT_FILENAME --showSkipped --enableCharts "$MERGED_JSON_REPORT_PATH"
        # copy report
        cp -r "$3" "$E2E_DISTR_ROOT" || exit 1
      fi
    done
  fi
}

##
# Checks provided variables and proceeds with testing.
##
checkVariablesAndProceed() {
  printInfoTitle "<< Checking variables and proceeding >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "e2e dist path" "$3"
  printNameAndValue "optional action (headless)" "$4"
  printNameAndValue "optional action (report)" "$5"
  printNameAndValue "optional configuration (see angular.json)" "$6"
  printGap

  if [ -z "$6" ]; then
    if [ "$4" = "headless" ]; then
      npx nx e2e "$1" --headless --configuration "$6"
    else
      npx nx e2e "$1" --configuration "$6"
    fi
  else
    if [ "$4" = "headless" ]; then
      npx nx e2e "$1" --headless
    else
      npx nx e2e "$1"
    fi
  fi

  copyReportToDist "$1" "$2" "$3" "$5"
}

##
# Tests module.
##
testModule() {
  printInfoTitle "<< Testing module >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "optional action (headless)" "$2"
  printNameAndValue "optional action (report)" "$3"
  printNameAndValue "optional configuration (see angular.json)" "$4"

  local MODULE_ALIAS
  MODULE_ALIAS=$1
  local OPTIONAL_ACTION
  OPTIONAL_ACTION=$2
  local COPY_REPORT
  COPY_REPORT=$3
  local CONFIGURATION
  CONFIGURATION=$4

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix

  local MODULE_PARTIAL_PATH
  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # replace ': ' with 's/ ' to get parial path (e.g. apps/client-e2e() for paths formation

  local E2E_DIST_PATH
  E2E_DIST_PATH=${PROJECT_ROOT}/dist/cypress/${MODULE_PARTIAL_PATH}

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printNameAndValue "e2e dist path" "$E2E_DIST_PATH"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkVariablesAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH" "$OPTIONAL_ACTION" "$COPY_REPORT" "$CONFIGURATION"
  elif
    [[ "$MODULE_ALIAS" = "all" ]]
  then
    for MODULE_ALIAS_E2E in "${EXISTING_MODULE_ALIASES_E2E[@]}"; do testModule "$MODULE_ALIAS_E2E" "$OPTIONAL_ACTION" "$COPY_REPORT" "$CONFIGURATION"; done
  else
    reportUsageErrorAndExit
  fi
}

##
# Testing control flow.
##
if [ $# -lt 1 ]; then
  reportUsageErrorAndExit
elif [ "$1" = "reports" ]; then
  copyReportToDist "app:client-e2e" "apps/client-e2e" "./dist/cypress/apps/client-e2e" "report"
  copyReportToDist "app:documentation-e2e" "apps/documentation-e2e" "./dist/cypress/apps/documentation-e2e" "report"
else
  testModule "$1" "$2" "$3" "$4"
fi
