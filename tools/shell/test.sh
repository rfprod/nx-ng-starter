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
  print_usage_tip "bash tools/shell/test.sh ?" "print help"
  print_usage_tip "bash tools/shell/test.sh reports" "copy pregenerated reports to dist"
  report_supported_module_aliases_unit
  print_gap
}

##
# Copies all pregenerated coverage reports to the dist folder.
##
copy_reports_to_dist() {
  print_info_title "<< Copy reports to dist >>"
  print_gap

  ##
  # Documentation app dist path.
  ##
  local DOCUMENTATION_APP_DIST_PATH
  DOCUMENTATION_APP_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation

  if [ ! -d ${DOCUMENTATION_APP_DIST_PATH} ]; then
    print_error_title "<< ERROR >>"
    print_warning_message "Documentation app dist should be generated first."
    print_gap
    exit 1
  fi

  ##
  # Coverage root path.
  ##
  local COVERAGE_DIST_ROOT
  COVERAGE_DIST_ROOT=${DOCUMENTATION_APP_DIST_PATH}/browser/assets

  if [ -d ${COVERAGE_DIST_ROOT} ]; then
    print_success_message "directory $COVERAGE_DIST_ROOT exists, proceeding"
    print_gap
  else
    print_error_title "<< ERROR >>"
    print_warning_message "directory $COVERAGE_DIST_ROOT does not exist"
    print_info_message "creating directory $COVERAGE_DIST_ROOT"
    print_gap

    mkdir -p $COVERAGE_DIST_ROOT
  fi

  cp -r ./dist/coverage "$COVERAGE_DIST_ROOT" || exit 1
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  print_help
elif [ "$1" = "reports" ]; then
  copy_reports_to_dist
else
  print_help
  exit 1
fi
