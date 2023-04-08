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
printHelp() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/diagrams.sh ?" "print help"
  printUsageTip "bash tools/shell/diagrams.sh" "generate all diagrams"
  printGap
}

DIST_PATH=./dist/diagrams

##
# Generates diagrams.
##
generateDiagrams() {
  printInfoTitle "<< Generating diagrams >>"
  printNameAndValue "dist" "./dist/diagrams"
  printGap

  mkdir "$DIST_PATH" || true

  for DIAGRAM in "${DIAGRAMS[@]}"; do
    printInfoTitle "<< $DIAGRAM >>"

    yarn workspace:mmdc -i ./tools/diagrams/"$DIAGRAM".mmd -o "$DIST_PATH"/"$DIAGRAM".png
  done
}

if [ "$1" = "?" ]; then
  printHelp
else
  generateDiagrams
fi
