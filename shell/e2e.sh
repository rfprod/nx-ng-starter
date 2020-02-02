#!/bin/bash

##
# Colors.
##
source shell/colors.sh
##
# Project aliases.
##
source shell/module-aliases.sh

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Configurable project root, may be useful in CI environment.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW} bash shell/e2e.sh all
    ${DEFAULT} - ${YELLOW} bash shell/e2e.sh all headless
    ${DEFAULT} - ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<MODULE_E2E_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<MODULE_ALIAS_E2E_FROM_TSCONFIG>${YELLOW} headless\n" "$TITLE"

  reportSupportedModuleAliasesE2E

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  local TITLE="<< COPY REPORT TO DIST >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module partial path: ${YELLOW}%s\n
    ${DEFAULT} - e2e dist path: ${YELLOW}%s\n
    ${DEFAULT} - optional action (report): ${YELLOW}%s${DEFAULT}\n
    \n\n" "$TITLE" "$1" "$2" "$3"

  ##
  # E2E root path.
  ##
  local E2E_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/cypress

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
      printf "
        ${LIGHT_GREEN} e2e directory %s exists, proceeding${DEFAULT}\n\n" "$E2E_DISTR_ROOT"
    else
      TITLE="<< ERROR >>"
      printf "
        ${RED}%s\n
        ${LIGHT_RED} directory %s does not exist
        ${LIGHT_BLUE} creating directory %s.
        ${DEFAULT}\n\n" "$TITLE" "$E2E_DISTR_ROOT" "$E2E_DISTR_ROOT"
      mkdir -p $E2E_DISTR_ROOT
    fi
    # merge json reports
    npx mochawesome-merge --reportsGlob="$REPORTS_GLOB" >"$MERGED_JSON_REPORT_PATH"
    # generate html report from merged json
    npx marge --reportDir="$REPORT_DIR" --reportTitle="$REPORT_TITLE" --reportFilename=$REPORT_FILENAME --showSkipped --enableCharts "$MERGED_JSON_REPORT_PATH"
    # copy report
    cp -r "$2" $E2E_DISTR_ROOT || exitWithError
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  local TITLE="<< TESTING MODULE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path: ${YELLOW}%s
    ${DEFAULT} - e2e dist path: ${YELLOW}%s
    ${DEFAULT} - optional action (headless): ${YELLOW}%s
    ${DEFAULT} - optional action (report): ${YELLOW}%s
    ${DEFAULT}\n\n" "$TITLE" "$1" "$2" "$3" "$4" "$5"

  if [ "$4" = "headless" ]; then
    ng e2e "$1" --headless
  else
    ng e2e "$1"
  fi

  copyReportToDist "$2" "$3" "$5"
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=e2e --base=origin/master --headless --passWithNoTests
}

##
# Tests module.
##
testModule() {
  local TITLE="<< TESTING MODULE (e2e) >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module alias: ${YELLOW}%s
    ${DEFAULT} - optional action (headless): ${YELLOW}%s
    ${DEFAULT} - optional action (report): ${YELLOW}%s\n" "$TITLE" "$1" "$2" "$3"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2
  local COPY_REPORT=$3

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix

  local MODULE_PARTIAL_PATH
  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # replace ': ' with 's/ ' to get parial path (e.g. apps/nx-ng-starter-e2e() for paths formation

  local E2E_DIST_PATH
  E2E_DIST_PATH=${PROJECT_ROOT}/dist/cypress/${MODULE_PARTIAL_PATH}

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path name: ${YELLOW}%s
    ${DEFAULT} - e2e dist path: ${YELLOW}%s
    ${DEFAULT}\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH"

  local ALIAS_EXISTS=
  moduleAliasE2EExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH" "$OPTIONAL_ACTION" "$COPY_REPORT"
  elif
    [[ "$MODULE_ALIAS" = "all" ]]
  then
    for MODULE_ALIAS_VAR_E2E in "${MODULE_ALIAS_VARS_E2E[@]}"; do testModule "$MODULE_ALIAS_VAR_E2E" "$OPTIONAL_ACTION" "$COPY_REPORT"; done
  elif [ "$MODULE_ALIAS" = "affected" ]; then
    TITLE="<< TESTING AFFECTED APPS AND LIBS >>"
    printf "
      ${LIGHT_BLUE}%s${DEFAULT}\n" "$TITLE"
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
