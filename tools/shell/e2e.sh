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
  printUsageTip "bash tools/shell/e2e.sh ?" "print help"
  printUsageTip "bash tools/shell/e2e.sh reports" "copy e2e reports to dist"
  reportSupportedModuleAliasesE2E
  printGap
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
# Script control flow.
##
if [ "$1" = "?" ]; then
  printHelp
elif [ "$1" = "reports" ]; then
  copyReportToDist "app:client-e2e" "apps/client-e2e" "./dist/cypress/apps/client-e2e" "report"
  copyReportToDist "app:documentation-e2e" "apps/documentation-e2e" "./dist/cypress/apps/documentation-e2e" "report"
else
  printHelp
  exit 1
fi
