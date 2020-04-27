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
# Changed aliases.
##
CHANGED_ALIASES=()

##
# Stores changed aliases in a respective variable.
##
getChangedProjectAliases() {
  local TITLE="<< GET LIBRARY CHANGES >>"
  printf "
    ${LIGHT_BLUE}%s${DEFAULT}\n" "$TITLE"

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
  if [ ! -z "$CHANGED_ALIASES" ]; then
    local CHANGED_ALIAS
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT}\n" "$CHANGED_ALIAS"; done
  else
    TITLE="<< NO CHANGES >>"
    printf "
      ${LIGHT_BLUE}%s${DEFAULT}\n" "$TITLE"
  fi
}

# getChangedProjectAliases

if [ "$1" = "print" ]; then
  getChangedProjectAliases
  printChangedAliases
else
  getChangedProjectAliases
fi
