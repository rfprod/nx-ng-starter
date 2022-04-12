#!/bin/bash

source tools/shell/utils/colors.sh ''

set -uo pipefail

CMD_COLOR="${PURPLE}"
LOG_COLOR="${LIGHT_BLUE}"
ERROR_COLOR="${LIGHT_RED}"
WARNING_COLOR="${YELLOW}"

log() {
  printf "${LOG_COLOR} %s:" "Log" >&2
  printf " %s" "$@" >&2
  # shellcheck disable=SC2059
  printf "${DEFAULT}\n" >&2
}

warn() {
  printf "${WARNING_COLOR} %s:" "Warning" >&2
  printf " %s" "$@" >&2
  # shellcheck disable=SC2059
  printf "${DEFAULT}\n" >&2
}

error() {
  printf "${ERROR_COLOR} %s:" "Error" >&2
  printf " %s" "$@" >&2
  # shellcheck disable=SC2059
  printf "${DEFAULT}\n" >&2
  exit 1
}

usage() {
  # shellcheck disable=SC2059
  printf "${USAGE}" >&2
  exit 1
}

cmd() {
  printf "${CMD_COLOR}%s" ">" >&2
  printf " %s" "$@" >&2
  # shellcheck disable=SC2059
  printf "${DEFAULT}\n" >&2
  eval "$@"
  local rc=$?
  if ((rc)); then
    error "%s " "process exited with status ${rc}:" "$@"
  fi
}
