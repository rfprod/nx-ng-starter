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
# Import Git helpers.
##
source shell/git-extension.sh

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
  # - find app aliases in module-aliases.sh
  # - remove e2e
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh -print0 | xargs -0 grep -o "app:[a-z0-9-]*" | awk '!/e2e/')

  TITLE="<< USAGE >>"
  printf "
    ${RED} %s\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run all\n
    ${LIGHT_BLUE}Test apps\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run-and-report ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh run ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n" "$TITLE"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for APP_ALIAS in $APP_ALIASES; do printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}\n" "$APP_ALIAS"; done

  TITLE="Test libs"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run-and-report ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} - ${YELLOW} bash shell/test.sh run ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n" "$TITLE"

  ##
  # Does the following:
  # - find lib aliases in tsconfig
  # - remove duplicates
  ##
  LIB_ALIASES=$(find ./tsconfig.json -print0 | xargs -0 grep -o "libs\/[a-z0-9-]*" | awk '!a[$0]++')

  ##
  # Prints found and filtered lib aliases as it should be used with this script.
  ##
  for LIB_ALIAS in $LIB_ALIASES; do printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}\n" "${LIB_ALIAS//s\//\:}"; done

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  TITLE="<< COPY REPORT TO DIST >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module partial path: ${YELLOW}${1}\n
    ${DEFAULT} - coverage dist path: ${YELLOW}${2}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${3}\n
    \n\n" "$TITLE"

  ##
  # Coverage root path.
  ##
  COV_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d ${COV_DISTR_ROOT} ]; then
      printf "
        ${LIGHT_GREEN} coverage directory %s exists, proceeding${DEFAULT}\n\n" "$COV_DISTR_ROOT"
    else
      printf "
        ${RED} ERROR\n
        ${LIGHT_RED} directory %s does not exist\n
        ${LIGHT_BLUE} creating directory %s.${DEFAULT}\n
        \n\n" "$COV_DISTR_ROOT" "$COV_DISTR_ROOT"
      mkdir -p $COV_DISTR_ROOT
    fi
    cp -r ${PROJECT_ROOT}/coverage/"${1}" "$2" || exitWithError
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  TITLE=">> testing module"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module name: ${YELLOW}${1}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}\n
    ${DEFAULT} - coverage dist path: ${YELLOW}${3}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${4}\n
    \n\n" "$TITLE"

  if [ "$4" = "watch" ]; then
    ng test "$1" --passWithNoTests --watchAll
  else
    ng test "$1" --watch=false --silent --passWithNoTests || exitWithError
    copyReportToDist "$2" "$3" "$4"
  fi
}

##
# Tests module.
##
testModule() {
  TITLE="<< TESTING MODULE >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module alias: ${YELLOW}${1}\n
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${2}${DEFAULT}\n" "$TITLE"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2

  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  COVERAGE_BASE_PATH=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s\n
    ${DEFAULT} - module partial path name: ${YELLOW}%s\n
    ${DEFAULT} - coverage report base path: ${YELLOW}%s${DEFAULT}\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_BASE_PATH"

  if [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_NX_NG_STARTER" ]; then # "app:nx-ng-starter"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_API" ]
  then # "app:api"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_API_INTERFACE" ]
  then # "lib:api-interface"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_MOCKS_CORE" ]
  then # "lib:mocks-core"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_SHARED_CORE" ]
  then # "lib:shared-core"
    COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}/${MODULE_NAME}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif
    [[ "$MODULE_ALIAS" = "all" && "$OPTIONAL_ACTION" != "run" ]]
  then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "lib:api-interface"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    testModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "changed" ]
  then
    getChangedProjectAliases
    TITLE=">> testing changed apps and libs"
    printf "
      ${LIGHT_BLUE} %s${DEFAULT}\n" "$TITLE"
    for CHANGED_ALIAS in $CHANGED_ALIASES; do testModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
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
  if [ "$1" = "single-run" ]; then
    testModule "$2" "none" # test single run.
  elif [ "$1" = "single-run-and-report" ]; then
    testModule "$2" "report" # test single run, generate coverage report, and copy report to dist.
  elif [ "$1" = "run" ]; then
    testModule "$2" "watch" # run in watch mode.
  else
    reportUsageErrorAndExit
  fi
fi
