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
# Configurable project root, may be useful in CI environment.
##
PROJECT_ROOT=.

##
# Changelog root path.
##
CHANGELOG_ROOT=${PROJECT_ROOT}/changelog

##
# Apps changelog path.
##
CHANGELOG_APPS=${PROJECT_ROOT}/changelog/apps

##
# Libs changelog path.
##
CHANGELOG_LIBS=${PROJECT_ROOT}/changelog/libs

##
# Checks changelog directories existence, and creates directories if it does not exist.
##
checkChangelogDirectoriesExistence() {
  if [ -d ${CHANGELOG_ROOT} ]; then
    printf "\n ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_ROOT"
  else
    printf "\n ${RED} ERROR: changelog directory %s does not exist\n
      ${LIGHT_GREEN} creating changelog directory %s.${DEFAULT}\n
      \n\n" "$CHANGELOG_ROOT"
    mkdir -p $CHANGELOG_ROOT
  fi

  if [ -d ${CHANGELOG_APPS} ]; then
    printf "\n ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_APPS"
  else
    printf "\n ${RED} ERROR: changelog directory %s does not exist\n
      ${LIGHT_GREEN} creating changelog directory %s.${DEFAULT}\n
      \n\n" "$CHANGELOG_APPS"
    mkdir -p $CHANGELOG_APPS
  fi

  if [ -d ${CHANGELOG_LIBS} ]; then
    printf "\n ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_LIBS"
  else
    printf "\n ${RED} ERROR: changelog directory %s does not exist\n
      ${LIGHT_GREEN} creating changelog directory %s.${DEFAULT}\n
      \n\n" "$CHANGELOG_LIBS"
    mkdir -p $CHANGELOG_LIBS
  fi
}

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
  ##
  # Does the following:
  # - find app aliases in module-aliases.sh
  ##
  APP_ALIASES=$(find ./shell/module-aliases.sh | xargs grep -o "app:[a-z0-9-]*")

  TITLE="ERROR"
  printf "\n ${RED} %s${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${LIGHT_GREEN} note${DEFAULT} - changelog is reported to dist by default\n
    ${DEFAULT} # > ${YELLOW} bash shell/changelog.sh all${DEFAULT} - generate changelog for all apps and libs\n
    ${LIGHT_BLUE}Generate changelog for a specific app${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/changelog.sh ${LIGHT_GREEN}<APP_ALIAS>${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<APP_ALIAS>${LIGHT_CYAN} values:\n" "$TITLE"

  ##
  # Prints found app aliases as it should be used with this script.
  ##
  for APP_ALIAS in $APP_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}%s${DEFAULT}\n" "$APP_ALIAS"; done

  TITLE="Generate changelog for a specific lib"
  printf "\n
    ${LIGHT_BLUE} %s ${DEFAULT}:\n
    ${DEFAULT} # > ${YELLOW} bash shell/changelog.sh ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSONFIG>${DEFAULT}\n
    ${LIGHT_CYAN} currently supported ${LIGHT_GREEN}<LIB_ALIAS_FROM_TSCONFIG>${LIGHT_CYAN} values:\n" "$TITLE"

  ##
  # Does the following:
  # - find lib aliases in tsconfig
  # - remove duplicates
  ##
  LIB_ALIASES=$(find ./tsconfig.json | xargs grep -o "libs\/[a-z0-9-]*" | awk '!a[$0]++')

  ##
  # Prints found and filtered lib aliases as it should be used with this script.
  ##
  for LIB_ALIAS in $LIB_ALIASES; do printf "
    ${DEFAULT} # > ${YELLOW}%s${DEFAULT}\n" "${LIB_ALIAS//s\//\:}"; done

  printf "\n\n"

  exitWithError
}

##
# Copies generated changelog to dist.
##
copyReportToDist() {
  TITLE="COPY changelog to dist"
  printf "\n ${LIGHT_BLUE} %s${DEFAULT}\n\n" "$TITLE"

  ##
  # Changelog root path.
  ##
  CHANGELOG_DIST_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter

  # check documentation dist path existence
  if [ -d ${CHANGELOG_DIST_ROOT} ]; then
    printf "\n ${LIGHT_GREEN} directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_DIST_ROOT"
  else
    printf "\n ${RED} ERROR: directory %s does not exist\n
      ${LIGHT_GREEN} creating directory %s.${DEFAULT}\n
      \n\n" "$CHANGELOG_DIST_ROOT"
    mkdir -p $CHANGELOG_DIST_ROOT
  fi
  cp -r ${CHANGELOG_ROOT} $CHANGELOG_DIST_ROOT || exitWithError
}

##
# Checks if required path exists and proceeds with changelog generation.
##
checkConfigPathAndProceed() {
  TITLE="checking module path and proceeding"
  printf "\n ${LIGHT_BLUE} >> %s\n
    ${DEFAULT} - module name: ${YELLOW}${1}${DEFAULT}\n
    ${DEFAULT} - module partial path: ${YELLOW}${2}${DEFAULT}\n" "$TITLE"

  MODULE_PATH="${PROJECT_ROOT}/${2}/"

  printf "
    ${DEFAULT} - module path: ${YELLOW}%s${DEFAULT}\n\n" "$MODULE_PATH"

  if [ ! -d "$MODULE_PATH" ]; then
    printf "\n ${RED} ERROR: module path %s not found${DEFAULT}\n\n" "$MODULE_PATH"
    exitWithError
  else
    ##
    # https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
    #
    # git log --pretty=format:"%h - %an, %ar : %s" --stat --no-merges --name-status --output=CHANGELOG.md
    #
    # --pretty=format options:
    #
    # %H  - Commit hash
    # %h  - Abbreviated commit hash
    # %T  - Tree hash
    # %t  - Abbreviated tree hash
    # %P  - Parent hashes
    # %p  - Abbreviated parent hashes
    # %an - Author name
    # %ae - Author email
    # %ad - Author date (format respects the --date=option)
    # %ar - Author date, relative
    # %cn - Committer name
    # %ce - Committer email
    # %cd - Committer date
    # %cr - Committer date, relative
    # %s  - Subject
    ##
    git log --pretty=format:"%h - %an, %ad : %s" --date=iso --stat --no-merges --name-status --output="$CHANGELOG_ROOT/$2-CHANGELOG.md" -- "$MODULE_PATH"
  fi
}

##
# Generates module changelog.
##
generateModuleChangelog() {
  printf "\n ${LIGHT_BLUE} GENERATING MODULE CHANGELOG\n
    ${DEFAULT} - module alias: ${YELLOW}%s${DEFAULT}\n" "$1"

  MODULE_ALIAS=$1

  MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"  # remove lib: prefix

  MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s${DEFAULT}\n
    ${DEFAULT} - module partial path name: ${YELLOW}%s${DEFAULT}\n
    \n\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH"

  if [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_NX_NG_STARTER" ]; then # "app:nx-ng-starter"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_APP_API" ]
  then # "app:api"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_API_INTERFACE" ]
  then # "lib:api-interface"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_SHARED_CORE" ]
  then # "lib:shared-core"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_MOCKS_CORE" ]
  then # "lib:mocks-core"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "$MODULE_ALIAS_LIB_PROTO" ]
  then # "lib:proto"
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "all" ]
  then
    MODULE_ALIAS=$MODULE_ALIAS_APP_NX_NG_STARTER # "app:nx-ng-starter"
    generateModuleChangelog "$MODULE_ALIAS"
    MODULE_ALIAS=$MODULE_ALIAS_APP_API # "app:api"
    generateModuleChangelog "$MODULE_ALIAS"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_API_INTERFACE # "app:api-interface"
    generateModuleChangelog "$MODULE_ALIAS"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_SHARED_CORE # "lib:shared-core"
    generateModuleChangelog "$MODULE_ALIAS"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_MOCKS_CORE # "lib:mocks-core"
    generateModuleChangelog "$MODULE_ALIAS"
    MODULE_ALIAS=$MODULE_ALIAS_LIB_PROTO # "lib:proto"
    generateModuleChangelog "$MODULE_ALIAS"
  else
    reportUsageErrorAndExit
  fi
}

##
# Changelog generation control flow.
##
if [ $# -lt 1 ]; then
  reportUsageErrorAndExit
else
  checkChangelogDirectoriesExistence
  generateModuleChangelog "$1"
  copyReportToDist
fi
