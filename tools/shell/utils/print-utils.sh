#!/bin/bash

source tools/shell/utils/colors.sh ''

print_gap() {
  printf "\n\n"
}

print_usage_tip() {
  local COMMAND
  COMMAND=$1
  local DESCRIPTION
  DESCRIPTION=$2
  printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}: %s${DEFAULT}" "$COMMAND" "$DESCRIPTION"
}

print_name_and_value() {
  local NAME
  NAME=$1
  local VALUE
  VALUE=$2
  printf "
    ${DEFAULT} - ${DEFAULT}%s${DEFAULT}: ${YELLOW}%s${DEFAULT}" "$NAME" "$VALUE"
}

print_value() {
  local VALUE
  VALUE=$1
  printf "
    ${DEFAULT} - ${YELLOW}%s${DEFAULT}" "$VALUE"
}

print_info_title() {
  local TITLE
  TITLE=$1
  printf "
    ${CYAN}%s
    ${DEFAULT}" "$TITLE"
}

print_info_message() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_CYAN}%s${DEFAULT}" "$MESSAGE"
}

print_error_title() {
  local TITLE
  TITLE=$1
  printf "
    ${RED}%s
    ${DEFAULT}" "$TITLE"
}

print_warning_message() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_RED}%s${DEFAULT}" "$MESSAGE"
}

print_success_title() {
  local TITLE
  TITLE=$1
  printf "
    ${GREEN}%s
    ${DEFAULT}" "$TITLE"
}

print_success_message() {
  local MESSAGE
  MESSAGE=$1
  printf "
    ${LIGHT_GREEN}%s${DEFAULT}" "$MESSAGE"
}

if [ "$1" = "?" ]; then
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} Importing this file in another files exposes the following functions:\n
    ${DEFAULT} - ${YELLOW} print_gap
    ${DEFAULT} - ${YELLOW} print_usage_tip
    ${DEFAULT} - ${YELLOW} print_name_and_value
    ${DEFAULT} - ${YELLOW} print_value
    ${DEFAULT} - ${YELLOW} print_info_title
    ${DEFAULT} - ${YELLOW} print_info_message
    ${DEFAULT} - ${YELLOW} print_error_title
    ${DEFAULT} - ${YELLOW} print_warning_message
    ${DEFAULT} - ${YELLOW} print_success_title
    ${DEFAULT} - ${YELLOW} print_success_message
    ${DEFAULT}\n\n" "USAGE"
fi
