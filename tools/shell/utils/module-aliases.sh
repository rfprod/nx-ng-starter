#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/print-utils.sh ''

declare -A EXISTING_MODULE_ALIASES
declare -A EXISTING_MODULE_ALIASES_E2E
declare -A EXISTING_MODULE_ALIASES_UNIT

findSupportedModuleAliases() {

  readarray -d '' FOUND_LIB_ALIASES < <(find libs/ -mindepth 1 -maxdepth 1 -type d '!' -exec test -e "{}/lib/" ';' -print0)

  for LIB_ALIAS in "${FOUND_LIB_ALIASES[@]}"; do
    local LIB_ALIAS_NAME
    LIB_ALIAS_NAME=$(echo "$LIB_ALIAS" | sed -E 's/(s\/\/)|(s\/)/\:/g') # (s\/\/) expression in sed command addresses osx (and probably windows) file system peculiarity
    EXISTING_MODULE_ALIASES["$LIB_ALIAS_NAME"]="$LIB_ALIAS_NAME"
    EXISTING_MODULE_ALIASES_UNIT["$LIB_ALIAS_NAME"]="$LIB_ALIAS_NAME"
  done

  readarray -d '' FOUND_APP_ALIASES < <(find apps/ -mindepth 1 -maxdepth 1 -type d '!' -exec test -e "{}/app/" ';' -print0)

  for APP_ALIAS in "${FOUND_APP_ALIASES[@]}"; do
    local APP_ALIAS_NAME
    APP_ALIAS_NAME=$(echo "$APP_ALIAS" | sed -E 's/(s\/\/)|(s\/)/\:/g') # (s\/\/) expression in sed command addresses osx (and probably windows) file system peculiarity
    EXISTING_MODULE_ALIASES["$APP_ALIAS_NAME"]="$APP_ALIAS_NAME"
  done

  readarray -d '' FOUND_E2E_ALIASES < <(find apps/ -mindepth 1 -maxdepth 1 -type d '!' -exec test -e "{}/src/app/" ';' -print0)

  for E2E_ALIAS in "${FOUND_E2E_ALIASES[@]}"; do
    local E2E_ALIAS_NAME
    E2E_ALIAS_NAME=$(echo "$E2E_ALIAS" | sed -E 's/(s\/\/)|(s\/)/\:/g') # (s\/\/) expression in sed command addresses osx (and probably windows) file system peculiarity
    EXISTING_MODULE_ALIASES_E2E["$E2E_ALIAS_NAME"]="$E2E_ALIAS_NAME"
  done

  readarray -d '' FOUND_UNIT_ALIASES < <(find apps/ -mindepth 1 -maxdepth 1 -type d '!' -exec test -e "{}/src/fixtures/" ';' -print0)

  for UNIT_ALIAS in "${FOUND_UNIT_ALIASES[@]}"; do
    local UNIT_ALIAS_NAME
    UNIT_ALIAS_NAME=$(echo "$UNIT_ALIAS" | sed -E 's/(s\/\/)|(s\/)/\:/g') # (s\/\/) expression in sed command addresses osx (and probably windows) file system peculiarity
    EXISTING_MODULE_ALIASES_UNIT["$UNIT_ALIAS_NAME"]="$UNIT_ALIAS_NAME"
  done
}

findSupportedModuleAliases

reportSupportedModuleAliases() {
  printInfoTitle "<< MODULE ALIASES >>"
  printGap

  local KEY
  for KEY in "${!EXISTING_MODULE_ALIASES[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${EXISTING_MODULE_ALIASES[$KEY]}${DEFAULT}" "${KEY}"; done

  printGap
  printInfoMessage "Use this aliases in other module related scripts like tools/shell/changelog.sh, tools/shell/document.sh etc."
  printGap
}

reportSupportedModuleAliasesUnit() {
  printInfoTitle "<< MODULE ALIASES (unit) >>"
  printGap

  local KEY
  for KEY in "${!EXISTING_MODULE_ALIASES_UNIT[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${EXISTING_MODULE_ALIASES_UNIT[$KEY]}${DEFAULT}" "${KEY}"; done

  printGap
  printInfoMessage "Use this aliases in tools/shell/test.sh."
  printGap
}

reportSupportedModuleAliasesE2E() {
  printInfoTitle "<< MODULE ALIASES (e2e) >>"
  printGap

  local KEY
  for KEY in "${!EXISTING_MODULE_ALIASES_E2E[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${EXISTING_MODULE_ALIASES_E2E[$KEY]}${DEFAULT}" "${KEY}"; done

  printGap
  printInfoMessage "Use this aliases in tools/shell/e2e.sh."
  printGap
}

##
# Returns if module alias exists.
#
# examples:
# moduleAliasExists "somealias" && echo yes || echo no                       # no
# moduleAliasExists "${MODULE_ALIAS_LIB_SHARED_UTIL}" && echo yes || echo no # yes
##
moduleAliasExists() {
  local SEARCH_VALUE=$1
  local RESULT=1
  local ALIAS
  for ALIAS in "${EXISTING_MODULE_ALIASES[@]}"; do
    if [ "${ALIAS}" = "$SEARCH_VALUE" ]; then
      RESULT=0
      break
    fi
  done
  return $RESULT
}

##
# Supported module (apps and libs) aliases.
##
if [ "$1" = "?" ]; then
  reportSupportedModuleAliases
  reportSupportedModuleAliasesUnit
  reportSupportedModuleAliasesE2E
fi
