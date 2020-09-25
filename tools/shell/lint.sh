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
  printUsageTip "bash tools/shell/lint.sh all" "lint all apps and libs"
  printUsageTip "bash tools/shell/lint.sh all fix" "lint all apps and libs fixing linting issues"
  printUsageTip "bash tools/shell/lint.sh <MODULE_ALIAS_FROM_TSCONFIG>" "lint specific application/library"
  printUsageTip "bash tools/shell/lint.sh <MODULE_ALIAS_FROM_TSCONFIG> fix" "lint specific application/library fixing linting issues"

  reportSupportedModuleAliases

  printGap

  exit 1
}

##
# Removes spaces between imports in *.ts files.
##
removeSpacesBetweenImports() {
  printInfoTitle "<< REMOVING SPACES BETWEEN IMPORTS >>"
  printNameAndValue "module path" "$1"
  printGap

  find "$1" -type f -name "*.ts" -exec sed -i -z 's/\n\nimport/\nimport/g' {} +
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  printInfoTitle "<< CHECKING MODULE PATH AND PROCEEDING >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "optional action (fix)" "$3"

  local MODULE_PATH="${PROJECT_ROOT}/${2}"

  local STYLELINT_PATHS="${MODULE_PATH}/src/**/*.scss"

  local PRETTIER_HTML_PATHS="${MODULE_PATH}/src/**/*.html"

  printNameAndValue "stylelint paths" "$STYLELINT_PATHS"
  printNameAndValue "prettier html paths" "$PRETTIER_HTML_PATHS"

  MODULE_HAS_SCSS_FILES="$(find "${2}" -type f -name "*.scss")" # checks if module contains scss files

  MODULE_HAS_HTML_FILES="$(find "${2}" -type f -name "*.html")" # checks if module contains html files

  printNameAndValue "module has scss files" "$MODULE_HAS_SCSS_FILES"
  printNameAndValue "module has html files" "$MODULE_HAS_HTML_FILES"
  printGap

  if [ ! -d "$MODULE_PATH" ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "module path $MODULE_PATH not found"
    printGap

    exit 1
  else
    if [ "$3" = "fix" ]; then
      # firstly remove spaces between imports in *.ts files
      removeSpacesBetweenImports "$MODULE_PATH"
      # ts formatting with nx
      npx nx lint "$1" "--${3}"
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        npx stylelint "$STYLELINT_PATHS" "--${3}"
      else
        printInfoTitle "<< INFO (stylelint) >>"
        printInfoMessage "module does not contain scss files and will not be checked with stylelint"
        printGap
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c --write "$PRETTIER_HTML_PATHS"
      else
        printInfoTitle "<< INFO (prettier) >>"
        printInfoMessage "module does not contain html files and will not be checked with prettier"
        printGap
      fi
    else
      # ts formatting with nx
      npx nx lint "$1" || exit 1
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        # catch stylelint exit code; it returns 2 in case of errors
        if ! npx stylelint "$STYLELINT_PATHS"; then
          exit 1
        fi
      else
        printInfoTitle "<< INFO (stylelint) >>"
        printInfoMessage "module does not contain scss files and will not be checked with stylelint"
        printGap
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c "$PRETTIER_HTML_PATHS" || exit 1
      else
        printInfoTitle "<< INFO (prettier) >>"
        printInfoMessage "module does not contain html files and will not be checked with prettier"
        printGap
      fi
    fi
  fi
}

##
# Lints affected using NX.
##
lintAffected() {
  npx nx affected --target=lint --base=origin/master --head=HEAD --parallel --maxParallel=2
}

##
# Lints module.
##
lintModule() {
  printInfoTitle "<< LINTING MODULE >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action (fix)" "$2"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/client for subsequent path formation

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES[@]}"; do lintModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    ##
    # Import Git extension which finds changed aliases.
    ##
    source tools/shell/git-extension.sh
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do lintModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "affected" ]; then
    printInfoTitle "<< LINTING AFFECTED APPS AND LIBS >>"
    printGap

    lintAffected
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
    lintModule "$1" "none"
  else
    lintModule "$1" "$2"
  fi
fi
