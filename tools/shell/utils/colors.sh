#!/bin/bash

##
# Black        0;30     Dark Gray     1;30
# Red          0;31     Light Red     1;31
# Green        0;32     Light Green   1;32
# Brown/Orange 0;33     Yellow        1;33
# Blue         0;34     Light Blue    1;34
# Purple       0;35     Light Purple  1;35
# Cyan         0;36     Light Cyan    1;36
# Light Gray   0;37     White         1;37
##

# shellcheck disable=SC2034

DEFAULT='\033[0m'
BLACK='\033[0;30m'
DARK_GRAY='\033[1;30m'
RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
GREEN='\033[0;32m'
LIGHT_GREEN='\033[1;32m'
BROWN='\033[0;33m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
LIGHT_BLUE='\033[1;34m'
PURPLE='\033[0;35m'
LIGHT_PURPLE='\033[1;35m'
CYAN='\033[0;36m'
LIGHT_CYAN='\033[1;36m'
LIGHT_GRAY='\033[0;37m'
WHITE='\033[1;37m'

##
# Available color names.
##
REGISTERED_COLOR_NAMES=(
  DEFAULT
  BLACK
  DARK_GRAY
  RED
  LIGHT_RED
  GREEN
  LIGHT_GREEN
  BROWN
  YELLOW
  BLUE
  LIGHT_BLUE
  PURPLE
  LIGHT_PURPLE
  CYAN
  LIGHT_CYAN
  LIGHT_GRAY
  WHITE
)

##
# Available color values.
##
REGISTERED_COLOR_VARS=(
  "$DEFAULT"
  "$BLACK"
  "$DARK_GRAY"
  "$RED"
  "$LIGHT_RED"
  "$GREEN"
  "$LIGHT_GREEN"
  "$BROWN"
  "$YELLOW"
  "$BLUE"
  "$LIGHT_BLUE"
  "$PURPLE"
  "$LIGHT_PURPLE"
  "$CYAN"
  "$LIGHT_CYAN"
  "$LIGHT_GRAY"
  "$WHITE"
)

##
# Reports supported colors to the terminal.
##
reportSupportedColors() {
  local TITLE
  TITLE="<< COLORS >>"
  printf "
    ${LIGHT_BLUE} %s ${DEFAULT}\n" "$TITLE"

  ##
  # Prints registered colors.
  ##
  for REGISTERED_COLOR_NAME in "${REGISTERED_COLOR_NAMES[@]}"; do printf "
      ${DEFAULT} - ${!REGISTERED_COLOR_NAME}%s${DEFAULT} = ${!REGISTERED_COLOR_NAME}%s${DEFAULT}" "$REGISTERED_COLOR_NAME" "${!REGISTERED_COLOR_NAME}"; done

  local INFO
  INFO="Use this colors in other module related scripts like tools/shell/lint.sh, tools/shell/test.sh etc."
  printf "\n\n${DEFAULT} %s\n\n" "$INFO"
}

##
# Colors usage.
##
if [ "$1" = "?" ]; then
  reportSupportedColors
fi
