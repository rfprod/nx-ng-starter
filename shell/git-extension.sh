#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

##
# Project aliases (confirm the following list in specified shell file, and update hint here when applicable):
#
# Apps
# MODULE_ALIAS_APP_NX_NG_STARTER="app:nx-ng-starter"
# MODULE_ALIAS_APP_API="app:api"
#
# Apps E2E
# MODULE_ALIAS_APP_NX_NG_STARTER_E2E="app:nx-ng-starter-e2e"
#
# Libs
# MODULE_ALIAS_LIB_API_INTERFACE="lib:api-interface"
# MODULE_ALIAS_LIB_MOCKS_CORE="lib:mocks-core"
# MODULE_ALIAS_LIB_SHARED_CORE="lib:shared-core"
##
source shell/module-aliases.sh

##
# Git helpers.
##

CHANGED_ALIASES=

getChangedProjectAliases () {
  printf "
    ${LIGHT_BLUE} GET LIBRARY CHANGES${DEFAULT}\n"

  CHANGED_ALIASES=$(git status | grep -o "\(apps\|libs\)\/[a-z0-9-]*" | awk '!a[$0]++' | sed -E 's/s\//\:/g')

  ##
  # Prints app and lib aliases which contain changes.
  ##
  printf "\n
    ${LIGHT_BLUE} > changes in apps and libs${DEFAULT}\n"
  for CHANGED_ALIAS in $CHANGED_ALIASES; do printf "
    ${DEFAULT} - ${YELLOW}${CHANGED_ALIAS}${DEFAULT}\n"; done
}

# getChangedProjectAliases
