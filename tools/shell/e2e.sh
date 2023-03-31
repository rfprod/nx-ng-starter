#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''

source tools/shell/utils/config.sh

##
# Project root reference.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/e2e.sh reports" "copy e2e reports to dist"
  # printUsageTip "bash tools/shell/e2e.sh all" "run all e2e apps"
  # printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS>" "run a single e2e app"
  # printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS> report" "run a single e2e app and save report"
  # printUsageTip "bash tools/shell/e2e.sh <E2E_APP_ALIAS> report CONFIGURATION" "run a single e2e app and save report versus a specific configuration/environment"

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
  printNameAndValue "optional action (report)" "$4"
  printNameAndValue "optional configuration (see angular.json)" "$5"
  printGap

  if [ -z "$5" ]; then
    npx nx e2e "$1" --configuration "$5"
  else
    npx nx e2e "$1"
  fi

  copyReportToDist "$1" "$2" "$3" "$4"
}

##
# Tests module.
##
testModule() {
  printInfoTitle "<< Testing module >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "optional action (report)" "$2"
  printNameAndValue "optional configuration (see angular.json)" "$3"

  local MODULE_ALIAS
  MODULE_ALIAS=$1
  local COPY_REPORT
  COPY_REPORT=$2
  local CONFIGURATION
  CONFIGURATION=$3

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
    checkVariablesAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH" "$COPY_REPORT" "$CONFIGURATION"
  elif
    [[ "$MODULE_ALIAS" = "all" ]]
  then
    for MODULE_ALIAS_E2E in "${EXISTING_MODULE_ALIASES_E2E[@]}"; do testModule "$MODULE_ALIAS_E2E" "$COPY_REPORT" "$CONFIGURATION"; done
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
  printErrorTitle "This command is deprecated"
  printInfoTitle "Use workspace executors:"
  printUsageTip "npx nx run-many --target e2e --all" "cypress e2e test"
  exit 1
  # testModule "$1" "$2" "$3"
fi
