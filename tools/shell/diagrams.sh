#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Available diagram names.
##
declare -A DIAGRAMS=(
  ["BRANCHING"]="branching"
  ["TRUNK_ON_PUSH"]="trunk-on-push-pipeline"
  ["PR_VALIDATION"]="pr-validation-pipeline"
)

##
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/diagrams.sh ?" "print help"
  print_usage_tip "bash tools/shell/diagrams.sh" "generate all diagrams"
  print_gap
}

DIST_PATH=./dist/diagrams

##
# Generates diagrams.
##
generate_diagrams() {
  print_info_title "<< Generating diagrams >>"
  print_name_and_value "dist" "./dist/diagrams"
  print_gap

  mkdir "$DIST_PATH" || true

  for DIAGRAM in "${DIAGRAMS[@]}"; do
    print_info_title "<< $DIAGRAM >>"

    yarn workspace:mmdc -i ./tools/diagrams/"$DIAGRAM".mmd -o "$DIST_PATH"/"$DIAGRAM".png
  done
}

if [ "$1" = "?" ]; then
  print_help
else
  generate_diagrams
fi
