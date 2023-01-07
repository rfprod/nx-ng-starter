#!/bin/bash

source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Constants.
##
PROJECT_ROOT=.
CHANGELOG_ROOT=${PROJECT_ROOT}/changelog
CHANGELOG_APPS=${PROJECT_ROOT}/changelog/apps
CHANGELOG_LIBS=${PROJECT_ROOT}/changelog/libs

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/changelog.sh all" "generate all changelogs"
  printUsageTip "bash tools/shell/changelog.sh <APP_ALIAS_FROM_TSCONFIG>" "generate changelog for a specific application/library"

  reportSupportedModuleAliases

  printGap

  exit 1
}

##
# Checks changelog directories existence, and creates directories if it does not exist.
##
checkChangelogDirectoriesExistence() {
  if [ -d ${CHANGELOG_ROOT} ]; then
    printSuccessMessage "changelog directory $CHANGELOG_ROOT exists, proceeding"
    printGap
  else
    printInfoTitle "<< ERROR >>"
    printWarningMessage "changelog directory $CHANGELOG_ROOT does not exist"
    printInfoMessage "creating changelog directory $CHANGELOG_ROOT"
    printGap

    mkdir -p $CHANGELOG_ROOT
  fi

  if [ -d ${CHANGELOG_APPS} ]; then
    printSuccessMessage "changelog directory $CHANGELOG_APPS exists, proceeding"
    printGap
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "changelog directory $CHANGELOG_APPS does not exist"
    printSuccessMessage "creating changelog directory $CHANGELOG_APPS"
    printGap

    mkdir -p $CHANGELOG_APPS
  fi

  if [ -d ${CHANGELOG_LIBS} ]; then
    printSuccessMessage "changelog directory $CHANGELOG_APPS exists, proceeding"
    printGap
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "changelog directory $CHANGELOG_LIBS does not exist"
    printSuccessMessage "creating changelog directory $CHANGELOG_LIBS"
    printGap

    mkdir -p $CHANGELOG_LIBS
  fi
}

##
# Generates changelog index.html with relative links.
##
generateChangelogIndex() {
  printInfoTitle "<< GENERATING CHANGELOG INDEX >>"
  printNameAndValue "changelog dist root" "$1"
  printGap

  ##
  # Find all changelog files and save in array.
  ##
  CHANGELOG_FILE_PATHS=()
  while IFS= read -r -d $'\0'; do
    CHANGELOG_FILE_PATHS+=("${REPLY//"$1/changelog/"/}") # remove path part that goes before ./changelog
  done < <(find "$1/changelog" -name "*.html" -print0)

  # To debug found changelog files uncomment the following line.
  # for CHANGELOG_FILE_PATH in "${CHANGELOG_FILE_PATHS[@]}"; do echo "$CHANGELOG_FILE_PATH"; done

  ##
  # Rewrite index.html relative links to fond changelog html files.
  ##
  {
    echo '<html>'
    echo '<body>'
    echo '<h1>Nx-ng-starter changelog index</h1>'
    echo '<ul>'
    for CHANGELOG_FILE_PATH in "${CHANGELOG_FILE_PATHS[@]}"; do echo "<li><a href=\"$CHANGELOG_FILE_PATH\" target=_blank>$CHANGELOG_FILE_PATH</a></li>"; done
    echo '</ul>'
    echo '</body>'
    echo '</html>'
  } >"$1"/changelog/index.html
}

##
# Copies generated changelog to dist.
##
copyReportToDist() {
  printInfoTitle "<< COPY CHANGELOG TO DIST >>"
  printGap

  ##
  # Changelog root path.
  ##
  local CHANGELOG_DIST_ROOT=${PROJECT_ROOT}/dist/apps/documentation/assets

  # check documentation dist path existence
  if [ -d ${CHANGELOG_DIST_ROOT} ]; then
    printSuccessMessage "directory $CHANGELOG_DIST_ROOT exists, proceeding"
    printGap
  else
    printErrorTitle "<< ERROR >>"
    printWarningMessage "directory $CHANGELOG_DIST_ROOT does not exist"
    printInfoMessage "creating directory $CHANGELOG_DIST_ROOT"
    printGap

    mkdir -p $CHANGELOG_DIST_ROOT
  fi

  cp -r ${CHANGELOG_ROOT} $CHANGELOG_DIST_ROOT || exit 1

  generateChangelogIndex "$CHANGELOG_DIST_ROOT"
}

##
# Checks if required path exists and proceeds with changelog generation.
##
checkConfigPathAndProceed() {
  printInfoTitle "<< Checking module path and proceeding >>"
  printNameAndValue "module name" "$1"
  printNameAndValue "module partial path" "$2"

  local MODULE_PATH="${PROJECT_ROOT}/${2}/"

  printNameAndValue "module path" "$MODULE_PATH"
  printGap

  if [ ! -d "$MODULE_PATH" ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "module path $MODULE_PATH not found"
    printGap

    exit 1
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
    # git log --pretty=format:"%h - %an, %ad : %s" --date=iso --stat --no-merges --name-status --output="$CHANGELOG_ROOT/$2-CHANGELOG.html" -- "$MODULE_PATH"

    CHANGELOG_CONTENTS=$(git log --pretty=format:"%h - %an, %ad : %s" --date=iso --stat --no-merges --name-status -- "$MODULE_PATH")
    {
      echo '<html>'
      echo '<body>'
      echo "<h1>CHANGELOG: ${2}</h1>"
      echo '<pre>'
      echo "$CHANGELOG_CONTENTS"
      echo '</pre>'
      echo '</body>'
      echo '</html>'
    } >${CHANGELOG_ROOT}/"${2}"-CHANGELOG.html
  fi
}

##
# Generates module changelog.
##
generateModuleChangelog() {
  printInfoTitle "<< GENERATING MODULE CHANGELOG >>"
  printNameAndValue "module alias" "$1"

  local MODULE_ALIAS=$1

  local MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"        # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/client for subsequent path formation

  printNameAndValue "module name" "$MODULE_NAME"
  printNameAndValue "module partial path name" "$MODULE_PARTIAL_PATH"
  printGap

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    checkConfigPathAndProceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "all" ]
  then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES[@]}"; do generateModuleChangelog "$MODULE_ALIAS_VAR"; done
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
  # Remove previously generated changelogs.
  rm -rf ./changelog/*
  checkChangelogDirectoriesExistence
  generateModuleChangelog "$1"
  copyReportToDist
fi
