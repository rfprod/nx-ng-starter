#!/bin/bash

source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

##
# Changed aliases.
##
CHANGED_ALIASES=()

##
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/git-extension.sh ?" "print help"
  print_usage_tip "bash tools/shell/git-extension.sh detect-yarn-lock-change" "detects if yarn lock was changed"
  print_usage_tip "bash tools/shell/git-extension.sh print" "get and print changed apps/libs aliases"
  print_usage_tip "bash tools/shell/git-extension.sh" "get changed apps/libs aliases"
  print_gap
}

##
# Stores changed aliases in a respective variable.
##
get_changed_project_aliases() {
  print_info_title "<< GET LIBRARY CHANGES >>"
  print_gap

  local FOUND_CHANGED_ALIASES
  FOUND_CHANGED_ALIASES=$(git status | grep -o "\(apps\|libs\)\/[a-z0-9-]*" | awk '!a[$0]++' | sed -E 's/s\//\:/g')

  for FOUND_CHANGED_ALIAS in $FOUND_CHANGED_ALIASES; do
    local ALIAS_EXISTS=
    module_alias_exists "$FOUND_CHANGED_ALIAS" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

    if [ "$ALIAS_EXISTS" = 1 ]; then
      CHANGED_ALIASES+=("$FOUND_CHANGED_ALIAS")
    fi
  done
}

print_changed_aliases() {
  ##
  # Prints app and lib aliases which contain changes.
  ##
  # shellcheck disable=SC2128
  if [ -n "$CHANGED_ALIASES" ]; then
    local CHANGED_ALIAS
    for CHANGED_ALIAS in "${CHANGED_ALIASES[@]}"; do
      print_value "$CHANGED_ALIAS"
    done
  else
    print_info_title "<< NO CHANGES >>"
    print_gap
  fi
}

YARN_LOCK_CHANGED=0

check_yarn_lock_changes() {
  print_info_title "<< Detecting yarn.lock changes between two latest commits >>"
  print_gap

  local CHANGED
  CHANGED="$(git diff --name-only HEAD HEAD~1 | grep "yarn.lock")"

  if [ "$CHANGED" = "yarn.lock" ]; then
    YARN_LOCK_CHANGED=1
  fi

  print_name_and_value "yarn.lock changed (0 - unchanged, 1 - changed)" "$YARN_LOCK_CHANGED"
  print_gap
}

if [ "$1" = "?" ]; then
  print_help
elif [ "$1" = "print" ]; then
  get_changed_project_aliases
  print_changed_aliases
elif [ "$1" = "detect-yarn-lock-change" ]; then
  check_yarn_lock_changes
else
  get_changed_project_aliases
fi
