#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Module aliases.
# Should be updated here when app or lib are added to the project.
##

# Apps
MODULE_ALIAS_APP_CLIENT="app:client"
MODULE_ALIAS_APP_API="app:api"
# Apps E2E
MODULE_ALIAS_APP_CLIENT_E2E="app:client-e2e"
MODULE_ALIAS_APP_CLIENT_COMPONENTS_E2E="app:client-components-e2e"
# Libs
MODULE_ALIAS_LIB_API_INTERFACE="lib:api-interface"
MODULE_ALIAS_LIB_MOCKS_CORE="lib:mocks-core"
MODULE_ALIAS_LIB_CLIENT_CORE="lib:client-core"
MODULE_ALIAS_LIB_CLIENT_STORE="lib:client-store"
MODULE_ALIAS_LIB_CLIENT_UTIL="lib:client-util"
MODULE_ALIAS_LIB_CLIENT_MATERIAL="lib:client-material"
MODULE_ALIAS_LIB_CLIENT_TRANSLATE="lib:client-translate"
MODULE_ALIAS_LIB_CLIENT_SERVICES="lib:client-services"
MODULE_ALIAS_LIB_CLIENT_COMPONENTS="lib:client-components"
MODULE_ALIAS_LIB_CLIENT_GQL="lib:client-gql"
MODULE_ALIAS_LIB_PROTO="lib:proto"

MODULE_ALIAS_NAMES=(
  MODULE_ALIAS_APP_CLIENT
  MODULE_ALIAS_APP_API
  MODULE_ALIAS_APP_CLIENT_E2E
  MODULE_ALIAS_APP_CLIENT_COMPONENTS_E2E
  MODULE_ALIAS_LIB_API_INTERFACE
  MODULE_ALIAS_LIB_MOCKS_CORE
  MODULE_ALIAS_LIB_CLIENT_CORE
  MODULE_ALIAS_LIB_CLIENT_STORE
  MODULE_ALIAS_LIB_CLIENT_UTIL
  MODULE_ALIAS_LIB_CLIENT_MATERIAL
  MODULE_ALIAS_LIB_CLIENT_TRANSLATE
  MODULE_ALIAS_LIB_CLIENT_SERVICES
  MODULE_ALIAS_LIB_CLIENT_COMPONENTS
  MODULE_ALIAS_LIB_CLIENT_GQL
  MODULE_ALIAS_LIB_PROTO
)

MODULE_ALIAS_VARS=(
  "$MODULE_ALIAS_APP_CLIENT"
  "$MODULE_ALIAS_APP_API"
  "$MODULE_ALIAS_APP_CLIENT_E2E"
  "$MODULE_ALIAS_APP_CLIENT_COMPONENTS_E2E"
  "$MODULE_ALIAS_LIB_API_INTERFACE"
  "$MODULE_ALIAS_LIB_MOCKS_CORE"
  "$MODULE_ALIAS_LIB_CLIENT_CORE"
  "$MODULE_ALIAS_LIB_CLIENT_STORE"
  "$MODULE_ALIAS_LIB_CLIENT_UTIL"
  "$MODULE_ALIAS_LIB_CLIENT_MATERIAL"
  "$MODULE_ALIAS_LIB_CLIENT_TRANSLATE"
  "$MODULE_ALIAS_LIB_CLIENT_SERVICES"
  "$MODULE_ALIAS_LIB_CLIENT_COMPONENTS"
  "$MODULE_ALIAS_LIB_CLIENT_GQL"
  "$MODULE_ALIAS_LIB_PROTO"
)

MODULE_ALIAS_NAMES_UNIT=(
  MODULE_ALIAS_APP_CLIENT
  MODULE_ALIAS_APP_API
  MODULE_ALIAS_LIB_API_INTERFACE
  MODULE_ALIAS_LIB_MOCKS_CORE
  MODULE_ALIAS_LIB_CLIENT_CORE
  MODULE_ALIAS_LIB_CLIENT_STORE
  MODULE_ALIAS_LIB_CLIENT_UTIL
  MODULE_ALIAS_LIB_CLIENT_MATERIAL
  MODULE_ALIAS_LIB_CLIENT_TRANSLATE
  MODULE_ALIAS_LIB_CLIENT_SERVICES
  MODULE_ALIAS_LIB_CLIENT_COMPONENTS
  MODULE_ALIAS_LIB_CLIENT_GQL
  MODULE_ALIAS_LIB_PROTO
)

MODULE_ALIAS_VARS_UNIT=(
  "$MODULE_ALIAS_APP_CLIENT"
  "$MODULE_ALIAS_APP_API"
  "$MODULE_ALIAS_LIB_API_INTERFACE"
  "$MODULE_ALIAS_LIB_MOCKS_CORE"
  "$MODULE_ALIAS_LIB_CLIENT_CORE"
  "$MODULE_ALIAS_LIB_CLIENT_STORE"
  "$MODULE_ALIAS_LIB_CLIENT_UTIL"
  "$MODULE_ALIAS_LIB_CLIENT_MATERIAL"
  "$MODULE_ALIAS_LIB_CLIENT_TRANSLATE"
  "$MODULE_ALIAS_LIB_CLIENT_SERVICES"
  "$MODULE_ALIAS_LIB_CLIENT_COMPONENTS"
  "$MODULE_ALIAS_LIB_CLIENT_GQL"
  "$MODULE_ALIAS_LIB_PROTO"
)

MODULE_ALIAS_NAMES_E2E=(
  MODULE_ALIAS_APP_CLIENT_E2E
  MODULE_ALIAS_APP_CLIENT_COMPONENTS_E2E
)

MODULE_ALIAS_VARS_E2E=(
  "$MODULE_ALIAS_APP_CLIENT_E2E"
  "$MODULE_ALIAS_APP_CLIENT_COMPONENTS_E2E"
)

reportSupportedModuleAliases() {
  local TITLE="<< MODULE ALIASES (all) >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n" "$TITLE"

  local MODULE_ALIAS_NAME
  ##
  # Prints registered module aliases.
  ##
  for MODULE_ALIAS_NAME in "${MODULE_ALIAS_NAMES[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${!MODULE_ALIAS_NAME}${DEFAULT}" "$MODULE_ALIAS_NAME"; done

  local INFO="Use this aliases in other module related scripts like tools/shell/lint.sh, tools/shell/test.sh etc."
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$INFO"
}

reportSupportedModuleAliasesUnit() {
  local TITLE="<< MODULE ALIASES (unit) >>"
  printf "
    ${LIGHT_BLUE}%s ${DEFAULT}\n" "$TITLE"

  local MODULE_ALIAS_NAME
  ##
  # Prints registered module aliases.
  ##
  for MODULE_ALIAS_NAME in "${MODULE_ALIAS_NAMES_UNIT[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${!MODULE_ALIAS_NAME}${DEFAULT}" "$MODULE_ALIAS_NAME"; done

  local INFO="Use this aliases in other module related scripts like tools/shell/lint.sh, tools/shell/test.sh etc."
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$INFO"
}

reportSupportedModuleAliasesE2E() {
  local TITLE="<< MODULE ALIASES (e2e) >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n" "$TITLE"

  local MODULE_ALIAS_NAME
  ##
  # Prints supported module aliases.
  ##
  for MODULE_ALIAS_NAME in "${MODULE_ALIAS_NAMES_E2E[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${!MODULE_ALIAS_NAME}${DEFAULT}" "$MODULE_ALIAS_NAME"; done

  local INFO="Use this aliases in other module related scripts like tools/shell/lint.sh, tools/shell/test.sh etc."
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$INFO"
}

##
# Supported module (apps and libs) aliases.
##
if [ "$1" = "?" ]; then
  reportSupportedModuleAliases
fi

##
# Returns if module alias exists.
#
# examples:
# moduleAliasExists "somealias" && echo yes || echo no                         # no
# moduleAliasExists "${MODULE_ALIAS_APP_CLIENT}" && echo yes || echo no # yes
##
moduleAliasExists() {
  local SEARCH_VALUE=$1
  local RESULT=1
  local ALIAS
  for ALIAS in "${MODULE_ALIAS_VARS[@]}"; do
    if [ "${ALIAS}" = "$SEARCH_VALUE" ]; then
      RESULT=0
      break
    fi
  done
  return $RESULT
}

##
# Returns if module alias exists.
#
# examples:
# moduleAliasUnitExists "somealias" && echo yes || echo no                         # no
# moduleAliasUnitExists "${MODULE_ALIAS_APP_CLIENT_E2E}" && echo yes || echo no # yes
##
moduleAliasUnitExists() {
  local SEARCH_VALUE=$1
  local RESULT=1
  local ALIAS
  for ALIAS in "${MODULE_ALIAS_VARS_UNIT[@]}"; do
    if [ "$ALIAS" = "$SEARCH_VALUE" ]; then
      RESULT=0
      break
    fi
  done
  return $RESULT
}

##
# Returns if module alias exists.
#
# examples:
# moduleAliasE2EExists "somealias" && echo yes || echo no                         # no
# moduleAliasE2EExists "${MODULE_ALIAS_APP_CLIENT_E2E}" && echo yes || echo no # yes
##
moduleAliasE2EExists() {
  local SEARCH_VALUE=$1
  local RESULT=1
  local ALIAS
  for ALIAS in "${MODULE_ALIAS_VARS_E2E[@]}"; do
    if [ "$ALIAS" = "$SEARCH_VALUE" ]; then
      RESULT=0
      break
    fi
  done
  return $RESULT
}
