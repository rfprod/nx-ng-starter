#!/bin/bash

source tools/shell/utils/colors.sh ''

printGap() {
  printf "\n\n"
}

printUsageTip() {
  local COMMAND
  COMMAND=$1
  local DESCRIPTION
  DESCRIPTION=$2
  printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}: %s${DEFAULT}" "$COMMAND" "$DESCRIPTION"
}

printNameAndValue() {
  local NAME
  NAME=$1
  local VALUE
  VALUE=$2
  printf "
    ${DEFAULT} - ${DEFAULT}%s${DEFAULT}: ${YELLOW}%s${DEFAULT}" "$NAME" "$VALUE"
}

printValue() {
  local VALUE
  VALUE=$1
  printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}" "$VALUE"
}

printInfoTitle() {
  local TITLE
  TITLE=$1
  printf "
    ${CYAN}%s
    ${DEFAULT}" "$TITLE"
}

printInfoMessage() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_CYAN}%s${DEFAULT}" "$MESSAGE"
}

printErrorTitle() {
  local TITLE
  TITLE=$1
  printf "
    ${RED}%s
    ${DEFAULT}" "$TITLE"
}

printWarningMessage() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_RED}%s${DEFAULT}" "$MESSAGE"
}

printSuccessTitle() {
  local TITLE
  TITLE=$1
  printf "
    ${GREEN}%s
    ${DEFAULT}" "$TITLE"
}

printSuccessMessage() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_GREEN}%s${DEFAULT}" "$MESSAGE"
}

if [ "$1" = "?" ]; then
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} Importing this file in another files exposes the following functions:\n
    ${DEFAULT} - ${YELLOW} printGap
    ${DEFAULT} - ${YELLOW} printUsageTip
    ${DEFAULT} - ${YELLOW} printNameAndValue
    ${DEFAULT} - ${YELLOW} printValue
    ${DEFAULT} - ${YELLOW} printInfoTitle
    ${DEFAULT} - ${YELLOW} printInfoMessage
    ${DEFAULT} - ${YELLOW} printErrorTitle
    ${DEFAULT} - ${YELLOW} printWarningMessage
    ${DEFAULT} - ${YELLOW} printSuccessTitle
    ${DEFAULT} - ${YELLOW} printSuccessMessage
    ${DEFAULT}\n\n" "USAGE"
fi
