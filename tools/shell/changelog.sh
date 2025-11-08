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
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/changelog.sh ?" "print help"
  print_usage_tip "bash tools/shell/changelog.sh all" "generate all changelogs"
  print_usage_tip "bash tools/shell/changelog.sh <APP_ALIAS_FROM_TSCONFIG>" "generate changelog for a specific application/library"
  reportSupportedModuleAliases
  print_gap
}

##
# Checks changelog directories existence, and creates directories if it does not exist.
##
check_changelog_directories_existence() {
  if [ -d ${CHANGELOG_ROOT} ]; then
    print_success_message "changelog directory $CHANGELOG_ROOT exists, proceeding"
    print_gap
  else
    print_info_title "<< ERROR >>"
    print_warning_message "changelog directory $CHANGELOG_ROOT does not exist"
    print_info_message "creating changelog directory $CHANGELOG_ROOT"
    print_gap

    mkdir -p $CHANGELOG_ROOT
  fi

  if [ -d ${CHANGELOG_APPS} ]; then
    print_success_message "changelog directory $CHANGELOG_APPS exists, proceeding"
    print_gap
  else
    print_error_title "<< ERROR >>"
    print_warning_message "changelog directory $CHANGELOG_APPS does not exist"
    print_success_message "creating changelog directory $CHANGELOG_APPS"
    print_gap

    mkdir -p $CHANGELOG_APPS
  fi

  if [ -d ${CHANGELOG_LIBS} ]; then
    print_success_message "changelog directory $CHANGELOG_APPS exists, proceeding"
    print_gap
  else
    print_error_title "<< ERROR >>"
    print_warning_message "changelog directory $CHANGELOG_LIBS does not exist"
    print_success_message "creating changelog directory $CHANGELOG_LIBS"
    print_gap

    mkdir -p $CHANGELOG_LIBS
  fi
}

##
# Generates changelog index.html with relative links.
##
generate_changelog_index() {
  print_info_title "<< GENERATING CHANGELOG INDEX >>"
  print_name_and_value "changelog dist root" "$1"
  print_gap

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
copy_report_to_dist() {
  print_info_title "<< COPY CHANGELOG TO DIST >>"
  print_gap

  ##
  # Changelog root path.
  ##
  local CHANGELOG_DIST_ROOT=${PROJECT_ROOT}/dist/apps/documentation/browser/assets

  # check documentation dist path existence
  if [ -d ${CHANGELOG_DIST_ROOT} ]; then
    print_success_message "directory $CHANGELOG_DIST_ROOT exists, proceeding"
    print_gap
  else
    print_error_title "<< ERROR >>"
    print_warning_message "directory $CHANGELOG_DIST_ROOT does not exist"
    print_info_message "creating directory $CHANGELOG_DIST_ROOT"
    print_gap

    mkdir -p $CHANGELOG_DIST_ROOT
  fi

  cp -r ${CHANGELOG_ROOT} $CHANGELOG_DIST_ROOT || exit 1

  generate_changelog_index "$CHANGELOG_DIST_ROOT"
}

##
# Checks if required path exists and proceeds with changelog generation.
##
check_config_path_and_proceed() {
  print_info_title "<< Checking module path and proceeding >>"
  print_name_and_value "module name" "$1"
  print_name_and_value "module partial path" "$2"

  local MODULE_PATH="${PROJECT_ROOT}/${2}/"

  print_name_and_value "module path" "$MODULE_PATH"
  print_gap

  if [ ! -d "$MODULE_PATH" ]; then
    print_error_title "<< ERROR >>"
    print_warning_message "module path $MODULE_PATH not found"
    print_gap

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
generate_module_changelog() {
  print_info_title "<< GENERATING MODULE CHANGELOG >>"
  print_name_and_value "module alias" "$1"

  local MODULE_ALIAS=$1

  local MODULE_NAME="${MODULE_ALIAS//app\:/}" # remove app: prefix
  MODULE_NAME="${MODULE_NAME//lib\:/}"        # remove lib: prefix

  local MODULE_PARTIAL_PATH="${MODULE_ALIAS//\:/s/}" # partial module path, e.g. apps/client for subsequent path formation

  print_name_and_value "module name" "$MODULE_NAME"
  print_name_and_value "module partial path name" "$MODULE_PARTIAL_PATH"
  print_gap

  local ALIAS_EXISTS=
  moduleAliasExists "$MODULE_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    check_config_path_and_proceed "$MODULE_NAME" "$MODULE_PARTIAL_PATH"
  elif
    [ "$MODULE_ALIAS" = "all" ]
  then
    for MODULE_ALIAS_VAR in "${EXISTING_MODULE_ALIASES[@]}"; do generate_module_changelog "$MODULE_ALIAS_VAR"; done
  else
    print_help
    exit 1
  fi
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  print_help
elif [ $# -eq 1 ]; then
  rm -rf ./changelog/*
  check_changelog_directories_existence
  generate_module_changelog "$1"
  copy_report_to_dist
else
  print_help
  exit 1
fi
