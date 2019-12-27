#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

##
# Project aliases (confirm the following list in specified shell file, and update hint here when applicable):
#
# Apps
# MODULE_ALIAS_APP_NX_NG_STARTER="app:nx-ng-starter"
# MODULE_ALIAS_APP_API="app:api"
#
# Apps E2E
# MODULE_ALIAS_APP_NX_NG_STARTER_E2E="app:nx-ng-starter-e2e"
#
# Libs
# MODULE_ALIAS_LIB_API_INTERFACE="lib:api-interface"
# MODULE_ALIAS_LIB_MOCKS_CORE="lib:mocks-core"
# MODULE_ALIAS_LIB_SHARED_CORE="lib:shared-core"
##
source shell/module-aliases.sh

##
# Exits with error.
##
exitWithError () {
  exit 1
}

##
# Configurable project root, may be useful in CI environment.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit () {
  ##
  # Does the following:
  # - find e2e app aliases in module-aliases.sh
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*e2e")

  printf "\n ${RED} ERROR${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh all${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh all headless${DEFAULT}\n
    ${LIGHT_BLUE}Test apps${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/e2e.sh ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${YELLOW} headless${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<APP_ALIAS>${LIGHT_CYAN} values:\n"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for alias in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias}${DEFAULT}\n"; done

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist () {
  printf "\n ${LIGHT_BLUE} COPY REPORT TO DIST:\n
    ${DEFAULT} - module partial path: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}${3}${DEFAULT}\n
    \n\n"

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
      printf "\n ${LIGHT_GREEN} e2e directory ${E2E_DISTR_ROOT} exists, proceeding${DEFAULT}\n\n"
    else
      printf "\n ${RED} ERROR: directory ${E2E_DISTR_ROOT} does not exist\n
        ${LIGHT_BLUE} creating directory ${E2E_DISTR_ROOT}.${DEFAULT}\n
        \n\n"
      mkdir -p $E2E_DISTR_ROOT
    fi
    # merge json reports
    npx mochawesome-merge --reportsGlob=$REPORTS_GLOB > $MERGED_JSON_REPORT_PATH
    # generate html report from merged json
    npx marge --reportDir=$REPORT_DIR --reportTitle="${REPORT_TITLE}" --reportFilename=$REPORT_FILENAME --showSkipped --enableCharts $MERGED_JSON_REPORT_PATH
    # copy report
    cp -r $2 $E2E_DISTR_ROOT || exitWithError
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting () {
  printf "\n ${LIGHT_BLUE} >> testing module\n
    ${DEFAULT} - module name: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}${3}${DEFAULT}\n
    ${DEFAULT} - optional action (headless): ${YELLOW}${4}${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}${5}${DEFAULT}\n
    \n\n"

  if [ "$4" = "headless" ]; then
    ng e2e $1 --headless
  else
    ng e2e $1
  fi

  copyReportToDist $2 $3 $5
}

##
# Tests module.
##
testModule () {
  printf "\n ${LIGHT_BLUE} TESTING MODULE\n
    ${DEFAULT} - module alias: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - optional action (headless): ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (report): ${YELLOW}${3}${DEFAULT}\n"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2
  COPY_REPORT=$3

  MODULE_NAME="$(echo "${MODULE_ALIAS//app\:/}")" # remove app: prefix

  MODULE_PARTIAL_PATH="$(echo "${MODULE_ALIAS//\:/s\/}")" # replace ': ' with 's/ ' to get parial path (e.g. apps/nx-ng-starter-e2e() for paths formation

  E2E_DIST_PATH=${PROJECT_ROOT}/dist/cypress/${MODULE_PARTIAL_PATH}

  printf "
    ${DEFAULT} - module name: ${YELLOW}${MODULE_NAME}${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}${MODULE_PARTIAL_PATH}${DEFAULT}\n
    ${DEFAULT} - e2e dist path: ${YELLOW}${E2E_DIST_PATH}${DEFAULT}\n"

  if [ $MODULE_ALIAS = $MODULE_ALIAS_APP_NX_NG_STARTER_E2E ]; then # "app:nx-ng-starter-e2e"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $E2E_DIST_PATH $OPTIONAL_ACTION $COPY_REPORT
  elif
    [[ $MODULE_ALIAS = "all" ]]; then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER_E2E # "app:nx-ng-starter-e2e"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION $COPY_REPORT
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
  testModule $1 $2 $3
fi
