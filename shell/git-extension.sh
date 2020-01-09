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
# Changed aliases.
##
CHANGED_ALIASES=

##
# Stores changed aliases in a respective variable.
##
getChangedProjectAliases() {
  TITLE="GET LIBRARY CHANGES"
  printf "
    ${LIGHT_BLUE} %s${DEFAULT}\n" "$TITLE"

  CHANGED_ALIASES=$(git status | grep -o "\(apps\|libs\)\/[a-z0-9-]*" | awk '!a[$0]++' | sed -E 's/s\//\:/g')

  ##
  # Prints app and lib aliases which contain changes.
  ##
  TITLE="changes in apps and libs"
  printf "\n
    ${LIGHT_BLUE} > %s${DEFAULT}\n" "$TITLE"
  for CHANGED_ALIAS in $CHANGED_ALIASES; do printf "
    ${DEFAULT} - ${YELLOW}${CHANGED_ALIAS}${DEFAULT}\n"; done
}

# getChangedProjectAliases
