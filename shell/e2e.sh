#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
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
  ##
  # Does the following:
  # - find e2e app aliases in module-aliases.sh
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*e2e")

  TITLE="ERROR"
  printf "\n ${RED} %s${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh all${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh all headless${DEFAULT}\n
    ${LIGHT_BLUE}Test apps${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${YELLOW} headless${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<APP_ALIAS>${LIGHT_CYAN} values:\n" "$TITLE"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for APP_ALIAS in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}%s${DEFAULT}\n" "$APP_ALIAS"; done

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  TITLE="COPY REPORT TO DIST"
  printf "\n ${LIGHT_BLUE} %s:\n
    ${DEFAULT} - module partial path: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}%s${DEFAULT}\n
    \n\n" "$TITLE" "$1" "$2" "$3"

  ##
  # E2E root path.
  ##
  E2E_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/cypress

  ##
  # Report directory
  ##
  REPORT_DIR="${2}/mochawesome"
  ##
  # Reports glob for mochawesome merge.
  ##
  REPORTS_GLOB="${REPORT_DIR}/json/mochawesome*.json"
  ##
  # Merged report path
  ##
  MERGED_JSON_REPORT_PATH="${REPORT_DIR}/mochawesome-merge.json"
  ##
  # Report title
  ##
  REPORT_TITLE="Nx Ng Starter E2E"
  ##
  # Html report filename
  ##
  REPORT_FILENAME="mochawesome.html"

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d ${E2E_DISTR_ROOT} ]; then
      printf "\n ${LIGHT_GREEN} e2e directory %s exists, proceeding${DEFAULT}\n\n" "$E2E_DISTR_ROOT"
    else
      printf "\n ${RED} ERROR: directory %s does not exist\n
        ${LIGHT_BLUE} creating directory %s.${DEFAULT}\n
        \n\n" "$E2E_DISTR_ROOT"
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
  TITLE="testing module"
  printf "\n
    ${LIGHT_BLUE} >> %s\n
    ${DEFAULT} - module name: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (headless): ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}%s${DEFAULT}\n
    \n\n" "$TITLE" "$1" "$2" "$3" "$4" "$5"

  if [ "$4" = "headless" ]; then
    ng e2e "$1" --headless
  else
    ng e2e "$1"
  fi

  copyReportToDist "$2" "$3" "$5"
}

##
# Tests module.
##
testModule() {
  TITLE="TESTING MODULE"
  printf "\n
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module alias: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (headless): ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}%s${DEFAULT}\n" "$TITLE" "$1" "$2" "$3"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2
  COPY_REPORT=$3

  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix

  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # replace ': ' with 's/ ' to get parial path (e.g. apps/nx-ng-starter-e2e() for paths formation

  E2E_DIST_PATH=${PROJECT_ROOT}/dist/cypress/${MODULE_PARTIAL_PATH}

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}%s${DEFAULT}\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH"

  if [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_NX_NG_STARTER_E2E" ]; then # "app:nx-ng-starter-e2e"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$E2E_DIST_PATH" "$OPTIONAL_ACTION" "$COPY_REPORT"
  elif
    [[ "$MODULE_ALIAS" = "all" ]]
  then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER_E2E # "app:nx-ng-starter-e2e"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION" "$COPY_REPORT"
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
