#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")/../.." || exit
source tools/shell/build-utils.sh

##
# Reports usage error.
##
reportUsage() {
  local TITLE="<< ${0} usage >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${YELLOW}$0${DEFAULT} - print usage
    ${DEFAULT} - ${YELLOW}$0 android${DEFAULT} - build for android
    ${DEFAULT} - ${YELLOW}$0 ios${DEFAULT} - build for ios
    ${DEFAULT} - ${YELLOW}$0 windows${DEFAULT} - build for windows
    ${DEFAULT}\n\n" "$TITLE" >&2
  exit 1
}

##
# Building control flow.
##
if (($# != 1)); then
  reportUsage
fi

case "$1" in
android)
  log 'building for android'
  ./tools/shell/build-android.sh
  ;;
ios)
  error 'TODO: build for iOS'
  ;;
windows)
  error 'TODO: build for Windows'
  ;;
*)
  reportUsage
  ;;
esac
