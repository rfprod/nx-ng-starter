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
  # - find app aliases in module-aliases.sh
  # - remove e2e
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*" | awk '!/e2e/')

  printf "\n ${RED} ERROR${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh single-run all${DEFAULT}\n
    ${LIGHT_BLUE}Test apps${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh single-run ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh single-run-and-report ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh run ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for alias in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias}${DEFAULT}\n"; done

  printf "
    ${LIGHT_BLUE}Test libs${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh single-run ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh single-run-and-report ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/test.sh run ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n"

  ##
  # Does the following:
  # - find lib aliases in tsconfig
  # - remove duplicates
  ##
  LIB_ALIASES=$(find ./tsconfig.json | xargs grep -o "libs\/[a-z0-9-]*" | awk "!a[$0]++")

  ##
  # Prints found and filtered lib aliases as it should be used with this script.
  ##
  for alias in $LIB_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias//s\//\:}${DEFAULT}\n"; done

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist () {
  printf "\n ${LIGHT_BLUE} COPY REPORT TO DIST:\n
    ${DEFAULT} - module partial path: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - coverage dist path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${3}${DEFAULT}\n
    \n\n"

  ##
  # Coverage root path.
  ##
  COV_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d ${COV_DISTR_ROOT} ]; then
      printf "\n ${LIGHT_GREEN} coverage directory ${COV_DISTR_ROOT} exists, proceeding${DEFAULT}\n\n"
    else
      printf "\n ${RED} ERROR: directory ${COV_DISTR_ROOT} does not exist\n
        ${LIGHT_BLUE} creating directory ${COV_DISTR_ROOT}.${DEFAULT}\n
        \n\n"
      mkdir -p $COV_DISTR_ROOT
    fi
    cp -r ${PROJECT_ROOT}/coverage/${1} $2 || exitWithError
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting () {
  printf "\n ${LIGHT_BLUE} >> testing module\n
    ${DEFAULT} - module name: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - coverage dist path: ${YELLOW}${3}${DEFAULT}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${4}${DEFAULT}\n
    \n\n"

  if [ "$4" = "watch" ]; then
    ng test $1 --passWithNoTests --watchAll
  else
    ng test $1 --watch=false --silent --passWithNoTests || exitWithError
    copyReportToDist $2 $3 $4
  fi
}

##
# Tests module.
##
testModule () {
  printf "\n ${LIGHT_BLUE} TESTING MODULE\n
    ${DEFAULT} - module alias: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${2}${DEFAULT}\n"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2

  MODULE_NAME="$(echo "${MODULE_ALIAS//app\:/}")" # remove app: prefix
  MODULE_NAME="$(echo "${MODULE_NAME//lib\:/}")" # remove lib: prefix

  MODULE_PARTIAL_PATH="$(echo "${MODULE_ALIAS//\:/s\/}")" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  COVERAGE_BASE_PATH=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  printf "
    ${DEFAULT} - module name: ${YELLOW}${MODULE_NAME}${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}${MODULE_PARTIAL_PATH}${DEFAULT}\n
    ${DEFAULT} - coverage report base path: ${YELLOW}${COVERAGE_BASE_PATH}${DEFAULT}\n"

  if [ $MODULE_ALIAS = $MODULE_ALIAS_APP_NX_NG_STARTER ]; then # "app:nx-ng-starter"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}${COVERAGE_DIST_PATH}${DEFAULT}\n
    \n\n"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $COVERAGE_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_APP_API ]; then # "app:api"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}${COVERAGE_DIST_PATH}${DEFAULT}\n
    \n\n"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $COVERAGE_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_API_INTERFACE ]; then # "lib:api-interface"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}${COVERAGE_DIST_PATH}${DEFAULT}\n
    \n\n"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $COVERAGE_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_MOCKS_CORE ]; then # "lib:mocks-core"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}${COVERAGE_DIST_PATH}${DEFAULT}\n
    \n\n"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $COVERAGE_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_SHARED_CORE ]; then # "lib:shared-core"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}${COVERAGE_DIST_PATH}${DEFAULT}\n
    \n\n"
    performModuleTesting $MODULE_NAME $MODULE_PARTIAL_PATH $COVERAGE_DIST_PATH $OPTIONAL_ACTION
  elif
    [[ $MODULE_ALIAS = "all" && $OPTIONAL_ACTION != "run" ]]; then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "lib:api-interface"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    testModule $MODULE_ALIAS $OPTIONAL_ACTION
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
  if [ $1 = "single-run" ]; then
    testModule $2 "none" # test single run.
  elif [ $1 = "single-run-and-report" ]; then
    testModule $2 "report" # test single run, generate coverage report, and copy report to dist.
  elif [ $1 = "run" ]; then
    testModule $2 "watch" # run in watch mode.
  else
    reportUsageErrorAndExit
  fi
fi
