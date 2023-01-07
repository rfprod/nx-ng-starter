#!/bin/bash

set -o errexit # do not continue on error
# set -o nounset # error on unset variables
set -o pipefail # error if at least one command in a pipe fails

# enable debug mode if a $TRACE variable is set
if [[ "${TRACE-0}" == "1" ]]; then
  set -o xtrade
fi
