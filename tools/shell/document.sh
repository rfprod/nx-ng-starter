#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Project aliases.
##
source tools/shell/module-aliases.sh ''

##
# Configurable project root, may be useful in CI environment.
##
PROJECT_ROOT=.

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/document.sh generate all
    ${DEFAULT} - ${YELLOW} bash tools/shell/document.sh generate ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash tools/shell/document.sh generate-and-report ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash tools/shell/document.sh serve ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>\n" "$TITLE"

  reportSupportedModuleAliases

  printf "\n\n"

  exitWithError
}

##
# Copies generated documentation to dist.
##
copyReportToDist() {
  local TITLE="<< COPY report >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - documentation dist path: ${YELLOW}${1}
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${2}
    ${DEFAULT}\n\n" "$TITLE"

  ##
  # Documentation root path.
  ##
  local DOC_DIST_ROOT=${PROJECT_ROOT}/dist/apps/documentation/compodoc

  if [ "$2" = "report" ]; then
    # check documentation dist path existence
    if [ -d ${DOC_DIST_ROOT} ]; then
      printf "
        ${LIGHT_GREEN} documentation directory %s exists, proceeding${DEFAULT}\n\n" "$DOC_DIST_ROOT"
    else
      TITLE="<< ERROR >>"
      printf "
        ${RED} %s\n
        ${LIGHT_RED} directory %s does not exist
        ${LIGHT_GREEN} creating directory %s.
        ${DEFAULT}\n\n" "$TITLE" "$DOC_DIST_ROOT" "$DOC_DIST_ROOT"
      mkdir -p "$DOC_DIST_ROOT"
    fi
    cp -r ${PROJECT_ROOT}/documentation "$1" || exitWithError
    # copy dists to deployed application dist so that it's accessible online
    cp -r ${PROJECT_ROOT}/dist/compodoc/* "$DOC_DIST_ROOT" || exitWithError
  fi
}

##
# Generates module documentation and performs optional action.
##
generateDocumentation() {
  local TITLE=">> generating documentation"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - config path: ${YELLOW}${1}
    ${DEFAULT} - documentation dist path: ${YELLOW}${2}
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${3}
    ${DEFAULT}\n\n" "$TITLE"

  if [ "$3" = "serve" ]; then
    compodoc -p "$1" -s
  else
    compodoc -p "$1"
    copyReportToDist "$2" "$3"
  fi
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  local TITLE=">> checking tsconfig path and proceeding"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - config path: ${YELLOW}${1}
    ${DEFAULT} - documentation dist path: ${YELLOW}${2}
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${3}
    ${DEFAULT}\n\n" "$TITLE"

  if [ ! -f "$1" ]; then
    TITLE="<< ERROR >>"
    printf "
      ${RED} %s\n
      ${LIGHT_RED}configuration file %s not found${DEFAULT}\n\n" "$TITLE" "$1"
    exitWithError
  else
    generateDocumentation "$1" "$2" "$3"
  fi
}

##
# Documents module.
##
documentModule() {
  local TITLE="<< DOCUMENTING MODULE >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module alias: ${YELLOW}${1}
    ${DEFAULT} - optional action (report, serve): ${YELLOW}${2}${DEFAULT}" "$TITLE"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # removed lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/client for subsequent path formation

  local DOCUMENTATION_BASE_PATH=${PROJECT_ROOT}/dist/compodoc
  mkdir -p "$DOCUMENTATION_BASE_PATH"

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path name: ${YELLOW}%s
    ${DEFAULT} - documentation base path: ${YELLOW}%s
    ${DEFAULT}\n\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$DOCUMENTATION_BASE_PATH"

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    DOCUMENTATION_DIST_PATH=${DOCUMENTATION_BASE_PATH}/${MODULE_NAME}
    local CONFIG_PATH=${PROJECT_ROOT}/${MODULE_PARTIAL_PATH}/tsconfig.json
    checkConfigPathAndProceed "$CONFIG_PATH" "$DOCUMENTATION_DIST_PATH" "$OPTIONAL_ACTION"
  elif [[ "$MODULE_ALIAS" = "all" && "$OPTIONAL_ACTION" != "serve" ]]; then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES[@]}"; do documentModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
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
    documentModule "$2" # generate documentation.
  elif [ "$1" = "generate-and-report" ]; then
    documentModule "$2" "report" # generate documentation and copy report to dist.
  elif [ "$1" = "serve" ]; then
    documentModule "$2" "serve" # serve documentation.
  else
    reportUsageErrorAndExit
  fi
fi
