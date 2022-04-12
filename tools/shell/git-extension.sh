#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

##
# Changed aliases.
##
CHANGED_ALIASES=()

##
# Reports usage error and exits.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/git-extension.sh ?" "print help"
  printUsageTip "bash tools/shell/git-extension.sh detect-yarn-lock-change" "detects if yarn lock was changed"
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

YARN_LOCK_CHANGED=0

checkYarnLockChanges() {
  printInfoTitle "<< Detecting yarn.lock changes between two latest commits >>"
  printGap

  local CHANGED
  CHANGED="$(git diff --name-only HEAD HEAD~1 | grep "yarn.lock")"

  if [ "$CHANGED" = "yarn.lock" ]; then
    YARN_LOCK_CHANGED=1
  fi

  printNameAndValue "yarn.lock changed (0 - unchanged, 1 - changed)" "$YARN_LOCK_CHANGED"
  printGap
}

if [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "print" ]; then
  getChangedProjectAliases
  printChangedAliases
elif [ "$1" = "detect-yarn-lock-change" ]; then
  checkYarnLockChanges
else
  getChangedProjectAliases
fi
