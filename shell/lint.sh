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
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*")

  printf "\n ${RED} ERROR${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh all${DEFAULT}\n
    ${LIGHT_BLUE}Lint specific app${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<APP_ALIAS>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<APP_ALIAS> ${YELLOW}fix${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<APP_ALIAS>${LIGHT_CYAN} values:\n"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for alias in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias}${DEFAULT}\n"; done

  printf "
    ${LIGHT_BLUE}Lint libs${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG> ${YELLOW}fix${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_CYAN} values:\n"

  ##
  # Does the following:
  # - find lib aliases in tsconfig
  # - remove duplicates
  ##
  LIB_ALIASES=$(find ./tsconfig.json | xargs grep -o "libs\/[a-z0-9-]*" | awk '!a[$0]++')

  ##
  # Prints found and filtered lib aliases as it should be used with this script.
  ##
  for alias in $LIB_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias//s\//\:}${DEFAULT}\n"; done

  printf "\n\n"

  exitWithError
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed () {
  printf "\n ${LIGHT_BLUE} >> checking module path and proceeding\n
    ${DEFAULT} - module name: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (fix): ${YELLOW}${3}${DEFAULT}\n"

  MODULE_PATH="${PROJECT_ROOT}/${2}"

  STYLELINT_PATHS="${MODULE_PATH}/src/**/*.scss"

  PRETTIER_HTML_PATHS="${MODULE_PATH}/src/**/*.html"

  printf "
    ${DEFAULT} - stylelint path: ${YELLOW}${STYLELINT_PATHS}${DEFAULT}\n
    ${DEFAULT} - prettier html path: ${YELLOW}${PRETTIER_HTML_PATHS}${DEFAULT}\n"

  MODULE_HAS_SCSS_FILES="$(find "${2}" -type f -name "*.scss")" # checks if module contains scss files

  MODULE_HAS_HTML_FILES="$(find "${2}" -type f -name "*.html")" # checks if module contains html files

  printf "
    ${DEFAULT} - module has scss files:\n${YELLOW}${MODULE_HAS_SCSS_FILES}${DEFAULT}\n
    ${DEFAULT} - module has html files:\n${YELLOW}${MODULE_HAS_HTML_FILES}${DEFAULT}\n
    \n\n"

  if [ ! -d $MODULE_PATH ]; then
    printf "\n ${RED} ERROR: module path ${MODULE_PATH} not found${DEFAULT}\n\n"
    exitWithError
  else
    if [ "$3" = "fix" ]; then
      # ts formatting with nx
      npx nx lint $1 "--${3}" || exitWithError
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ] ; then
        npx stylelint $STYLELINT_PATHS "--${3}" || exitWithError
      else
        printf "\n ${LIGHT_BLUE} INFO:\n
          module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ] ; then
        npx prettier -c --write $PRETTIER_HTML_PATHS || exitWithError
      else
        printf "\n ${LIGHT_BLUE} INFO:\n
          module does not contain html files and will not be checked with prettier\n${DEFAULT}\n"
      fi
    else
      # ts formatting with nx
      npx nx lint $1 || exitWithError
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        npx stylelint $STYLELINT_PATHS
        # catch stylelint exit code; it returns 2 in case of errors
        if [ "$?" != "0" ]; then
          exitWithError
        fi
      else
        printf "\n ${LIGHT_BLUE} INFO:\n
          module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ] ; then
        npx prettier -c $PRETTIER_HTML_PATHS || exitWithError
      else
        printf "\n ${LIGHT_BLUE} INFO:\n
          module does not contain html files and will not be checked with prettier\n${DEFAULT}\n"
      fi
    fi
  fi
}

##
# Lints module.
##
lintModule () {
  printf "\n ${LIGHT_BLUE} LINTING MODULE\n
    ${DEFAULT} - module alias: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - optional action (fix): ${YELLOW}${2}${DEFAULT}\n"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2

  MODULE_NAME="$(echo "${MODULE_ALIAS//app\:/}")" # remove app: prefix
  MODULE_NAME="$(echo "${MODULE_NAME//lib\:/}")" # remove lib: prefix

  MODULE_PARTIAL_PATH="$(echo "${MODULE_ALIAS//\:/s/}")" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  printf "
    ${DEFAULT} - module name: ${YELLOW}${MODULE_NAME}${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}${MODULE_PARTIAL_PATH}${DEFAULT}\n
    \n\n"

  if [ $MODULE_ALIAS = $MODULE_ALIAS_APP_NX_NG_STARTER ]; then # "app:nx-ng-starter"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_APP_NX_NG_STARTER_E2E ]; then # "app:nx-ng-starter-e2e"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_APP_API ]; then # "app:api"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_API_INTERFACE ]; then # "lib:api-interface"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_MOCKS_CORE ]; then # "lib:mocks-core"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_SHARED_CORE ]; then # "lib:shared-core"
    checkConfigPathAndProceed $MODULE_NAME $MODULE_PARTIAL_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = "all" ]; then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER_E2E # "app:nx-ng-starter-e2e"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "lib:api-interface"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    lintModule $MODULE_ALIAS $OPTIONAL_ACTION
  else
    reportUsageErrorAndExit
  fi
}

##
# Linting control flow.
##
if [ $# -lt 1 ]; then
  reportUsageErrorAndExit
else
  if [ -z "${2}" ]; then
    ACTION="none"
    lintModule $1 "none"
    else
    lintModule $1 $2
  fi
fi
