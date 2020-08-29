#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh

set -uo pipefail

CMD_COLOR="${PURPLE}"
LOG_COLOR="${LIGHT_BLUE}"
ERROR_COLOR="${LIGHT_RED}"
WARNING_COLOR="${YELLOW}"

log() {
  printf "${LOG_COLOR}" >&2
  printf "$@" >&2
  printf "${DEFAULT}\n" >&2
}

warn() {
  printf "${WARNING_COLOR}Warning: " >&2
  printf "$@" >&2
  printf "${DEFAULT}\n" >&2
}

error() {
  printf "${ERROR_COLOR}Error: " >&2
  printf "$@" >&2
  printf "${DEFAULT}\n" >&2
  exit 1
}

usage() {
  printf "${USAGE}" >&2
  exit 1
}

cmd() {
  printf "${CMD_COLOR}>" >&2
  printf " %s" "$@" >&2
  printf "${DEFAULT}\n" >&2
  eval "$@"
  local rc=$?
  if ((rc)); then
    error "%s " "process exited with status ${rc}:" "$@"
  fi
}
