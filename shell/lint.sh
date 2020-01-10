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
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh -print0 | xargs -0 grep -o "app:[a-z0-9-]*")

  TITLE="<< ERROR >>"
  printf "\n ${RED} %s${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh all${DEFAULT}\n
    ${LIGHT_BLUE}Lint specific app${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<APP_ALIAS>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<APP_ALIAS> ${YELLOW}fix${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<APP_ALIAS>${LIGHT_CYAN} values:\n" "$TITLE"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for APP_ALIAS in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}%s${DEFAULT}\n" "$APP_ALIAS"; done

  TITLE="Lint libs"
  printf "
    ${LIGHT_BLUE}%s${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/lint.sh ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG> ${YELLOW}fix${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_CYAN} values:\n" "$TITLE"

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
    ${DEFAULT} # > ${YELLOW}%s${DEFAULT}\n" "${LIB_ALIAS//s\//\:}"; done

  printf "\n\n"

  exitWithError
}

##
# Check if required path exists and proceeds with documentation generation.
##
checkConfigPathAndProceed() {
  TITLE=">> checking module path and proceeding"
  printf "\n ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module name: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}${DEFAULT}\n
    ${DEFAULT} - optional action (fix): ${YELLOW}${3}${DEFAULT}\n" "$TITLE"

  MODULE_PATH="${PROJECT_ROOT}/${2}"

  STYLELINT_PATHS="${MODULE_PATH}/src/**/*.scss"

  PRETTIER_HTML_PATHS="${MODULE_PATH}/src/**/*.html"

  printf "
    ${DEFAULT} - stylelint path: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - prettier html path: ${YELLOW}%s${DEFAULT}\n" "$STYLELINT_PATHS" "$PRETTIER_HTML_PATHS"

  MODULE_HAS_SCSS_FILES="$(find "${2}" -type f -name "*.scss")" # checks if module contains scss files

  MODULE_HAS_HTML_FILES="$(find "${2}" -type f -name "*.html")" # checks if module contains html files

  printf "
    ${DEFAULT} - module has scss files:\n${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - module has html files:\n${YELLOW}%s${DEFAULT}\n
    \n\n" "$MODULE_HAS_SCSS_FILES" "$MODULE_HAS_HTML_FILES"

  if [ ! -d "$MODULE_PATH" ]; then
    printf "\n ${RED} ERROR: module path %s not found${DEFAULT}\n\n" "$MODULE_PATH"
    exitWithError
  else
    TITLE="INFO"
    if [ "$3" = "fix" ]; then
      # ts formatting with nx
      npx nx lint "$1" "--${3}" || exitWithError
      # scss formatting with stylelint
      if [ -n "${MODULE_HAS_SCSS_FILES}" ]; then
        npx stylelint "$STYLELINT_PATHS" "--${3}" || exitWithError
      else
        printf "\n ${LIGHT_BLUE} %s:\n
          module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n" "$TITLE"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c --write "$PRETTIER_HTML_PATHS" || exitWithError
      else
        printf "\n ${LIGHT_BLUE} %s:\n
          module does not contain html files and will not be checked with prettier\n${DEFAULT}\n" "$TITLE"
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
        printf "\n ${LIGHT_BLUE} %s:\n
          module does not contain scss files and will not be checked with stylelint\n${DEFAULT}\n" "$TITLE"
      fi
      # html formatting with prettier
      if [ -n "${MODULE_HAS_HTML_FILES}" ]; then
        npx prettier -c "$PRETTIER_HTML_PATHS" || exitWithError
      else
        printf "\n ${LIGHT_BLUE} %s:\n
          module does not contain html files and will not be checked with prettier\n${DEFAULT}\n" "$TITLE"
      fi
    fi
  fi
}

##
# Lints module.
##
lintModule() {
  TITLE="<< LINTING MODULE >>"
  printf "\n ${LIGHT_BLUE} %s\n
    ${DEFAULT} - module alias: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - optional action (fix): ${YELLOW}%s${DEFAULT}\n" "$TITLE" "$1" "$2"

  MODULE_ALIAS=$1
  OPTIONAL_ACTION=$2

  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH"

  if [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_NX_NG_STARTER" ]; then # "app:nx-ng-starter"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_NX_NG_STARTER_E2E" ]
  then # "app:nx-ng-starter-e2e"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_API" ]
  then # "app:api"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_API_INTERFACE" ]
  then # "lib:api-interface"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_MOCKS_CORE" ]
  then # "lib:mocks-core"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_SHARED_CORE" ]
  then # "lib:shared-core"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_PROTO" ]
  then # "lib:proto"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "all" ]
  then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER_E2E # "app:nx-ng-starter-e2e"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "lib:api-interface"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_PROTO # "lib:proto"
    lintModule "$MODULE_ALIAS" "$OPTIONAL_ACTION"
  elif
    [ "$MODULE_ALIAS" = "changed" ]
  then
    getChangedProjectAliases
    printf "\n
      ${LIGHT_BLUE} >> linting changed apps and libs:${DEFAULT}\n${YELLOW}%s \n" "$CHANGED_ALIASES"
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
