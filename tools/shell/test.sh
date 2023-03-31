#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''
source tools/shell/git-extension.sh ''

source tools/shell/utils/config.sh

##
# Project root reference.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/test.sh reports" "copy pregenerated reports to dist"
  # printUsageTip "bash tools/shell/test.sh single-run all" "test all modules"
  # printUsageTip "bash tools/shell/test.sh single-run changed" "test changed modules"
  # printUsageTip "bash tools/shell/test.sh single-run-and-report changed" "test changed modules and collect coverage"
  # printUsageTip "bash tools/shell/test.sh single-run-and-report:ci \$MODULE_ALIAS" "test a module and collect coverage in CI environment"
  # printUsageTip "bash tools/shell/test.sh single-run \$MODULE_ALIAS" "test a module"
  # printUsageTip "bash tools/shell/test.sh single-run-and-report \$MODULE_ALIAS" "test a module and collect coverage"

  reportSupportedModuleAliasesUnit

  printGap

  exit 1
}

##
# Copies all pregenerated coverage reports to the dist folder.
##
copyReportsToDist() {
  printInfoTitle "<< Copy reports to dist >>"
  printGap

  ##
  # Documentation app dist path.
  ##
  local DOCUMENTATION_APP_DIST_PATH
  DOCUMENTATION_APP_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation

  if [ ! -d ${DOCUMENTATION_APP_DIST_PATH} ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "Documentation app dist should be generated first."
    printGap
    exit 1
  fi

  ##
  # Coverage root path.
  ##
  local COVERAGE_DIST_ROOT
  COVERAGE_DIST_ROOT=${DOCUMENTATION_APP_DIST_PATH}/assets

  if [ -d ${COVERAGE_DIST_ROOT} ]; then
    printSuccessMessage "directory $COVERAGE_DIST_ROOT exists, proceeding"
    printGap
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "directory $COVERAGE_DIST_ROOT does not exist"
    printInfoMessage "creating directory $COVERAGE_DIST_ROOT"
    printGap

    mkdir -p $COVERAGE_DIST_ROOT
  fi

  cp -r ./coverage "$COVERAGE_DIST_ROOT" || exit 1
}

##
# Copies generated report to dist folder.
##
copyReportToDist() {
  printInfoTitle "<< Copy report to dist >>"
  printNameAndValue "module partial path" "$1"
  printNameAndValue "optional action: report" "$2"
  printGap

  if [ "$2" = "report" ]; then
    ##
    # Coverage root paths.
    ##
    local -A COV_DIST_ROOTS=(
      ["${PROJECT_ROOT}/dist/coverage"]="${PROJECT_ROOT}"/dist/coverage
    )

    for COV_DISTR_ROOT in "${COV_DIST_ROOTS[@]}"; do
      # check coverage dist path existence
      if [ -d "${COV_DISTR_ROOT}" ]; then
        printSuccessMessage "coverage directory $COV_DISTR_ROOT exists, proceeding"
      else
        printErrorTitle "<< ERROR >>"
        printWarningMessage "directory $COV_DISTR_ROOT does not exist"
        printSuccessMessage "creating directory $COV_DISTR_ROOT"
        printGap

        mkdir -p "$COV_DISTR_ROOT"
      fi
      cp -r ${PROJECT_ROOT}/coverage/"${1}" "$COV_DISTR_ROOT" || exit 1
    done
  fi
}

##
# Performs module testing considering optional action.
##
performModuleTesting() {
  printInfoTitle "<< Perform module testing >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "optional action: report" "$3"
  printNameAndValue "optional environment: ci" "$4"
  printGap

  if [ "$3" = "report" ]; then
    # use additional flags in CI environment
    if [ "$4" = "ci" ]; then
      npx nx test "$1" --watch=false --silent --pass-with-no-tests --run-in-band --ci || exit 1
    else
      npx nx test "$1" --watch=false --silent --pass-with-no-tests --run-in-band || exit 1
    fi
    copyReportToDist "$2" "$3"
  else
    # use additional flags in CI environment
    if [ "$4" = "ci" ]; then
      npx nx test --project="$1" --watch=false --silent --pass-with-no-tests --run-in-band --ci --code-coverage=true || exit 1
    else
      npx nx test --project="$1" --watch=false --silent --pass-with-no-tests --run-in-band --code-coverage=true || exit 1
    fi
  fi
}

##
# Tests affected using NX.
##
testAffected() {
  npx nx affected --target=test --base=origin/dev --head=HEAD --pass-with-no-tests --watch=false --run-in-band --ci --code-coverage=true || exit 1
}

##
# Tests all using NX.
##
testAll() {
  npx nx run-many --target=test --all --pass-with-no-tests --watch=false --run-in-band --ci --code-coverage=true || exit 1
}

##
# Tests module.
##
testModule() {
  printInfoTitle "<< Testing module >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action: report" "$2"
  printNameAndValue "optional environment: ci" "$3"

  local MODULE_ALIAS
  MODULE_ALIAS=$1

  local OPTIONAL_ACTION
  OPTIONAL_ACTION=$2

  local OPTIONAL_ENVIRONMENT
  OPTIONAL_ENVIRONMENT=$3

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  local MODULE_PARTIAL_PATH
  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s\/}" # partial module path, e.g. apps/transport for subsequent path formation

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printGap

  local ALIAS_EXISTS
  moduleAliasUnitExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    performModuleTesting "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION" "$OPTIONAL_ENVIRONMENT"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    printInfoTitle "<< Testing all apps and libs >>"
    printGap
    testAll
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    printInfoTitle "<< Testing changed apps and libs >>"
    printGap
    getChangedProjectAliases
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do testModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "affected" ]; then
    printInfoTitle "<< Testing affected apps and libs >>"
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
  if [ "$1" = "single-run" ]; then
    printErrorTitle "This command is deprecated"
    printInfoTitle "Use workspace executors:"
    printUsageTip "npx nx run-many --target test --all --run-in-band" "jest unit test"
    exit 1
    # testModule "$2" "none" # test single run.
  elif [ "$1" = "single-run-and-report" ]; then
    printErrorTitle "This command is deprecated"
    printInfoTitle "Use workspace executors:"
    printUsageTip "npx nx run-many --target test --all --run-in-band --code-coverage" "jest unit test"
    exit 1
    # testModule "$2" "report" # test single run, generate coverage report, and copy report to dist.
  elif [ "$1" = "single-run-and-report:ci" ]; then
    printErrorTitle "This command is deprecated"
    printInfoTitle "Use workspace executors:"
    printUsageTip "npx nx run-many --target test --all --run-in-band --code-coverage --ci" "jest unit test"
    exit 1
    # testModule "$2" "report" "ci" # test single run, generate coverage report, and copy report to dist in CI environment.
  elif [ "$1" = "reports" ]; then
    copyReportsToDist # copy pregenerated reports to dist.
  else
    reportUsageErrorAndExit
  fi
fi
