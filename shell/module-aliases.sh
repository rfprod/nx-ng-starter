#!/bin/bash

##
# Module aliases.
# Should be updated here when app or lib are added to the project.
##

# shellcheck disable=SC2034

# Apps
MODULE_ALIAS_APP_NX_NG_STARTER="app:nx-ng-starter"
MODULE_ALIAS_APP_API="app:api"
# Apps E2E
MODULE_ALIAS_APP_NX_NG_STARTER_E2E="app:nx-ng-starter-e2e"
# Libs
MODULE_ALIAS_LIB_API_INTERFACE="lib:api-interface"
MODULE_ALIAS_LIB_MOCKS_CORE="lib:mocks-core"
MODULE_ALIAS_LIB_SHARED_CORE="lib:shared-core"
MODULE_ALIAS_LIB_PROTO="lib:proto"

MODULE_ALIAS_VARS=(
  MODULE_ALIAS_APP_NX_NG_STARTER
  MODULE_ALIAS_APP_API
  MODULE_ALIAS_APP_NX_NG_STARTER_E2E
  MODULE_ALIAS_LIB_API_INTERFACE
  MODULE_ALIAS_LIB_MOCKS_CORE
  MODULE_ALIAS_LIB_SHARED_CORE
  MODULE_ALIAS_LIB_PROTO
)

##
# Colors.
##
source shell/colors.sh ''

reportSupportedModuleAliases() {
  TITLE="<< MODULE ALIASES >>"
  printf "
    ${LIGHT_BLUE} %s ${DEFAULT}\n" "$TITLE"

  ##
  # Prints registered module aliases.
  ##
  for MODULE_ALIAS_VAR in "${MODULE_ALIAS_VARS[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${!MODULE_ALIAS_VAR}${DEFAULT}" "$MODULE_ALIAS_VAR"; done

  INFO="Use this aliases in other module related scripts like shell/lint.sh, shell/test.sh etc."
  printf "\n\n${DEFAULT} %s\n\n" "$INFO"
}

##
# Supported module (apps and libs) aliases.
##
if [ "$1" = "?" ]; then
  reportSupportedModuleAliases
fi
