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
  # - find app aliases in module-aliases.sh
  # - remove e2e tests
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*" | awk '!/e2e/')

  printf "\n ${RED} ERROR${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh generate all${DEFAULT}\n
    ${LIGHT_BLUE}Document apps${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh generate ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh generate-and-report ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh serve ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${DEFAULT}\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for alias in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}${alias}${DEFAULT}\n"; done

  printf "
    ${LIGHT_BLUE}Document libs${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh generate ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh generate-and-report ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/document.sh serve ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${LIGHT_BLUE} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_BLUE} values:\n"

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
# Copies generated documentation to dist.
##
copyReportToDist() {
  printf "\n ${LIGHT_BLUE} COPY report:\n
    ${DEFAULT} - documentation dist path: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${2}${DEFAULT}\n
    \n\n"

  ##
  # Documentation root path.
  ##
  DOC_DIST_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter/documentation

  if [ "$2" = "report" ]; then
    # check documentation dist path existence
    if [ -d ${DOC_DIST_ROOT} ]; then
      printf "\n ${LIGHT_GREEN} documentation directory ${DOC_DIST_ROOT} exists, proceeding${DEFAULT}\n\n"
    else
      printf "\n ${RED} ERROR: directory ${DOC_DIST_ROOT} does not exist\n
        ${LIGHT_GREEN} creating directory ${DOC_DIST_ROOT}.${DEFAULT}\n
        \n\n"
      mkdir -p $DOC_DIST_ROOT
    fi
    cp -r ${PROJECT_ROOT}/documentation $1 || exitWithError
  fi
}

##
# Generates module documentation and performs optional action.
##
generateDocumentation() {
  printf "\n ${LIGHT_BLUE} >> generating documentation\n
    ${DEFAULT} - config path: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - documentation dist path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${3}${DEFAULT}\n
    \n\n"

  if [ "$3" = "serve" ]; then
    compodoc -p $1 -s
  else
    compodoc -p $1
    copyReportToDist $2 $3
  fi
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  printf "\n ${LIGHT_BLUE} >> checking tsconfig path and proceeding\n
    ${DEFAULT} - config path: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - documentation dist path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${3}${DEFAULT}\n
    \n\n"

  if [ ! -f $1 ]; then
    printf "\n ${RED} ERROR: configuration file ${1} not found${DEFAULT}\n\n"
    exitWithError
  else
    generateDocumentation $1 $2 $3
  fi
}

##
# Documents module.
##
documentModule() {
  printf "\n ${LIGHT_BLUE} DOCUMENTING MODULE\n
    ${DEFAULT} - module alias: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${2}${DEFAULT}\n"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2

  MODULE_NAME="$(echo "${MODULE_ALIAS//app\:/}")" # remove app: prefix
  MODULE_NAME="$(echo "${MODULE_NAME//lib\:/}")"  # removed lib: prefix

  MODULE_PARTIAL_PATH="$(echo "${MODULE_ALIAS//\:/s\/}")" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  DOCUMENTATION_APP_BASE_PATH=${PROJECT_ROOT}/dist/apps/nx-ng-starter
  DOCUMENTATION_LIBS_BASE_PATH=${PROJECT_ROOT}/dist/apps/nx-ng-starter/documentation

  printf "
    ${DEFAULT} - module name: ${YELLOW}${MODULE_NAME}${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}${MODULE_PARTIAL_PATH}${DEFAULT}\n
    ${DEFAULT} - documentation libs base path: ${YELLOW}${DOCUMENTATION_LIBS_BASE_PATH}${DEFAULT}\n
    \n\n"

  if [ $MODULE_ALIAS = $MODULE_ALIAS_APP_NX_NG_STARTER ]; then # "app:nx-ng-starter"
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_APP_BASE_PATH}
    CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.app.json
    checkConfigPathAndProceed $CONFIG_PATH $DOCUMENTATION_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_APP_API ]
  then # "app:api"
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_LIBS_BASE_PATH}/${MODULE_NAME}
    CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.app.json
    checkConfigPathAndProceed $CONFIG_PATH $DOCUMENTATION_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_API_INTERFACE ]
  then # "lib:api-interface"
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_LIBS_BASE_PATH}/${MODULE_NAME}
    CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.lib.json
    checkConfigPathAndProceed $CONFIG_PATH $DOCUMENTATION_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_SHARED_CORE ]
  then # "lib:shared-core"
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_LIBS_BASE_PATH}/${MODULE_NAME}
    CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.lib.json
    checkConfigPathAndProceed $CONFIG_PATH $DOCUMENTATION_DIST_PATH $OPTIONAL_ACTION
  elif
    [ $MODULE_ALIAS = $MODULE_ALIAS_LIB_MOCKS_CORE ]
  then # "lib:mocks-core"
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_LIBS_BASE_PATH}/${MODULE_NAME}
    CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.lib.json
    checkConfigPathAndProceed $CONFIG_PATH $DOCUMENTATION_DIST_PATH $OPTIONAL_ACTION
  elif
    [[ $MODULE_ALIAS = "all" && $OPTIONAL_ACTION != "serve" ]]
  then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    documentModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    documentModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "lib:api-interface"
    documentModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    documentModule $MODULE_ALIAS $OPTIONAL_ACTION
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    documentModule $MODULE_ALIAS $OPTIONAL_ACTION
  else
    reportUsageErrorAndExit
  fi
}

##
# Documentation generation control flow.
##
if [ $# -lt 2 ]; then
  reportUsageErrorAndExit
else
  if [ "$1" = "generate" ]; then
    documentModule $2 # generate documentation.
  elif [ "$1" = "generate-and-report" ]; then
    documentModule $2 "report" # generate documentation and copy report to dist.
  elif [ "$1" = "serve" ]; then
    documentModule $2 "serve" # serve documentation.
  else
    reportUsageErrorAndExit
  fi
fi
