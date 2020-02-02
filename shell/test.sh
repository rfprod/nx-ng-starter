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
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run all
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash shell/test.sh single-run-and-report ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash shell/test.sh run ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>\n" "$TITLE"

  reportSupportedModuleAliasesUnit

  printf "\n\n"

  exitWithError
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  local TITLE="<< COPY REPORT TO DIST >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module partial path: ${YELLOW}${1}
    ${DEFAULT} - coverage dist path: ${YELLOW}${2}
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${3}
    ${DEFAULT}\n\n" "$TITLE"

  ##
  # Coverage root path.
  ##
  local COV_DISTR_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  if [ "$3" = "report" ]; then
    # check coverage dist path existence
    if [ -d ${COV_DISTR_ROOT} ]; then
      printf "
        ${LIGHT_GREEN} coverage directory %s exists, proceeding${DEFAULT}\n\n" "$COV_DISTR_ROOT"
    else
      TITLE="<< ERROR >>"
      printf "
        ${RED}%s\n
        ${LIGHT_RED} directory %s does not exist
        ${LIGHT_BLUE} creating directory %s.
        ${DEFAULT}\n\n" "$COV_DISTR_ROOT" "$COV_DISTR_ROOT"
      mkdir -p $COV_DISTR_ROOT
    fi
    cp -r ${PROJECT_ROOT}/coverage/"${1}" "$2" || exitWithError
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  local TITLE="<< TESTING MODULE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module name: ${YELLOW}${1}
    ${DEFAULT} - module partial path: ${YELLOW}${2}
    ${DEFAULT} - coverage dist path: ${YELLOW}${3}
    ${DEFAULT} - optional action (report, watch): ${YELLOW}${4}
    ${DEFAULT}\n\n" "$TITLE"

  if [ "$4" = "watch" ]; then
    ng test "$1" --passWithNoTests --watchAll
  else
    ng test "$1" --watch=false --silent --passWithNoTests || exitWithError
    copyReportToDist "$2" "$3" "$4"
  fi
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=test --base=origin/master --passWithNoTests
}

##
# Tests module.
##
testModule() {
  local TITLE="<< TESTING MODULE (unit) >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module alias: ${YELLOW}%s
    ${DEFAULT} - optional action (report, watch): ${YELLOW}%s${DEFAULT}" "$TITLE" "$1" "$2"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"        # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  local COVERAGE_BASE_PATH=${PROJECT_ROOT}/dist/apps/nx-ng-starter/coverage

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path name: ${YELLOW}%s
    ${DEFAULT} - coverage report base path: ${YELLOW}%s${DEFAULT}\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_BASE_PATH"

  local ALIAS_EXISTS=
  moduleAliasUnitExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    local COVERAGE_DIST_PATH=${COVERAGE_BASE_PATH}
    printf "
    ${DEFAULT} - coverage dist path: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$COVERAGE_DIST_PATH"
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$COVERAGE_DIST_PATH" "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    for MODULE_ALIAS_VAR in "${MODULE_ALIAS_VARS_UNIT[@]}"; do testModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    TITLE="<< TESTING CHANGED APPS AND LIBS >>"
    printf "
      ${LIGHT_BLUE}%s${DEFAULT}\n" "$TITLE"
    ##
    # Import Git helpers.
    ##
    source shell/git-extension.sh
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do testModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
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
