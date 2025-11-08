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
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/e2e.sh ?" "print help"
  print_usage_tip "bash tools/shell/e2e.sh reports" "copy e2e reports to dist"
  report_supported_module_aliases_e2e
  print_gap
}

##
# Copies generated report to dist folder.
##
copy_report_to_dist() {
  print_info_title "<< Copy report to dist >>"
  print_name_and_value "module name" "$1"
  print_name_and_value "module partial path" "$2"
  print_name_and_value "e2e dist path" "$3"
  print_name_and_value "optional action (report)" "$4"
  print_gap

  ##
  # E2E root paths.
  ##
  local -A E2E_DIST_ROOTS=(
    ["${PROJECT_ROOT}/dist/apps/documentation/browser/assets/cypress"]="${PROJECT_ROOT}"/dist/apps/documentation/browser/assets/cypress
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
        print_success_message "e2e directory $E2E_DISTR_ROOT exists, proceeding"
      else
        print_error_title "<< ERROR >>"
        print_warning_message "directory $E2E_DISTR_ROOT does not exist"
        print_success_message "creating directory $E2E_DISTR_ROOT"
        print_gap

        mkdir -p "$E2E_DISTR_ROOT"
      fi

      if [ -d "$REPORT_DIR" ]; then
        print_success_message "e2e directory $REPORT_DIR exists, proceeding"

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
  print_help
elif [ "$1" = "reports" ]; then
  copy_report_to_dist "app:client-e2e" "apps/client-e2e" "./dist/cypress/apps/client-e2e" "report"
  copy_report_to_dist "app:documentation-e2e" "apps/documentation-e2e" "./dist/cypress/apps/documentation-e2e" "report"
else
  print_help
  exit 1
fi
