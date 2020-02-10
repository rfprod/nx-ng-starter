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
# Changed aliases.
##
CHANGED_ALIASES=

##
# Stores changed aliases in a respective variable.
##
getChangedProjectAliases() {
  local TITLE="<< GET LIBRARY CHANGES >>"
  printf "
    ${LIGHT_BLUE}%s${DEFAULT}\n" "$TITLE"

  CHANGED_ALIASES=$(git status | grep -o "\(apps\|libs\)\/[a-z0-9-]*" | awk '!a[$0]++' | sed -E 's/s\//\:/g')
}

printChangedAliases() {
  ##
  # Prints app and lib aliases which contain changes.
  ##
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
