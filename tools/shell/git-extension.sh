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
# Changed aliases.
##
CHANGED_ALIASES=()

##
# Reports usage error and exits.
##
reportUsage() {
  printInfoTitle "<< USAGE >>"
  printUsageTip "bash tools/shell/git-extension.sh ?" "print usage"
  printUsageTip "bash tools/shell/git-extension.sh print" "get and print changed apps/libs aliases"
  printUsageTip "bash tools/shell/git-extension.sh" "get changed apps/libs aliases"
  printGap

  exit 1
}

##
# Stores changed aliases in a respective variable.
##
getChangedProjectAliases() {
  printInfoTitle "<< GET LIBRARY CHANGES >>"
  printGap

  local FOUND_CHANGED_ALIASES
  FOUND_CHANGED_ALIASES=$(git status | grep -o "\(apps\|libs\)\/[a-z0-9-]*" | awk '!a[$0]++' | sed -E 's/s\//\:/g')

  for FOUND_CHANGED_ALIAS in $FOUND_CHANGED_ALIASES; do
    local ALIAS_EXISTS=
    moduleAliasExists "$FOUND_CHANGED_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

    if [ "$ALIAS_EXISTS" = 1 ]; then
      CHANGED_ALIASES+=("$FOUND_CHANGED_ALIAS")
    fi
  done
}

printChangedAliases() {
  ##
  # Prints app and lib aliases which contain changes.
  ##
  # shellcheck disable=SC2128
  if [ -n "$CHANGED_ALIASES" ]; then
    local CHANGED_ALIAS
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT}\n" "$CHANGED_ALIAS"; done
  else
    printInfoTitle "<< NO CHANGES >>"
    printGap
  fi
}

if [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "print" ]; then
  getChangedProjectAliases
  printChangedAliases
else
  getChangedProjectAliases
fi
