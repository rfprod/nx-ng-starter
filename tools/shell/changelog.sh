#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh
##
# Project aliases.
##
source tools/shell/module-aliases.sh

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
  local TITLE="<< ERROR >>"
  if [ -d ${CHANGELOG_ROOT} ]; then
    printf "
      ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_ROOT"
  else
    printf "
      ${RED}%s\n
      ${LIGHT_RED} changelog directory %s does not exist
      ${LIGHT_GREEN} creating changelog directory %s.
      ${DEFAULT}\n\n" "$TITLE" "$CHANGELOG_ROOT" "$CHANGELOG_ROOT"
    mkdir -p $CHANGELOG_ROOT
  fi

  if [ -d ${CHANGELOG_APPS} ]; then
    printf "
      ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_APPS"
  else
    printf "
      ${RED} %s\n
      ${LIGHT_RED} changelog directory %s does not exist
      ${LIGHT_GREEN} creating changelog directory %s.
      ${DEFAULT}\n\n" "$TITLE" "$CHANGELOG_APPS" "$CHANGELOG_APPS"
    mkdir -p $CHANGELOG_APPS
  fi

  if [ -d ${CHANGELOG_LIBS} ]; then
    printf "
      ${LIGHT_GREEN} changelog directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_LIBS"
  else
    printf "
      ${RED} %s\n
      ${LIGHT_RED} changelog directory %s does not exist
      ${LIGHT_GREEN} creating changelog directory %s.
      ${DEFAULT}\n\n" "$CHANGELOG_LIBS" "$CHANGELOG_LIBS"
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
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/changelog.sh all
    ${DEFAULT} - ${YELLOW} bash tools/shell/changelog.sh ${LIGHT_GREEN}<APP_ALIAS_FROM_TSCONFIG>\n" "$TITLE"

  reportSupportedModuleAliases

  printf "\n\n"

  exitWithError
}

##
# Copies generated changelog to dist.
##
copyReportToDist() {
  local TITLE="<< COPY CHANGELOG TO DIST >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"

  ##
  # Changelog root path.
  ##
  local CHANGELOG_DIST_ROOT=${PROJECT_ROOT}/dist/apps/nx-ng-starter

  # check documentation dist path existence
  if [ -d ${CHANGELOG_DIST_ROOT} ]; then
    printf "
      ${LIGHT_GREEN} directory %s exists, proceeding${DEFAULT}\n\n" "$CHANGELOG_DIST_ROOT"
  else
    TITLE="<< ERROR >>"
    printf "
      ${RED}%s\n
      ${LIGHT_RED} directory %s does not exist
      ${LIGHT_GREEN} creating directory %s.
      ${DEFAULT}\n\n" "$TITLE" "$CHANGELOG_DIST_ROOT" "$CHANGELOG_DIST_ROOT"
    mkdir -p $CHANGELOG_DIST_ROOT
  fi
  cp -r ${CHANGELOG_ROOT} $CHANGELOG_DIST_ROOT || exitWithError
}

##
# Checks if required path exists and proceeds with changelog generation.
##
checkConfigPathAndProceed() {
  local TITLE="<< Checking module path and proceeding >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module name: ${YELLOW}%s${DEFAULT}
    ${DEFAULT} - module partial path: ${YELLOW}%s${DEFAULT}\n" "$TITLE" "$1" "$2"

  local MODULE_PATH="${PROJECT_ROOT}/${2}/"

  printf "
    ${DEFAULT} - module path: ${YELLOW}%s
    ${DEFAULT}\n\n" "$MODULE_PATH"

  if [ ! -d "$MODULE_PATH" ]; then
    TITLE="<< ERROR >>"
    printf "
      ${RED}%s\n
      ${LIGHT_RED} module path %s not found
      ${DEFAULT}\n\n" "$TITLE" "$MODULE_PATH"
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
  local TITLE="<< GENERATING MODULE CHANGELOG >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - module alias: ${YELLOW}%s
    ${DEFAULT}\n" "$TITLE" "$1"

  local MODULE_ALIAS=$1

  local MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"        # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/nx-ng-starter for subsequent path formation

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module partial path name: ${YELLOW}%s
    ${DEFAULT}\n\n" "$MODULE_NAME" "$MODULE_PARTIAL_PATH"

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "all" ]
  then
    for MODULE_ALIAS_VAR in "${MODULE_ALIAS_VARS[@]}"; do generateModuleChangelog "$MODULE_ALIAS_VAR"; done
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
