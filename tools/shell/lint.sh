#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''
source tools/shell/git-extension.sh ''

##
# Project root reference.
##
PROJECT_ROOT=.

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/lint.sh all" "lint all module sources: ts, scss, html"
  printUsageTip "bash tools/shell/lint.sh all fix" "lint all module sources: ts, scss, html; and apply autofixes"
  printUsageTip "bash tools/shell/lint.sh all:1-by-1" "lint all module sources sequentially one by one using custom shell based on Nx commands: ts, scss, html"
  printUsageTip "bash tools/shell/lint.sh all:1-by-1 fix" "lint all module sources sequentially one by one using custom shell based on Nx commands: ts, scss, html; and apply autofixes"
  printUsageTip "bash tools/shell/lint.sh changed" "lint changed module sources: ts, scss, html"
  printUsageTip "bash tools/shell/lint.sh changed fix" "lint changed module sources: ts, scss, html; and apply autofixes"
  printUsageTip "bash tools/shell/lint.sh affected" "lint affected module sources: ts, scss, html"
  printUsageTip "bash tools/shell/lint.sh affected fix" "lint affected module sources: ts, scss, html; and apply autofixes"
  printUsageTip "bash tools/shell/lint.sh <APP_LIB_ALIAS>" "lint a module sources: ts, scss, html"
  printUsageTip "bash tools/shell/lint.sh <APP_LIB_ALIAS> fix" "lint a module sources: ts, scss, html; apply autofixes"

  reportSupportedModuleAliases

  printGap

  exit 1
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  printInfoTitle "<< Checking module path and proceeding >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"
  printNameAndValue "optional action (fix)" "$3"

  local MODULE_PATH
  MODULE_PATH="${PROJECT_ROOT}/${2}"

  local STYLELINT_PATHS
  STYLELINT_PATHS="${MODULE_PATH}/src/**/*.scss"

  local PRETTIER_HTML_PATHS
  PRETTIER_HTML_PATHS="${MODULE_PATH}/src/**/*.html"

  printNameAndValue "stylelint path" "$STYLELINT_PATHS"
  printNameAndValue "prettier html path" "$PRETTIER_HTML_PATHS"

  local MODULE_HAS_SCSS_FILES
  MODULE_HAS_SCSS_FILES="$(find "${2}" -type f -name "*.scss")" # checks if module contains scss files

  local MODULE_HAS_HTML_FILES
  MODULE_HAS_HTML_FILES="$(find "${2}" -type f -name "*.html")" # checks if module contains html files

  printNameAndValue "module scss files" "$MODULE_HAS_SCSS_FILES"
  printNameAndValue "module html files" "$MODULE_HAS_HTML_FILES"
  printGap

  if [ ! -d "$MODULE_PATH" ]; then
    printErrorTitle "<< ERROR >>"
    printErrorMessage "module path ${MODULE_PATH} not found"
    exit 1
  else
    if [ "$3" = "fix" ]; then
      # ts formatting with nx
      npx nx lint "$1" "--${3}" --parallel --max-parallel=2
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        npx stylelint "$STYLELINT_PATHS" --customSyntax=postcss-scss "--${3}"
      else
        printInfoTitle "<< Stylelint >>"
        printInfoMessage "module does not contain scss files and will not be checked with stylelint"
        printGap
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c --write "$PRETTIER_HTML_PATHS"
      else
        printInfoTitle "<< Prettier >>"
        printInfoMessage "module does not contain html files and will not be checked with prettier"
        printGap
      fi
    else
      # ts formatting with nx
      npx nx lint "$1" --parallel --max-parallel=2 || exit 1
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        # catch stylelint exit code; it returns 2 in case of errors
        if ! npx stylelint "$STYLELINT_PATHS" --customSyntax=postcss-scss; then
          exit 1
        fi
      else
        printInfoTitle "<< Stylelint >>"
        printInfoMessage "module does not contain scss files and will not be checked with stylelint"
        printGap
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c "$PRETTIER_HTML_PATHS" || exit 1
      else
        printInfoTitle "<< Prettier >>"
        printInfoMessage "module does not contain html files and will not be checked with prettier"
        printGap
      fi
    fi
  fi
}

##
# Lints affected TS sources using NX.
# Lints all SCSS sources.
# Lints all HTML sources.
##
lintAffected() {
  printInfoTitle "<< Linting affected >>"
  printNameAndValue "optional action: fix" "$1"
  printGap

  if [ "$1" = "fix" ]; then
    npx nx affected --target=lint --base=origin/dev --head=HEAD --fix --parallel --max-parallel=2 || exit 1
    npm run lint:scss:fix || exit 1
    npm run lint:html:fix || exit 1
  else
    npx nx affected --target=lint --base=origin/dev --head=HEAD --parallel --max-parallel=2 || exit 1
    npm run lint:scss || exit 1
    npm run lint:html || exit 1
  fi
}

##
# Lints all TS sources using NX.
# Lints all SCSS sources.
# Lints all HTML sources.
##
lintAll() {
  printInfoTitle "<< Linting all >>"
  printNameAndValue "optional action: fix" "$1"
  printGap

  if [ "$1" = "fix" ]; then
    npx nx run-many --target=lint --all --fix --parallel --max-parallel=2 || exit 1
    npm run lint:scss:fix || exit 1
    npm run lint:html:fix || exit 1
  else
    npx nx run-many --target=lint --all --parallel --max-parallel=2 || exit 1
    npm run lint:scss || exit 1
    npm run lint:html || exit 1
  fi
}

##
# Lints module.
##
lintModule() {
  printInfoTitle "<< Linting module >>"
  printNameAndValue "module alias" "$1"
  printNameAndValue "optional action (fix)" "$2"

  local MODULE_ALIAS
  MODULE_ALIAS=$1
  local OPTIONAL_ACTION
  OPTIONAL_ACTION=$2

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  local MODULE_PARTIAL_PATH
  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/transport for subsequent path formation

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printGap

  local ALIAS_EXISTS
  moduleAliasExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    printInfoTitle "<< Linting all sources >>"
    printGap
    lintAll "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all:1-by-1" ]; then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES[@]}"; do lintModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    printInfoTitle "<< Linting changed sources >>"
    printGap
    getChangedProjectAliases
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do lintModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "affected" ]; then
    printInfoTitle "<< Linting affected sources >>"
    printGap
    lintAffected "$OPTIONAL_ACTION"
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
