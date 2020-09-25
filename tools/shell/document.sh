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
# Printing utility functions.
##
source tools/shell/print-utils.sh ''
##
# Project root.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< USAGE >>"
  printUsageTip "bash tools/shell/document.sh generate all" "generate all documentation"
  printUsageTip "bash tools/shell/document.sh generate <MODULE_ALIAS_FROM_TSCONFIG>" "generate documentation for a specific application/library"
  printUsageTip "bash tools/shell/document.sh generate-and-report <MODULE_ALIAS_FROM_TSCONFIG>" "generate documentation for a specific application/library and copy report to dist"
  printUsageTip "bash tools/shell/document.sh serve <MODULE_ALIAS_FROM_TSCONFIG>" "serve documentation for a specific application/library"

  reportSupportedModuleAliases

  printGap

  exit 1
}

##
# Copies generated documentation to dist.
##
copyReportToDist() {
  printInfoTitle "<< COPY report >>"
  printNameAndValue "documentation dist path" "$1"
  printNameAndValue "optional action (report, serve)" "$2"
  printGap

  ##
  # Documentation root path.
  ##
  local DOC_DIST_ROOT=${PROJECT_ROOT}/dist/apps/documentation/compodoc

  if [ "$2" = "report" ]; then
    # check documentation dist path existence
    if [ -d ${DOC_DIST_ROOT} ]; then
      printSuccessMessage "documentation directory $DOC_DIST_ROOT exists, proceeding"
    else
      printErrorTitle "<< ERROR >>"
      printWarningMessage "directory $DOC_DIST_ROOT does not exist"
      printSuccessMessage "creating directory $DOC_DIST_ROOT"
      printGap

      mkdir -p "$DOC_DIST_ROOT"
    fi
    cp -r ${PROJECT_ROOT}/documentation "$1" || exit 1
    # copy dists to deployed application dist so that it's accessible online
    cp -r ${PROJECT_ROOT}/dist/compodoc/* "$DOC_DIST_ROOT" || exit 1
  fi
}

##
# Generates module documentation and performs optional action.
##
generateDocumentation() {
  printInfoTitle "<< GENERATING DOCUMENTATION >>"
  printNameAndValue "config path" "$1"
  printNameAndValue "documentation dist path" "$2"
  printNameAndValue "optional action (report, serve)" "$3"
  printGap

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
  printInfoTitle "<< checking tsconfig path and proceeding >>"
  printNameAndValue "config path" "$1"
  printNameAndValue "documentation dist path" "$2"
  printNameAndValue "optional action (report, serve)" "$3"
  printGap

  if [ ! -f "$1" ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "configuration file $1 not found"
    printGap

    exit 1
  else
    generateDocumentation "$1" "$2" "$3"
  fi
}

##
# Documents module.
##
documentModule() {
  printInfoTitle "<< DOCUMENTING MODULE >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action (report, serve)" "$2"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # removed lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/client for subsequent path formation

  local DOCUMENTATION_BASE_PATH=${PROJECT_ROOT}/dist/compodoc
  mkdir -p "$DOCUMENTATION_BASE_PATH"

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printNameAndValue "documentation base path" "$DOCUMENTATION_BASE_PATH"
  printGap

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
