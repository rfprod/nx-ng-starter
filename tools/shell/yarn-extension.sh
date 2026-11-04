#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/git-extension.sh ''

##
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "tools/shell/yarn-extension.sh ?" "print help"
  print_usage_tip "tools/shell/yarn-extension.sh integrity-check" "performs an integrity check, and cleans up workspace if the is no integrity."
  print_gap
}

##
# Checks Yarn version.
# Yarn v1 is required to use the feature that checks the packages integrity.
##
check_yarn_version() {
  print_info_title "<< Checking yarn version >>"
  print_gap

  local FULL_VERSION
  FULL_VERSION=$(yarn --version)
  local MAJOR_VERSION
  MAJOR_VERSION=$(yarn --version | grep -E -o "^[0-9].")

  if [ "$MAJOR_VERSION" != "4." ]; then
    print_info_title "<< Yarn version mismatch >>"
    print_gap

    print_info_message "Expected yarn version: 4.x.x"
    print_info_message "Installed yarn version: $FULL_VERSION"
    print_gap
    exit 1
  else
    print_info_title "<< Yarn version match >>"
    print_gap

    print_info_message "Expected yarn version: 4.x.x"
    print_info_message "Installed yarn version: $FULL_VERSION"
    print_gap
  fi
}

##
# Checks package integrity, and cleans up workspace and caches if there is no integrity.
# No integrity mean that installed node_modules do not correspond versions defined in the package.json.
# This utility is intended to be used by the CI mainly.
##
check_integrity() {
  print_info_title "<< Checking package integrity >>"
  print_gap

  check_yarn_version
  check_yarn_lock_changes

  if [ "$YARN_LOCK_CHANGED" -eq 1 ]; then
    print_info_title "<< Lock file mismatch, clearing cache >>"
    print_gap

    yarn workspace:cleanup
    rm -rf ./node_modules
    yarn cache clean
    return 0
  fi

  # Just verify cache is valid, don't install
  if ! yarn install --check-cache; then
    print_info_title "<< Cache corrupted, clearing >>"
    print_gap

    yarn workspace:cleanup
    rm -rf ./node_modules
    yarn cache clean
  else
    print_success_title "<< Package integrity verified >>"
  fi
}


if [ "$1" = "?" ]; then
  print_help
elif [ "$1" = "integrity-check" ]; then
  check_integrity
else
  print_help
  exit 1
fi
