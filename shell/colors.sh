#!/bin/bash

##
# Colors definitions.
#
# Black        0;30     Dark Gray     1;30
# Red          0;31     Light Red     1;31
# Green        0;32     Light Green   1;32
# Brown/Orange 0;33     Yellow        1;33
# Blue         0;34     Light Blue    1;34
# Purple       0;35     Light Purple  1;35
# Cyan         0;36     Light Cyan    1;36
# Light Gray   0;37     White         1;37
##

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

reportSupportedColors() {
  TITLE="COLORS"
  DEFAULT_COLOR="DEFAULT: $DEFAULT"
  BLACK_COLOR="BLACK: $BLACK"
  GRAY_COLOR="DARK_GRAY: $DARK_GRAY"
  RED_COLOR="RED: $RED"
  LIGHT_RED_COLOR="LIGHT_RED: $LIGHT_RED"
  GREEN_COLOR="GREEN: $GREEN"
  LIGHT_GREEN_COLOR="LIGHT_GREEN: $LIGHT_GREEN"
  BROWN_COLOR="BROWN: $BROWN"
  YELLOW_COLOR="YELLOW: $YELLOW"
  BLUE_COLOR="BLUE: $BLUE"
  LIGHT_BLUE_COLOR="LIGHT_BLUE: $LIGHT_BLUE"
  PURPLE_COLOR="PURPLE: $PURPLE"
  LIGHT_PURPLE_COLOR="LIGHT_PURPLE: $LIGHT_PURPLE"
  CYAN_COLOR="CYAN: $CYAN"
  LIGHT_CYAN_COLOR="LIGHT_CYAN: $LIGHT_CYAN"
  LIGHT_GRAY_COLOR="LIGHT_GRAY: $LIGHT_GRAY"
  WHITE_COLOR="WHITE: $WHITE"
  printf "${LIGHT_BLUE}<< %s >>${DEFAULT}\n
    ${DEFAULT} %s
    ${BLACK} %s
    ${GRAY} %s
    ${RED} %s
    ${LIGHT_RED} %s
    ${GREEN} %s
    ${LIGHT_GREEN} %s
    ${BROWN} %s
    ${YELLOW} %s
    ${BLUE} %s
    ${LIGHT_BLUE} %s
    ${PURPLE} %s
    ${LIGHT_PURPLE} %s
    ${CYAN} %s
    ${LIGHT_CYAN} %s
    ${LIGHT_GRAY} %s
    ${WHITE} %s\n\n" "$TITLE" "$DEFAULT_COLOR" "$BLACK_COLOR" "$GRAY_COLOR" "$RED_COLOR" "$LIGHT_RED_COLOR" "$GREEN_COLOR" "$LIGHT_GREEN_COLOR" "$BROWN_COLOR" "$YELLOW_COLOR" "$BLUE_COLOR" "$LIGHT_BLUE_COLOR" "$PURPLE_COLOR" "$LIGHT_PURPLE_COLOR" "$CYAN_COLOR" "$LIGHT_CYAN_COLOR" "$LIGHT_GRAY_COLOR" "$WHITE_COLOR"
}

##
# Colors usage.
##
if [ "$1" = "?" ]; then
  reportSupportedColors
fi
