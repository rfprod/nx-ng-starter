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
    ${DEFAULT} - ${YELLOW} bash shell/lint.sh all
    ${DEFAULT} - ${YELLOW} bash shell/lint.sh all fix
    ${DEFAULT} - ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG>
    ${DEFAULT} - ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<MODULE_ALIAS_FROM_TSCONFIG> ${YELLOW}fix\n" "$TITLE"

  reportSupportedModuleAliases

  printf "\n\n"

  exitWithError
}

##
# Removes spaces between imports in *.ts files.
##
removeSpacesBetweenImports() {
  local TITLE="<< REMOVING SPACES BETWEEN IMPORTS >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module path: ${YELLOW}${1}${DEFAULT}\n\n" "$TITLE"

  find "$1" -type f -name "*.ts" -exec sed -i -z 's/\n\nimport/\nimport/g' {} +
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  local TITLE="<< CHECKING MODULE PATH AND PROCEEDING >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module name: ${YELLOW}${1}
    ${DEFAULT} - module partial path: ${YELLOW}${2}
    ${DEFAULT} - optional action (fix): ${YELLOW}${3}${DEFAULT}" "$TITLE"

  local MODULE_PATH="${PROJECT_ROOT}/${2}"

  local STYLELINT_PATHS="${MODULE_PATH}/src/**/*.scss"

  local PRETTIER_HTML_PATHS="${MODULE_PATH}/src/**/*.html"

  printf "
    ${DEFAULT} - stylelint path: ${YELLOW}%s
    ${DEFAULT} - prettier html path: ${YELLOW}%s${DEFAULT}\n" "$STYLELINT_PATHS" "$PRETTIER_HTML_PATHS"

  MODULE_HAS_SCSS_FILES="$(find "${2}" -type f -name "*.scss")" # checks if module contains scss files

  MODULE_HAS_HTML_FILES="$(find "${2}" -type f -name "*.html")" # checks if module contains html files

  printf "
    ${DEFAULT} - module has scss files:\n${YELLOW}%s
    ${DEFAULT} - module has html files:\n${YELLOW}%s${DEFAULT}
    \n\n" "$MODULE_HAS_SCSS_FILES" "$MODULE_HAS_HTML_FILES"

  if [ ! -d "$MODULE_PATH" ]; then
    printf "
      ${RED} ERROR: module path %s not found${DEFAULT}\n\n" "$MODULE_PATH"
    exitWithError
  else
    if [ "$3" = "fix" ]; then
      # firstly remove spaces between imports in *.ts files
      removeSpacesBetweenImports "$MODULE_PATH"
      # ts formatting with nx
      npx nx lint "$1" "--${3}" || exitWithError
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        npx stylelint "$STYLELINT_PATHS" "--${3}" || exitWithError
      else
        TITLE="<< INFO (stylelint) >>"
        printf "
          ${LIGHT_BLUE}%s\n
          ${DEFAULT} module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n" "$TITLE"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c --write "$PRETTIER_HTML_PATHS" || exitWithError
      else
        TITLE="<< INFO (prettier) >>"
        printf "
          ${LIGHT_BLUE}%s\n
          ${DEFAULT} module does not contain html files and will not be checked with prettier\n${DEFAULT}\n" "$TITLE"
      fi
    else
      # ts formatting with nx
      npx nx lint "$1" || exitWithError
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        # catch stylelint exit code; it returns 2 in case of errors
        if ! npx stylelint "$STYLELINT_PATHS"; then
          exitWithError
        fi
      else
        TITLE="<< INFO (stylelint) >>"
        printf "
          ${LIGHT_BLUE}%s\n
          ${DEFAULT} module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n" "$TITLE"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c "$PRETTIER_HTML_PATHS" || exitWithError
      else
        TITLE="<< INFO (prettier) >>"
        printf "
          ${LIGHT_BLUE}%s\n
          ${DEFAULT} module does not contain html files and will not be checked with prettier\n${DEFAULT}\n" "$TITLE"
      fi
    fi
  fi
}

##
# Lints module.
##
lintModule() {
  local TITLE="<< LINTING MODULE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module alias: ${YELLOW}%s
    ${DEFAULT} - optional action (fix): ${YELLOW}%s${DEFAULT}" "$TITLE" "$1" "$2"

  local MODULE_ALIAS=$1
  local OPTIONAL_ACTION=$2

  local MODULE_NAME
  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path name: ${YELLOW}%s${DEFAULT}\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH"

  local ALIAS_EXISTS=
  moduleAliasExists "${MODULE_ALIAS}" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif [ "$MODULE_ALIAS" = "all" ]; then
    for MODULE_ALIAS_VAR in "${MODULE_ALIAS_VARS[@]}"; do lintModule "$MODULE_ALIAS_VAR" "$OPTIONAL_ACTION"; done
  elif [ "$MODULE_ALIAS" = "changed" ]; then
    ##
    # Import Git extension which finds changed aliases.
    ##
    source shell/git-extension.sh
    for CHANGED_ALIAS in $CHANGED_ALIASES; do lintModule "$CHANGED_ALIAS" "$OPTIONAL_ACTION"; done
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
